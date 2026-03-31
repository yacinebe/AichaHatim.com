import { pool } from "../../db.js";

export async function adminSubscribersRoutes(fastify) {
  fastify.get("/admin/subscribers", { preHandler: fastify.adminAuth }, async () => {
    const { rows } = await pool.query("SELECT * FROM email_subscribers ORDER BY created_at DESC");
    return rows;
  });

  fastify.get("/admin/subscribers/export", { preHandler: fastify.adminAuth }, async (req, reply) => {
    const { rows } = await pool.query("SELECT email, source, created_at FROM email_subscribers ORDER BY created_at DESC");
    const csv = ["email,source,date_inscription"]
      .concat(rows.map((r) => `${r.email},${r.source ?? ""},${r.created_at.toISOString()}`))
      .join("\n");
    reply
      .header("Content-Type", "text/csv")
      .header("Content-Disposition", 'attachment; filename="abonnes.csv"')
      .send(csv);
  });
}
