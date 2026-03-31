import { pool } from "../../db.js";

export async function adminProductsRoutes(fastify) {
  fastify.get("/admin/products", { preHandler: fastify.adminAuth }, async () => {
    const { rows } = await pool.query("SELECT * FROM products ORDER BY created_at DESC");
    return rows;
  });

  fastify.post("/admin/products", { preHandler: fastify.adminAuth }, async (req, reply) => {
    const { title, description, price_cents, stripe_price_id, is_active = true } = req.body;
    const { rows: [row] } = await pool.query(
      `INSERT INTO products (title, description, price_cents, stripe_price_id, is_active)
       VALUES ($1,$2,$3,$4,$5) RETURNING *`,
      [title, description ?? null, price_cents, stripe_price_id, is_active]
    );
    reply.code(201).send(row);
  });

  fastify.patch("/admin/products/:id", { preHandler: fastify.adminAuth }, async (req, reply) => {
    const fields = ["title", "description", "price_cents", "stripe_price_id", "is_active"];
    const updates = fields.filter((f) => f in (req.body ?? {}));
    if (!updates.length) return reply.code(400).send({ error: "Aucun champ" });
    const sets = updates.map((f, i) => `${f} = $${i + 2}`).join(", ");
    const { rows: [row] } = await pool.query(
      `UPDATE products SET ${sets} WHERE id = $1 RETURNING *`,
      [req.params.id, ...updates.map((f) => req.body[f])]
    );
    if (!row) return reply.code(404).send({ error: "Introuvable" });
    return row;
  });

  fastify.delete("/admin/products/:id", { preHandler: fastify.adminAuth }, async (req, reply) => {
    await pool.query("DELETE FROM products WHERE id = $1", [req.params.id]);
    reply.code(204).send();
  });
}
