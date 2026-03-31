import { pool } from "../db.js";

export async function subscribeRoutes(fastify) {
  fastify.post("/subscribe", async (req, reply) => {
    const { email, source } = req.body ?? {};
    if (!email) return reply.code(400).send({ error: "Email requis" });

    await pool.query(
      `INSERT INTO email_subscribers (email, source) VALUES ($1, $2)
       ON CONFLICT (email) DO NOTHING`,
      [email, source ?? null]
    );
    reply.send({ ok: true });
  });
}
