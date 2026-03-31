import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../api/client.js";
import AdminLayout from "../../components/AdminLayout.jsx";

const EMPTY = { question: "", answer: "" };

function FaqForm({ initial, onSave, onCancel, loading }) {
  const [form, setForm] = useState(initial ?? EMPTY);
  const set = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  return (
    <div className="admin-card">
      <h3 style={{ marginBottom: "1rem" }}>{initial ? "Modifier la question" : "Ajouter une question"}</h3>
      <div className="admin-form">
        <label>Question<input className="input" value={form.question} onChange={(e) => set("question", e.target.value)} required /></label>
        <label>Réponse<textarea className="textarea" rows={5} value={form.answer} onChange={(e) => set("answer", e.target.value)} required /></label>
        <div className="admin-actions">
          <button className="btn btn-ghost" onClick={onCancel} type="button">Annuler</button>
          <button className="btn btn-primary" onClick={() => onSave(form)} disabled={loading || !form.question || !form.answer}>
            {loading ? "Sauvegarde…" : "Enregistrer"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function AdminFAQ() {
  const qc = useQueryClient();
  const { data, isLoading } = useQuery({ queryKey: ["admin-faq"], queryFn: api.getAdminFaq });
  const [editing, setEditing] = useState(null);

  const invalidate = () => qc.invalidateQueries({ queryKey: ["admin-faq"] });
  const createMutation = useMutation({ mutationFn: api.createFaq, onSuccess: () => { invalidate(); setEditing(null); } });
  const updateMutation = useMutation({ mutationFn: ({ id, data }) => api.updateFaq(id, data), onSuccess: () => { invalidate(); setEditing(null); } });
  const deleteMutation = useMutation({ mutationFn: api.deleteFaq, onSuccess: invalidate });

  return (
    <AdminLayout>
      <div className="admin-header">
        <h1 className="admin-title">FAQ</h1>
        <p style={{ color: "var(--text-muted)" }}>Gérez les questions fréquentes affichées sur le site.</p>
      </div>

      {editing === "new" && <FaqForm onSave={(d) => createMutation.mutate(d)} onCancel={() => setEditing(null)} loading={createMutation.isPending} />}
      {editing && editing !== "new" && <FaqForm initial={editing} onSave={(d) => updateMutation.mutate({ id: editing.id, data: d })} onCancel={() => setEditing(null)} loading={updateMutation.isPending} />}

      {!editing && <button className="btn btn-primary" style={{ marginBottom: "1.5rem" }} onClick={() => setEditing("new")}>+ Ajouter une question</button>}

      <div className="admin-card" style={{ padding: 0 }}>
        {isLoading && <div className="loading">Chargement…</div>}
        {!isLoading && !data?.length && <p className="placeholder" style={{ padding: "1.5rem" }}>Aucune question pour l'instant.</p>}
        {data?.map((f, i) => (
          <div key={f.id} className="list-row">
            <div className="list-row-main">
              <div className="list-row-title">{f.question}</div>
              <div className="list-row-meta">{f.answer?.slice(0, 80)}…</div>
            </div>
            <div className="list-row-actions">
              <button className="btn btn-ghost btn-sm" onClick={() => setEditing(f)}>Modifier</button>
              <button className="btn btn-ghost btn-sm btn-danger" onClick={() => { if (confirm("Supprimer cette question ?")) deleteMutation.mutate(f.id); }}>Supprimer</button>
            </div>
          </div>
        ))}
      </div>
    </AdminLayout>
  );
}