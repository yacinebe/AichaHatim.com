import Stripe from "stripe";
import { pool } from "../db.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "");

export async function checkoutRoutes(fastify) {
  fastify.post("/checkout", { preHandler: fastify.clientAuth }, async (req, reply) => {
    const { product_id } = req.body ?? {};
    if (!product_id) return reply.code(400).send({ error: "product_id requis" });

    const { rows: [product] } = await pool.query(
      "SELECT * FROM products WHERE id = $1 AND is_active = TRUE",
      [product_id]
    );
    if (!product) return reply.code(404).send({ error: "Produit introuvable" });

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [{ price: product.stripe_price_id, quantity: 1 }],
      customer_email: req.client.email,
      success_url: `${process.env.VITE_SITE_URL ?? "http://localhost:5173"}/client/boutique?success=1`,
      cancel_url: `${process.env.VITE_SITE_URL ?? "http://localhost:5173"}/client/boutique`,
      metadata: { product_id, client_id: req.client.client_id },
    });

    reply.send({ url: session.url });
  });
}
