import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import Fastify from "fastify";
import cookie from "@fastify/cookie";
import cors from "@fastify/cors";
import multipart from "@fastify/multipart";
import staticFiles from "@fastify/static";
import { pool } from "./db.js";
import { adminAuth } from "./middleware/adminAuth.js";
import { clientAuth } from "./middleware/clientAuth.js";

// Routes
import { adminAuthRoutes } from "./routes/admin/auth.js";
import { adminPagesRoutes } from "./routes/admin/pages.js";
import { adminTestimonialsRoutes } from "./routes/admin/testimonials.js";
import { adminFaqRoutes } from "./routes/admin/faq.js";
import { adminPodcastRoutes } from "./routes/admin/podcast.js";
import { adminResourcesRoutes } from "./routes/admin/resources.js";
import { adminProductsRoutes } from "./routes/admin/products.js";
import { adminWorkbookRoutes } from "./routes/admin/workbook.js";
import { adminMediaRoutes } from "./routes/admin/media.js";
import { adminSocialLinksRoutes } from "./routes/admin/socialLinks.js";
import { adminClientsRoutes } from "./routes/admin/clients.js";
import { adminSubscribersRoutes } from "./routes/admin/subscribers.js";
import { authRoutes } from "./routes/auth.js";
import { contentRoutes } from "./routes/content.js";
import { resourcesRoutes } from "./routes/resources.js";
import { workbookRoutes } from "./routes/workbook.js";
import { productsRoutes } from "./routes/products.js";
import { checkoutRoutes } from "./routes/checkout.js";
import { webhookRoutes } from "./routes/webhook.js";
import { subscribeRoutes } from "./routes/subscribe.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const UPLOADS_DIR = join(__dirname, "../../uploads");

const fastify = Fastify({ logger: true });

// Plugins
await fastify.register(cors, {
  origin: process.env.VITE_SITE_URL ?? "http://localhost:5173",
  credentials: true,
});
await fastify.register(cookie);
await fastify.register(multipart, { limits: { fileSize: 50 * 1024 * 1024 } });
await fastify.register(staticFiles, { root: UPLOADS_DIR, prefix: "/uploads/" });

// Decorate with auth middleware
fastify.decorate("adminAuth", adminAuth);
fastify.decorate("clientAuth", clientAuth);

// Apply schema on startup
try {
  const schema = readFileSync(join(__dirname, "../schema.sql"), "utf8");
  await pool.query(schema);
} catch (err) {
  fastify.log.error("Schema error:", err.message);
}

// Register all routes
await fastify.register(adminAuthRoutes);
await fastify.register(adminPagesRoutes);
await fastify.register(adminTestimonialsRoutes);
await fastify.register(adminFaqRoutes);
await fastify.register(adminPodcastRoutes);
await fastify.register(adminResourcesRoutes);
await fastify.register(adminProductsRoutes);
await fastify.register(adminWorkbookRoutes);
await fastify.register(adminMediaRoutes);
await fastify.register(adminSocialLinksRoutes);
await fastify.register(adminClientsRoutes);
await fastify.register(adminSubscribersRoutes);
await fastify.register(authRoutes);
await fastify.register(contentRoutes);
await fastify.register(resourcesRoutes);
await fastify.register(workbookRoutes);
await fastify.register(productsRoutes);
await fastify.register(checkoutRoutes);
await fastify.register(webhookRoutes);
await fastify.register(subscribeRoutes);

fastify.get("/health", () => ({ ok: true }));

await fastify.listen({ port: 3001, host: "0.0.0.0" });
