import { useState, useCallback } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { api } from "../../api/client.js";
import ClientLayout from "../../components/ClientLayout.jsx";

function Question({ q, value, onChange }) {
  if (q.question_type === "scale") {
    return (
      <div className="workbook-scale">
        {[1,2,3,4,5,6,7,8,9,10].map((n) => (
          <button
            key={n}
            type="button"
            className={`scale-btn ${value === String(n) ? "selected" : ""}`}
            onClick={() => onChange(String(n))}
          >
            {n}
          </button>
        ))}
      </div>
    );
  }

  if (q.question_type === "radio" && q.options?.length) {
    return (
      <div className="workbook-radio">
        {q.options.map((opt) => (
          <label key={opt} className="workbook-option">
            <input type="radio" name={`q-${q.id}`} value={opt} checked={value === opt} onChange={() => onChange(opt)} />
            {opt}
          </label>
        ))}
      </div>
    );
  }

  if (q.question_type === "checkbox" && q.options?.length) {
    const selected = value ? JSON.parse(value) : [];
    const toggle = (opt) => {
      const next = selected.includes(opt) ? selected.filter((o) => o !== opt) : [...selected, opt];
      onChange(JSON.stringify(next));
    };
    return (
      <div className="workbook-checkbox">
        {q.options.map((opt) => (
          <label key={opt} className="workbook-option">
            <input type="checkbox" checked={selected.includes(opt)} onChange={() => toggle(opt)} />
            {opt}
          </label>
        ))}
      </div>
    );
  }

  return (
    <textarea
      className="textarea"
      placeholder="Votre réponse…"
      value={value ?? ""}
      onChange={(e) => onChange(e.target.value)}
      rows={4}
    />
  );
}

export default function ClientWorkbook() {
  const { data: workbook, isLoading } = useQuery({ queryKey: ["workbook"], queryFn: api.getWorkbook });
  const [responses, setResponses] = useState({});
  const [saveStatus, setSaveStatus] = useState(null);

  const mutation = useMutation({
    mutationFn: api.saveWorkbookResponses,
    onSuccess: () => { setSaveStatus("saved"); setTimeout(() => setSaveStatus(null), 2500); },
    onError: () => setSaveStatus("error"),
  });

  // Initialise local state from loaded responses
  const data = workbook ?? {};
  const sections = data.sections ?? [];

  const getValue = (qId) => {
    if (responses[qId] !== undefined) return responses[qId];
    // find from server data
    for (const s of sections) {
      const q = s.questions?.find((q) => q.id === qId);
      if (q?.response !== undefined) return q.response ?? "";
    }
    return "";
  };

  const handleChange = (qId, val) => {
    setResponses((prev) => ({ ...prev, [qId]: val }));
    setSaveStatus("unsaved");
  };

  const save = () => {
    const payload = Object.entries(responses).map(([question_id, response]) => ({ question_id: Number(question_id), response }));
    mutation.mutate(payload);
  };

  if (isLoading) return <ClientLayout><div className="loading">Chargement du bilan…</div></ClientLayout>;

  return (
    <ClientLayout>
      <div className="client-page-title">
        <h1>Bilan de compétences</h1>
        <p style={{ color: "var(--text-muted)" }}>Prenez le temps de répondre à chaque question. Vos réponses sont sauvegardées.</p>
      </div>

      {!sections.length && <p className="placeholder">Le bilan n'est pas encore disponible.</p>}

      <div className="workbook">
        {sections.map((s) => (
          <div key={s.id} className="workbook-section">
            <div className="workbook-section-header">
              <h2 className="workbook-section-title">{s.title}</h2>
              {s.subtitle && <p className="workbook-section-subtitle">{s.subtitle}</p>}
              {s.intro && <p className="workbook-intro">{s.intro}</p>}
            </div>
            <div className="workbook-questions">
              {s.questions?.map((q) => (
                <div key={q.id} className="workbook-question">
                  <p className="workbook-question-text">{q.question_text}</p>
                  {q.hint && <p className="workbook-question-hint">{q.hint}</p>}
                  <Question q={q} value={getValue(q.id)} onChange={(v) => handleChange(q.id, v)} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {sections.length > 0 && (
        <div className="workbook-save-bar">
          {saveStatus === "saved" && <span className="save-status">✓ Sauvegardé</span>}
          {saveStatus === "error" && <span style={{ color: "var(--error)", fontSize: "0.85rem" }}>Erreur lors de la sauvegarde.</span>}
          <button className="btn btn-primary" onClick={save} disabled={mutation.isPending || saveStatus !== "unsaved"}>
            {mutation.isPending ? "Sauvegarde…" : "Sauvegarder"}
          </button>
        </div>
      )}
    </ClientLayout>
  );
}