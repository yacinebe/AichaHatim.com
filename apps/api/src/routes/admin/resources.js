import { pool } from "../../db.js";
import { randomUUID } from "crypto";
import { createWriteStream } from "fs";
import { mkdir } from "fs/promises";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { pipeline } from "stream/promises";

const __dirname = dirname(fileURLToPath(import.meta.url));
const UPLOADS_DIR = join(__dirname, "../../../../uploads");

export async function adminResourcesRoutes(fastify) {
  fastify.get("/admin/resources", { preHandler: fastify.adminAuth }, async () => {
    const { rows } = await pool.query("SELECT * FROM resources ORDER BY position");
    return rows;
  });

  // Upload a file resource
  fastify.post("/admin/resources/upload", { preHandler: fastify.adminAuth }, async (req, reply) => {
    await mkdir(UPLOADS_DIR, { recursive: true });
    const data = await req.file();
    if (!data) return reply.code(400).send({ error: "Aucun fichier" });

    const ext = data.filename.split(".").pop();
    const filename = `${randomUUID()}.${ext}`;
    const dest = join(UPLOADS_DIR, filename);
    await pipeline(data.file, createWriteStream(dest));

    const url = `/uploads/${filename}`;
    const type = data.mimetype.startsWith("audio") ? "audio" : "pdf";
    const { rows: [row] } = await pool.query(
      `INSERT INTO resources (title, type, url, access)
       VALUES ($1, $2, $3, 'client') RETURNING *`,
      [data.filename, type, url]
    );
    reply.code(201).send(row);
  });

  fastify.post("/admin/resources", { preHandler: fastify.adminAuth }, async (req, reply) => {
    const { title, description, type, url, access = "client" } = req.body;
    const { rows: [max] } = await pool.query("SELECT COALESCE(MAX(position), -1) AS pos FROM resources");
    const { rows: [row] } = await pool.query(
      `INSERT INTO resources (title, description, type, url, access, position)
       VALUES ($1,$2,$3,$4,$5,$6) RETURNING *`,
      [title, description ?? null, type, url, access, max.pos + 1]
    );
    reply.code(201).send(row);
  });

  fastify.patch("/admin/resources/:id", { preHandler: fastify.adminAuth }, async (req, reply) => {
    const fields = ["title", "description", "type", "url", "access", "is_visible"];
    const updates = fields.filter((f) => f in (req.body ?? {}));
    if (!updates.length) return reply.code(400).send({ error: "Aucun champ" });
    const sets = updates.map((f, i) => `${f} = $${i + 2}`).join(", ");
    const { rows: [row] } = await pool.query(
      `UPDATE resources SET ${sets} WHERE id = $1 RETURNING *`,
      [req.params.id, ...updates.map((f) => req.body[f])]
    );
    if (!row) return reply.code(404).send({ error: "Introuvable" });
    return row;
  });

  fastify.delete("/admin/resources/:id", { preHandler: fastify.adminAuth }, async (req, reply) => {
    await pool.query("DELETE FROM resources WHERE id = $1", [req.params.id]);
    reply.code(204).send();
  });
}
