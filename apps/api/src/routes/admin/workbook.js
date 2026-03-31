import { pool } from "../../db.js";

export async function adminWorkbookRoutes(fastify) {
  // Full workbook structure
  fastify.get("/admin/workbook", { preHandler: fastify.adminAuth }, async () => {
    const { rows: sections } = await pool.query("SELECT * FROM workbook_sections ORDER BY position");
    const { rows: questions } = await pool.query("SELECT * FROM workbook_questions ORDER BY position");
    return sections.map((s) => ({
      ...s,
      questions: questions.filter((q) => q.section_id === s.id),
    }));
  });

  // Sections CRUD
  fastify.post("/admin/workbook/sections", { preHandler: fastify.adminAuth }, async (req, reply) => {
    const { title, subtitle, intro_html } = req.body;
    const { rows: [max] } = await pool.query("SELECT COALESCE(MAX(position), -1) AS pos FROM workbook_sections");
    const { rows: [row] } = await pool.query(
      "INSERT INTO workbook_sections (title, subtitle, intro_html, position) VALUES ($1,$2,$3,$4) RETURNING *",
      [title, subtitle ?? null, intro_html ?? null, max.pos + 1]
    );
    reply.code(201).send(row);
  });

  fastify.patch("/admin/workbook/sections/:id", { preHandler: fastify.adminAuth }, async (req, reply) => {
    const fields = ["title", "subtitle", "intro_html", "position"];
    const updates = fields.filter((f) => f in (req.body ?? {}));
    if (!updates.length) return reply.code(400).send({ error: "Aucun champ" });
    const sets = updates.map((f, i) => `${f} = $${i + 2}`).join(", ");
    const { rows: [row] } = await pool.query(
      `UPDATE workbook_sections SET ${sets} WHERE id = $1 RETURNING *`,
      [req.params.id, ...updates.map((f) => req.body[f])]
    );
    if (!row) return reply.code(404).send({ error: "Introuvable" });
    return row;
  });

  fastify.delete("/admin/workbook/sections/:id", { preHandler: fastify.adminAuth }, async (req, reply) => {
    await pool.query("DELETE FROM workbook_sections WHERE id = $1", [req.params.id]);
    reply.code(204).send();
  });

  // Questions CRUD
  fastify.post("/admin/workbook/questions", { preHandler: fastify.adminAuth }, async (req, reply) => {
    const { section_id, question, hint, type = "textarea", options } = req.body;
    const { rows: [max] } = await pool.query(
      "SELECT COALESCE(MAX(position), -1) AS pos FROM workbook_questions WHERE section_id = $1",
      [section_id]
    );
    const { rows: [row] } = await pool.query(
      `INSERT INTO workbook_questions (section_id, question, hint, type, options, position)
       VALUES ($1,$2,$3,$4,$5,$6) RETURNING *`,
      [section_id, question, hint ?? null, type, options ? JSON.stringify(options) : null, max.pos + 1]
    );
    reply.code(201).send(row);
  });

  fastify.patch("/admin/workbook/questions/:id", { preHandler: fastify.adminAuth }, async (req, reply) => {
    const fields = ["question", "hint", "type", "options", "position"];
    const updates = fields.filter((f) => f in (req.body ?? {}));
    if (!updates.length) return reply.code(400).send({ error: "Aucun champ" });
    const vals = updates.map((f) => f === "options" ? JSON.stringify(req.body[f]) : req.body[f]);
    const sets = updates.map((f, i) => `${f} = $${i + 2}`).join(", ");
    const { rows: [row] } = await pool.query(
      `UPDATE workbook_questions SET ${sets} WHERE id = $1 RETURNING *`,
      [req.params.id, ...vals]
    );
    if (!row) return reply.code(404).send({ error: "Introuvable" });
    return row;
  });

  fastify.delete("/admin/workbook/questions/:id", { preHandler: fastify.adminAuth }, async (req, reply) => {
    await pool.query("DELETE FROM workbook_questions WHERE id = $1", [req.params.id]);
    reply.code(204).send();
  });
}
