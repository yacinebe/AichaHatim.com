import { pool } from "../../db.js";

export async function adminFaqRoutes(fastify) {
  fastify.get("/admin/faq", { preHandler: fastify.adminAuth }, async () => {
    const { rows } = await pool.query("SELECT * FROM faq ORDER BY position");
    return rows;
  });

  fastify.post("/admin/faq", { preHandler: fastify.adminAuth }, async (req, reply) => {
    const { question, answer, is_visible = true } = req.body;
    const { rows: [max] } = await pool.query("SELECT COALESCE(MAX(position), -1) AS pos FROM faq");
    const { rows: [row] } = await pool.query(
      "INSERT INTO faq (question, answer, position, is_visible) VALUES ($1,$2,$3,$4) RETURNING *",
      [question, answer, max.pos + 1, is_visible]
    );
    reply.code(201).send(row);
  });

  fastify.patch("/admin/faq/:id", { preHandler: fastify.adminAuth }, async (req, reply) => {
    const fields = ["question", "answer", "is_visible"];
    const updates = fields.filter((f) => f in (req.body ?? {}));
    if (!updates.length) return reply.code(400).send({ error: "Aucun champ" });
    const sets = updates.map((f, i) => `${f} = $${i + 2}`).join(", ");
    const { rows: [row] } = await pool.query(
      `UPDATE faq SET ${sets} WHERE id = $1 RETURNING *`,
      [req.params.id, ...updates.map((f) => req.body[f])]
    );
    if (!row) return reply.code(404).send({ error: "Introuvable" });
    return row;
  });

  fastify.delete("/admin/faq/:id", { preHandler: fastify.adminAuth }, async (req, reply) => {
    await pool.query("DELETE FROM faq WHERE id = $1", [req.params.id]);
    reply.code(204).send();
  });

  fastify.patch("/admin/faq/reorder", { preHandler: fastify.adminAuth }, async (req, reply) => {
    for (const { id, position } of req.body ?? []) {
      await pool.query("UPDATE faq SET position = $2 WHERE id = $1", [id, position]);
    }
    reply.send({ ok: true });
  });
}
