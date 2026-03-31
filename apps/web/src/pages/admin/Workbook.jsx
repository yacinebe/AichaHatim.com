import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../api/client.js";
import AdminLayout from "../../components/AdminLayout.jsx";

const QUESTION_TYPES = [
  { value: "text", label: "Texte libre" },
  { value: "scale", label: "Échelle 1-10" },
  { value: "radio", label: "Choix unique" },
  { value: "checkbox", label: "Choix multiples" },
];

function QuestionForm({ sectionId, initial, onSave, onCancel, loading }) {
  const [form, setForm] = useState(initial ?? { question_text: "", hint: "", question_type: "text", options: "" });
  const set = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  const save = () => {
    const data = { ...form, section_id: sectionId };
    if (form.options && typeof form.options === "string") {
      data.options = form.options.split("\n").map((o) => o.trim()).filter(Boolean);
    }
    onSave(data);
  };

  return (
    <div className="admin-card" style={{ marginLeft: "1.5rem", borderLeft: "3px solid var(--accent)" }}>
      <h4 style={{ marginBottom: "1rem" }}>{initial ? "Modifier la question" : "Ajouter une question"}</h4>
      <div className="admin-form">
        <label>Question<input className="input" value={form.question_text} onChange={(e) => set("question_text", e.target.value)} required /></label>
        <label>Aide / indice (optionnel)<input className="input" value={form.hint ?? ""} onChange={(e) => set("hint", e.target.value)} /></label>
        <label>
          Type de réponse
          <select className="select" value={form.question_type} onChange={(e) => set("question_type", e.target.value)}>
            {QUESTION_TYPES.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
          </select>
        </label>
        {(form.question_type === "radio" || form.question_type === "checkbox") && (
          <label>
            Options (une par ligne)
            <textarea className="textarea" rows={4} value={typeof form.options === "string" ? form.options : form.options?.join("\n") ?? ""} onChange={(e) => set("options", e.target.value)} placeholder={"Option A\nOption B\nOption C"} />
          </label>
        )}
        <div className="admin-actions">
          <button className="btn btn-ghost btn-sm" onClick={onCancel} type="button">Annuler</button>
          <button className="btn btn-primary btn-sm" onClick={save} disabled={loading || !form.question_text}>
            {loading ? "…" : "Enregistrer"}
          </button>
        </div>
      </div>
    </div>
  );
}

function SectionBlock({ section, onAddQuestion, onEditSection, onDeleteSection }) {
  const qc = useQueryClient();
  const [addingQ, setAddingQ] = useState(false);
  const [editingQ, setEditingQ] = useState(null);

  const invalidate = () => qc.invalidateQueries({ queryKey: ["admin-workbook"] });
  const createQ = useMutation({ mutationFn: api.createQuestion, onSuccess: () => { invalidate(); setAddingQ(false); } });
  const updateQ = useMutation({ mutationFn: ({ id, data }) => api.updateQuestion(id, data), onSuccess: () => { invalidate(); setEditingQ(null); } });
  const deleteQ = useMutation({ mutationFn: api.deleteQuestion, onSuccess: invalidate });

  return (
    <div className="admin-card" style={{ marginBottom: "1.5rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem" }}>
        <div>
          <h3 style={{ color: "var(--primary)", marginBottom: "0.25rem" }}>{section.title}</h3>
          {section.subtitle && <p style={{ color: "var(--text-muted)", fontSize: "0.88rem" }}>{section.subtitle}</p>}
        </div>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <button className="btn btn-ghost btn-sm" onClick={() => onEditSection(section)}>Modifier section</button>
          <button className="btn btn-ghost btn-sm btn-danger" onClick={() => { if (confirm("Supprimer cette section et toutes ses questions ?")) onDeleteSection(section.id); }}>Supprimer</button>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginBottom: "1rem" }}>
        {section.questions?.map((q) => (
          editingQ?.id === q.id
            ? <QuestionForm key={q.id} sectionId={section.id} initial={{ ...q, options: q.options?.join("\n") ?? "" }} onSave={(d) => updateQ.mutate({ id: q.id, data: d })} onCancel={() => setEditingQ(null)} loading={updateQ.isPending} />
            : (
              <div key={q.id} className="list-row" style={{ background: "var(--surface-2)", borderRadius: "var(--radius-sm)" }}>
                <div className="list-row-main">
                  <div className="list-row-title" style={{ fontSize: "0.9rem" }}>{q.question_text}</div>
                  <div className="list-row-meta">{QUESTION_TYPES.find((t) => t.value === q.question_type)?.label}</div>
                </div>
                <div className="list-row-actions">
                  <button className="btn btn-ghost btn-sm" onClick={() => setEditingQ(q)}>Modifier</button>
                  <button className="btn btn-ghost btn-sm btn-danger" onClick={() => { if (confirm("Supprimer cette question ?")) deleteQ.mutate(q.id); }}>×</button>
                </div>
              </div>
            )
        ))}
      </div>

      {addingQ
        ? <QuestionForm sectionId={section.id} onSave={(d) => createQ.mutate(d)} onCancel={() => setAddingQ(false)} loading={createQ.isPending} />
        : <button className="btn btn-ghost btn-sm" onClick={() => setAddingQ(true)}>+ Ajouter une question</button>
      }
    </div>
  );
}

function SectionForm({ initial, onSave, onCancel, loading }) {
  const [form, setForm] = useState(initial ?? { title: "", subtitle: "", intro: "" });
  const set = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  return (
    <div className="admin-card" style={{ borderLeft: "3px solid var(--primary)" }}>
      <h3 style={{ marginBottom: "1rem" }}>{initial ? "Modifier la section" : "Ajouter une section"}</h3>
      <div className="admin-form">
        <label>Titre de la section<input className="input" value={form.title} onChange={(e) => set("title", e.target.value)} required /></label>
        <label>Sous-titre (optionnel)<input className="input" value={form.subtitle ?? ""} onChange={(e) => set("subtitle", e.target.value)} /></label>
        <label>Introduction (optionnel)<textarea className="textarea" value={form.intro ?? ""} onChange={(e) => set("intro", e.target.value)} /></label>
        <div className="admin-actions">
          <button className="btn btn-ghost" onClick={onCancel} type="button">Annuler</button>
          <button className="btn btn-primary" onClick={() => onSave(form)} disabled={loading || !form.title}>
            {loading ? "Sauvegarde…" : "Enregistrer"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function AdminWorkbook() {
  const qc = useQueryClient();
  const { data, isLoading } = useQuery({ queryKey: ["admin-workbook"], queryFn: api.getAdminWorkbook });
  const [addingSection, setAddingSection] = useState(false);
  const [editingSection, setEditingSection] = useState(null);

  const invalidate = () => qc.invalidateQueries({ queryKey: ["admin-workbook"] });
  const createSection = useMutation({ mutationFn: api.createSection, onSuccess: () => { invalidate(); setAddingSection(false); } });
  const updateSection = useMutation({ mutationFn: ({ id, data }) => api.updateSection(id, data), onSuccess: () => { invalidate(); setEditingSection(null); } });
  const deleteSection = useMutation({ mutationFn: api.deleteSection, onSuccess: invalidate });

  const sections = data?.sections ?? [];

  return (
    <AdminLayout>
      <div className="admin-header">
        <h1 className="admin-title">Bilan de compétences</h1>
        <p style={{ color: "var(--text-muted)" }}>Gérez les sections et questions du workbook de vos clientes.</p>
      </div>

      {sections.map((s) =>
        editingSection?.id === s.id
          ? <SectionForm key={s.id} initial={s} onSave={(d) => updateSection.mutate({ id: s.id, data: d })} onCancel={() => setEditingSection(null)} loading={updateSection.isPending} />
          : <SectionBlock key={s.id} section={s} onEditSection={setEditingSection} onDeleteSection={(id) => { if (!deleteSection.isPending) deleteSection.mutate(id); }} />
      )}

      {isLoading && <div className="loading">Chargement…</div>}
      {!isLoading && !sections.length && !addingSection && <p className="placeholder">Aucune section. Commencez par en ajouter une.</p>}

      {addingSection
        ? <SectionForm onSave={(d) => createSection.mutate(d)} onCancel={() => setAddingSection(false)} loading={createSection.isPending} />
        : <button className="btn btn-primary" onClick={() => setAddingSection(true)}>+ Ajouter une section</button>
      }
    </AdminLayout>
  );
}
