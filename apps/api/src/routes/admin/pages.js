import { pool } from "../../db.js";

export async function adminPagesRoutes(fastify) {
  fastify.get("/admin/pages/:page", { preHandler: fastify.adminAuth }, async (req) => {
    const { rows } = await pool.query(
      "SELECT key, value FROM page_content WHERE page = $1",
      [req.params.page]
    );
    return Object.fromEntries(rows.map((r) => [r.key, r.value]));
  });

  fastify.put("/admin/pages/:page", { preHandler: fastify.adminAuth }, async (req, reply) => {
    const { page } = req.params;
    const updates = req.body ?? {};

    for (const [key, value] of Object.entries(updates)) {
      await pool.query(
        `INSERT INTO page_content (page, key, value, updated_at)
         VALUES ($1, $2, $3, NOW())
         ON CONFLICT (page, key) DO UPDATE SET value = $3, updated_at = NOW()`,
        [page, key, value]
      );
    }
    reply.send({ ok: true });
  });
}
