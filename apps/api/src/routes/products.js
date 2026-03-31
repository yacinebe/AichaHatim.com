import { pool } from "../db.js";

export async function productsRoutes(fastify) {
  fastify.get("/products", async () => {
    const { rows } = await pool.query(
      "SELECT id, title, description, price_cents FROM products WHERE is_active = TRUE ORDER BY created_at"
    );
    return rows;
  });
}
