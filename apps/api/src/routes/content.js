import { pool } from "../db.js";

export async function contentRoutes(fastify) {
  fastify.get("/content/:page", async (req) => {
    const { rows } = await pool.query(
      "SELECT key, value FROM page_content WHERE page = $1",
      [req.params.page]
    );
    return Object.fromEntries(rows.map((r) => [r.key, r.value]));
  });

  fastify.get("/testimonials", async () => {
    const { rows } = await pool.query(
      "SELECT * FROM testimonials WHERE is_visible = TRUE ORDER BY position"
    );
    return rows;
  });

  fastify.get("/faq", async () => {
    const { rows } = await pool.query(
      "SELECT * FROM faq WHERE is_visible = TRUE ORDER BY position"
    );
    return rows;
  });

  fastify.get("/podcast/episodes", async () => {
    const { rows } = await pool.query(
      "SELECT * FROM podcast_episodes WHERE is_visible = TRUE ORDER BY position"
    );
    return rows;
  });

  fastify.get("/social-links", async () => {
    const { rows } = await pool.query(
      "SELECT platform, url FROM social_links WHERE is_visible = TRUE"
    );
    return Object.fromEntries(rows.map((r) => [r.platform, r.url]));
  });
}
