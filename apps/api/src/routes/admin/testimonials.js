import { pool } from "../../db.js";

export async function adminTestimonialsRoutes(fastify) {
  fastify.get("/admin/testimonials", { preHandler: fastify.adminAuth }, async () => {
    const { rows } = await pool.query("SELECT * FROM testimonials ORDER BY position");
    return rows;
  });

  fastify.post("/admin/testimonials", { preHandler: fastify.adminAuth }, async (req, reply) => {
    const { author, role, quote, youtube_url, photo_url, is_visible = true } = req.body;
    const { rows: [max] } = await pool.query("SELECT COALESCE(MAX(position), -1) AS pos FROM testimonials");
    const { rows: [row] } = await pool.query(
      `INSERT INTO testimonials (author, role, quote, youtube_url, photo_url, position, is_visible)
       VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *`,
      [author, role ?? null, quote ?? null, youtube_url ?? null, photo_url ?? null, max.pos + 1, is_visible]
    );
    reply.code(201).send(row);
  });

  fastify.patch("/admin/testimonials/:id", { preHandler: fastify.adminAuth }, async (req, reply) => {
    const fields = ["author", "role", "quote", "youtube_url", "photo_url", "is_visible"];
    const updates = fields.filter((f) => f in (req.body ?? {}));
    if (!updates.length) return reply.code(400).send({ error: "Aucun champ à mettre à jour" });

    const sets = updates.map((f, i) => `${f} = $${i + 2}`).join(", ");
    const vals = updates.map((f) => req.body[f]);
    const { rows: [row] } = await pool.query(
      `UPDATE testimonials SET ${sets} WHERE id = $1 RETURNING *`,
      [req.params.id, ...vals]
    );
    if (!row) return reply.code(404).send({ error: "Introuvable" });
    return row;
  });

  fastify.delete("/admin/testimonials/:id", { preHandler: fastify.adminAuth }, async (req, reply) => {
    await pool.query("DELETE FROM testimonials WHERE id = $1", [req.params.id]);
    reply.code(204).send();
  });

  fastify.patch("/admin/testimonials/reorder", { preHandler: fastify.adminAuth }, async (req, reply) => {
    const items = req.body ?? [];
    for (const { id, position } of items) {
      await pool.query("UPDATE testimonials SET position = $2 WHERE id = $1", [id, position]);
    }
    reply.send({ ok: true });
  });
}
