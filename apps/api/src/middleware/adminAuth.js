import { pool } from "../db.js";

export async function adminAuth(req, reply) {
  const token = req.cookies?.admin_token;
  if (!token) return reply.code(401).send({ error: "Non authentifié" });

  const { rows } = await pool.query(
    "SELECT id FROM admin_sessions WHERE token = $1 AND expires_at > NOW()",
    [token]
  );
  if (!rows.length) return reply.code(401).send({ error: "Session expirée" });
}
