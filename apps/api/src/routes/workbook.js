import { pool } from "../db.js";

export async function workbookRoutes(fastify) {
  fastify.get("/workbook", { preHandler: fastify.clientAuth }, async (req) => {
    const clientId = req.client.client_id;

    const { rows: sections } = await pool.query(
      "SELECT * FROM workbook_sections ORDER BY position"
    );
    const { rows: questions } = await pool.query(
      "SELECT * FROM workbook_questions ORDER BY position"
    );
    const { rows: responses } = await pool.query(
      "SELECT question_id, answer FROM workbook_responses WHERE client_id = $1",
      [clientId]
    );

    const answerMap = Object.fromEntries(responses.map((r) => [r.question_id, r.answer]));

    return sections.map((s) => ({
      ...s,
      questions: questions
        .filter((q) => q.section_id === s.id)
        .map((q) => ({ ...q, answer: answerMap[q.id] ?? null })),
    }));
  });

  fastify.put("/workbook/responses", { preHandler: fastify.clientAuth }, async (req, reply) => {
    const clientId = req.client.client_id;
    const responses = req.body ?? [];

    for (const { question_id, answer } of responses) {
      await pool.query(
        `INSERT INTO workbook_responses (client_id, question_id, answer, updated_at)
         VALUES ($1, $2, $3, NOW())
         ON CONFLICT (client_id, question_id) DO UPDATE SET answer = $3, updated_at = NOW()`,
        [clientId, question_id, answer]
      );
    }
    reply.send({ ok: true });
  });
}
