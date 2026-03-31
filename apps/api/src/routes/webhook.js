import Stripe from "stripe";
import { pool } from "../db.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "");

export async function webhookRoutes(fastify) {
  // Override JSON parser in this scope only so we get raw Buffer for Stripe sig verification
  fastify.removeAllContentTypeParsers();
  fastify.addContentTypeParser("application/json", { parseAs: "buffer" }, (req, body, done) => {
    done(null, body);
  });

  fastify.post("/stripe/webhook", async (req, reply) => {
    const sig = req.headers["stripe-signature"];
    let event;
    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET ?? ""
      );
    } catch {
      return reply.code(400).send({ error: "Signature invalide" });
    }

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      const { product_id, client_id } = session.metadata ?? {};

      await pool.query(
        `INSERT INTO purchases (client_id, email, product_id, stripe_session_id)
         VALUES ($1, $2, $3, $4) ON CONFLICT (stripe_session_id) DO NOTHING`,
        [client_id ?? null, session.customer_email ?? "", product_id, session.id]
      );
    }

    reply.send({ received: true });
  });
}
