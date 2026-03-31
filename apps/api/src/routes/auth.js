import crypto from "crypto";
import { pool } from "../db.js";
import { Resend } from "resend";

export async function authRoutes(fastify) {
  const resend = new Resend(process.env.RESEND_API_KEY);

  fastify.post("/auth/magic-link", async (req, reply) => {
    const { email } = req.body ?? {};
    if (!email) return reply.code(400).send({ error: "Email requis" });

    const token = crypto.randomBytes(32).toString("hex");
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000);

    await pool.query(
      "INSERT INTO magic_links (email, token, expires_at) VALUES ($1, $2, $3)",
      [email, token, expiresAt]
    );

    const verifyUrl = `${process.env.VITE_SITE_URL ?? "http://localhost:5173"}/client/verify?token=${token}`;

    await resend.emails.send({
      from: "Aicha Hatim <noreply@aichahatim.com>",
      to: email,
      subject: "Votre lien de connexion",
      html: `
        <p>Bonjour,</p>
        <p>Cliquez sur le lien ci-dessous pour accéder à votre espace client :</p>
        <p><a href="${verifyUrl}">Se connecter</a></p>
        <p>Ce lien expire dans 15 minutes.</p>
        <p>Si vous n'avez pas demandé ce lien, ignorez cet email.</p>
      `,
    });

    reply.send({ ok: true });
  });

  fastify.get("/auth/verify", async (req, reply) => {
    const { token } = req.query;
    if (!token) return reply.code(400).send({ error: "Token manquant" });

    const { rows: [link] } = await pool.query(
      "SELECT * FROM magic_links WHERE token = $1 AND used = FALSE AND expires_at > NOW()",
      [token]
    );
    if (!link) return reply.code(400).send({ error: "Lien invalide ou expiré" });

    await pool.query("UPDATE magic_links SET used = TRUE WHERE id = $1", [link.id]);

    const { rows: [client] } = await pool.query(
      `INSERT INTO clients (email) VALUES ($1)
       ON CONFLICT (email) DO UPDATE SET email = EXCLUDED.email
       RETURNING *`,
      [link.email]
    );

    const sessionToken = crypto.randomBytes(32).toString("hex");
    const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

    await pool.query(
      "INSERT INTO client_sessions (client_id, token, expires_at) VALUES ($1, $2, $3)",
      [client.id, sessionToken, expiresAt]
    );

    reply
      .setCookie("client_token", sessionToken, {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        expires: expiresAt,
      })
      .redirect("/client");
  });

  fastify.post("/auth/logout", async (req, reply) => {
    const token = req.cookies?.client_token;
    if (token) {
      await pool.query("DELETE FROM client_sessions WHERE token = $1", [token]);
    }
    reply.clearCookie("client_token", { path: "/" }).send({ ok: true });
  });

  fastify.get("/auth/me", { preHandler: fastify.clientAuth }, async (req) => {
    return req.client;
  });
}
