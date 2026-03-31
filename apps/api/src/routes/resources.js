import { pool } from "../db.js";

export async function resourcesRoutes(fastify) {
  // Public resources (email-gated, access = 'public')
  fastify.get("/resources/public", async () => {
    const { rows } = await pool.query(
      "SELECT id, title, description, type FROM resources WHERE access = 'public' ORDER BY position"
    );
    return rows;
  });

  // Client resources (requires auth)
  fastify.get("/resources", { preHandler: fastify.clientAuth }, async () => {
    const { rows } = await pool.query(
      "SELECT * FROM resources WHERE access = 'client' ORDER BY position"
    );
    return rows;
  });
}
