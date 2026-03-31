import { pool } from "../../db.js";

export async function adminSocialLinksRoutes(fastify) {
  fastify.get("/admin/social-links", { preHandler: fastify.adminAuth }, async () => {
    const { rows } = await pool.query("SELECT * FROM social_links ORDER BY platform");
    return rows;
  });

  fastify.put("/admin/social-links", { preHandler: fastify.adminAuth }, async (req, reply) => {
    const links = req.body ?? [];
    for (const { platform, url, is_visible = true } of links) {
      await pool.query(
        `INSERT INTO social_links (platform, url, is_visible)
         VALUES ($1,$2,$3)
         ON CONFLICT (platform) DO UPDATE SET url = $2, is_visible = $3`,
        [platform, url, is_visible]
      );
    }
    reply.send({ ok: true });
  });
}
