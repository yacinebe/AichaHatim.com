import bcrypt from "bcrypt";
import crypto from "crypto";
import { pool } from "../../db.js";

export async function adminAuthRoutes(fastify) {
  fastify.post("/admin/login", async (req, reply) => {
    const { password } = req.body ?? {};
    if (!password) return reply.code(400).send({ error: "Mot de passe requis" });

    const hash = process.env.ADMIN_PASSWORD_HASH;
    if (!hash) return reply.code(500).send({ error: "ADMIN_PASSWORD_HASH non configuré" });

    const valid = await bcrypt.compare(password, hash);
    if (!valid) return reply.code(401).send({ error: "Mot de passe incorrect" });

    const token = crypto.randomBytes(32).toString("hex");
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    await pool.query(
      "INSERT INTO admin_sessions (token, expires_at) VALUES ($1, $2)",
      [token, expiresAt]
    );

    reply
      .setCookie("admin_token", token, {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        expires: expiresAt,
      })
      .send({ ok: true });
  });

  fastify.post("/admin/logout", async (req, reply) => {
    const token = req.cookies?.admin_token;
    if (token) {
      await pool.query("DELETE FROM admin_sessions WHERE token = $1", [token]);
    }
    reply.clearCookie("admin_token", { path: "/" }).send({ ok: true });
  });

  fastify.get("/admin/me", { preHandler: fastify.adminAuth }, async (req, reply) => {
    reply.send({ ok: true });
  });
}
