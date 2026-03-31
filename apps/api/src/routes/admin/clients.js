import { pool } from "../../db.js";

export async function adminClientsRoutes(fastify) {
  fastify.get("/admin/clients", { preHandler: fastify.adminAuth }, async (req) => {
    const search = req.query.search ?? "";
    const { rows } = await pool.query(
      `SELECT c.*,
              COALESCE(json_agg(p ORDER BY p.created_at DESC) FILTER (WHERE p.id IS NOT NULL), '[]') AS purchases
       FROM clients c
       LEFT JOIN purchases p ON p.client_id = c.id
       WHERE c.email ILIKE $1 OR c.name ILIKE $1
       GROUP BY c.id
       ORDER BY c.created_at DESC`,
      [`%${search}%`]
    );
    return rows;
  });
}
