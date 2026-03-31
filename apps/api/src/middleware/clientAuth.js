import { pool } from "../db.js";

export async function clientAuth(req, reply) {
  const token = req.cookies?.client_token;
  if (!token) return reply.code(401).send({ error: "Non authentifié" });

  const { rows } = await pool.query(
    `SELECT cs.client_id, c.email, c.name
     FROM client_sessions cs
     JOIN clients c ON c.id = cs.client_id
     WHERE cs.token = $1 AND cs.expires_at > NOW()`,
    [token]
  );
  if (!rows.length) return reply.code(401).send({ error: "Session expirée" });

  req.client = rows[0];
}
