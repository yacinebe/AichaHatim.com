import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../api/client.js";
import AdminLayout from "../../components/AdminLayout.jsx";

const EMPTY = { author_name: "", author_role: "", content: "", video_url: "" };

function TestimonialForm({ initial, onSave, onCancel, loading }) {
  const [form, setForm] = useState(initial ?? EMPTY);
  const set = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  return (
    <div className="admin-card">
      <h3 style={{ marginBottom: "1rem" }}>{initial ? "Modifier" : "Ajouter un témoignage"}</h3>
      <div className="admin-form">
        <div className="admin-grid">
          <label>Nom<input className="input" value={form.author_name} onChange={(e) => set("author_name", e.target.value)} required /></label>
          <label>Rôle / titre (optionnel)<input className="input" value={form.author_role} onChange={(e) => set("author_role", e.target.value)} /></label>
        </div>
        <label>
          Témoignage texte
          <textarea className="textarea" value={form.content} onChange={(e) => set("content", e.target.value)} placeholder="Le témoignage écrit…" />
        </label>
        <label>
          URL vidéo YouTube (optionnel — remplace le texte)
          <input className="input" value={form.video_url} onChange={(e) => set("video_url", e.target.value)} placeholder="https://www.youtube.com/watch?v=…" />
        </label>
        <div className="admin-actions">
          <button className="btn btn-ghost" onClick={onCancel} type="button">Annuler</button>
          <button className="btn btn-primary" onClick={() => onSave(form)} disabled={loading || !form.author_name}>
            {loading ? "Sauvegarde…" : "Enregistrer"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function AdminTestimonials() {
  const qc = useQueryClient();
  const { data, isLoading } = useQuery({ queryKey: ["admin-testimonials"], queryFn: api.getAdminTestimonials });
  const [editing, setEditing] = useState(null); // null | "new" | {item}

  const invalidate = () => qc.invalidateQueries({ queryKey: ["admin-testimonials"] });

  const createMutation = useMutation({ mutationFn: api.createTestimonial, onSuccess: () => { invalidate(); setEditing(null); } });
  const updateMutation = useMutation({ mutationFn: ({ id, data }) => api.updateTestimonial(id, data), onSuccess: () => { invalidate(); setEditing(null); } });
  const deleteMutation = useMutation({ mutationFn: api.deleteTestimonial, onSuccess: invalidate });

  return (
    <AdminLayout>
      <div className="admin-header">
        <h1 className="admin-title">Témoignages</h1>
        <p style={{ color: "var(--text-muted)" }}>Gérez les témoignages affichés sur le site.</p>
      </div>

      {editing === "new" && (
        <TestimonialForm onSave={(d) => createMutation.mutate(d)} onCancel={() => setEditing(null)} loading={createMutation.isPending} />
      )}
      {editing && editing !== "new" && (
        <TestimonialForm initial={editing} onSave={(d) => updateMutation.mutate({ id: editing.id, data: d })} onCancel={() => setEditing(null)} loading={updateMutation.isPending} />
      )}

      {!editing && (
        <button className="btn btn-primary" style={{ marginBottom: "1.5rem" }} onClick={() => setEditing("new")}>
          + Ajouter un témoignage
        </button>
      )}

      <div className="admin-card" style={{ padding: 0 }}>
        {isLoading && <div className="loading">Chargement…</div>}
        {!isLoading && !data?.length && <p className="placeholder" style={{ padding: "1.5rem" }}>Aucun témoignage pour l'instant.</p>}
        {data?.map((t) => (
          <div key={t.id} className="list-row">
            <div className="list-row-main">
              <div className="list-row-title">{t.author_name}</div>
              <div className="list-row-meta">{t.author_role || (t.video_url ? "📹 Vidéo" : t.content?.slice(0, 60) + "…")}</div>
            </div>
            <div className="list-row-actions">
              <button className="btn btn-ghost btn-sm" onClick={() => setEditing(t)}>Modifier</button>
              <button className="btn btn-ghost btn-sm btn-danger" onClick={() => { if (confirm("Supprimer ce témoignage ?")) deleteMutation.mutate(t.id); }}>Supprimer</button>
            </div>
          </div>
        ))}
      </div>
    </AdminLayout>
  );
}