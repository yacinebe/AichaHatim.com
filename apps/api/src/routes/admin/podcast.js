import { pool } from "../../db.js";

export async function adminPodcastRoutes(fastify) {
  fastify.get("/admin/podcast", { preHandler: fastify.adminAuth }, async () => {
    const { rows } = await pool.query("SELECT * FROM podcast_episodes ORDER BY position");
    return rows;
  });

  fastify.post("/admin/podcast", { preHandler: fastify.adminAuth }, async (req, reply) => {
    const { title, description, embed_url, published_at, is_visible = true } = req.body;
    const { rows: [max] } = await pool.query("SELECT COALESCE(MAX(position), -1) AS pos FROM podcast_episodes");
    const { rows: [row] } = await pool.query(
      `INSERT INTO podcast_episodes (title, description, embed_url, published_at, position, is_visible)
       VALUES ($1,$2,$3,$4,$5,$6) RETURNING *`,
      [title, description ?? null, embed_url, published_at ?? null, max.pos + 1, is_visible]
    );
    reply.code(201).send(row);
  });

  fastify.patch("/admin/podcast/:id", { preHandler: fastify.adminAuth }, async (req, reply) => {
    const fields = ["title", "description", "embed_url", "published_at", "is_visible"];
    const updates = fields.filter((f) => f in (req.body ?? {}));
    if (!updates.length) return reply.code(400).send({ error: "Aucun champ" });
    const sets = updates.map((f, i) => `${f} = $${i + 2}`).join(", ");
    const { rows: [row] } = await pool.query(
      `UPDATE podcast_episodes SET ${sets} WHERE id = $1 RETURNING *`,
      [req.params.id, ...updates.map((f) => req.body[f])]
    );
    if (!row) return reply.code(404).send({ error: "Introuvable" });
    return row;
  });

  fastify.delete("/admin/podcast/:id", { preHandler: fastify.adminAuth }, async (req, reply) => {
    await pool.query("DELETE FROM podcast_episodes WHERE id = $1", [req.params.id]);
    reply.code(204).send();
  });

  fastify.patch("/admin/podcast/reorder", { preHandler: fastify.adminAuth }, async (req, reply) => {
    for (const { id, position } of req.body ?? []) {
      await pool.query("UPDATE podcast_episodes SET position = $2 WHERE id = $1", [id, position]);
    }
    reply.send({ ok: true });
  });
}
