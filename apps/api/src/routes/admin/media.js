import { pool } from "../../db.js";
import { randomUUID } from "crypto";
import { createWriteStream, unlinkSync } from "fs";
import { mkdir } from "fs/promises";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { pipeline } from "stream/promises";

const __dirname = dirname(fileURLToPath(import.meta.url));
const UPLOADS_DIR = join(__dirname, "../../../../uploads");

export async function adminMediaRoutes(fastify) {
  fastify.get("/admin/media", { preHandler: fastify.adminAuth }, async () => {
    const { rows } = await pool.query("SELECT * FROM media ORDER BY created_at DESC");
    return rows;
  });

  fastify.post("/admin/media", { preHandler: fastify.adminAuth }, async (req, reply) => {
    await mkdir(UPLOADS_DIR, { recursive: true });
    const data = await req.file();
    if (!data) return reply.code(400).send({ error: "Aucun fichier" });

    const ext = data.filename.split(".").pop();
    const filename = `${randomUUID()}.${ext}`;
    const dest = join(UPLOADS_DIR, filename);
    const chunks = [];
    data.file.on("data", (chunk) => chunks.push(chunk));
    await pipeline(data.file, createWriteStream(dest));
    const sizeBytes = chunks.reduce((sum, c) => sum + c.length, 0);

    const url = `/uploads/${filename}`;
    const { rows: [row] } = await pool.query(
      `INSERT INTO media (filename, original_name, mime_type, size_bytes, url)
       VALUES ($1,$2,$3,$4,$5) RETURNING *`,
      [filename, data.filename, data.mimetype, sizeBytes, url]
    );
    reply.code(201).send(row);
  });

  fastify.delete("/admin/media/:id", { preHandler: fastify.adminAuth }, async (req, reply) => {
    const { rows: [row] } = await pool.query(
      "DELETE FROM media WHERE id = $1 RETURNING filename",
      [req.params.id]
    );
    if (row) {
      try { unlinkSync(join(UPLOADS_DIR, row.filename)); } catch {}
    }
    reply.code(204).send();
  });
}
