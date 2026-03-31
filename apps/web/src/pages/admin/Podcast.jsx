import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../api/client.js";
import AdminLayout from "../../components/AdminLayout.jsx";

const EMPTY = { title: "", description: "", embed_url: "", episode_number: "", published_at: "" };

function EpisodeForm({ initial, onSave, onCancel, loading }) {
  const [form, setForm] = useState(initial ?? EMPTY);
  const set = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  return (
    <div className="admin-card">
      <h3 style={{ marginBottom: "1rem" }}>{initial ? "Modifier l'épisode" : "Ajouter un épisode"}</h3>
      <div className="admin-form">
        <div className="admin-grid">
          <label>Numéro d'épisode<input className="input" type="number" value={form.episode_number} onChange={(e) => set("episode_number", e.target.value)} /></label>
          <label>Date de publication<input className="input" type="date" value={form.published_at?.split("T")[0] ?? ""} onChange={(e) => set("published_at", e.target.value)} /></label>
        </div>
        <label>Titre<input className="input" value={form.title} onChange={(e) => set("title", e.target.value)} required /></label>
        <label>Description<textarea className="textarea" value={form.description} onChange={(e) => set("description", e.target.value)} /></label>
        <label>
          URL d'intégration (Spotify / Podbean / Anchor embed URL)
          <input className="input" placeholder="https://open.spotify.com/embed/episode/…" value={form.embed_url} onChange={(e) => set("embed_url", e.target.value)} />
        </label>
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

export default function AdminPodcast() {
  const qc = useQueryClient();
  const { data, isLoading } = useQuery({ queryKey: ["admin-podcast"], queryFn: api.getAdminPodcast });
  const [editing, setEditing] = useState(null);

  const invalidate = () => qc.invalidateQueries({ queryKey: ["admin-podcast"] });
  const createMutation = useMutation({ mutationFn: api.createEpisode, onSuccess: () => { invalidate(); setEditing(null); } });
  const updateMutation = useMutation({ mutationFn: ({ id, data }) => api.updateEpisode(id, data), onSuccess: () => { invalidate(); setEditing(null); } });
  const deleteMutation = useMutation({ mutationFn: api.deleteEpisode, onSuccess: invalidate });

  return (
    <AdminLayout>
      <div className="admin-header">
        <h1 className="admin-title">Podcast</h1>
        <p style={{ color: "var(--text-muted)" }}>Gérez les épisodes de votre podcast.</p>
      </div>

      {editing === "new" && <EpisodeForm onSave={(d) => createMutation.mutate(d)} onCancel={() => setEditing(null)} loading={createMutation.isPending} />}
      {editing && editing !== "new" && <EpisodeForm initial={editing} onSave={(d) => updateMutation.mutate({ id: editing.id, data: d })} onCancel={() => setEditing(null)} loading={updateMutation.isPending} />}

      {!editing && <button className="btn btn-primary" style={{ marginBottom: "1.5rem" }} onClick={() => setEditing("new")}>+ Ajouter un épisode</button>}

      <div className="admin-card" style={{ padding: 0 }}>
        {isLoading && <div className="loading">Chargement…</div>}
        {!isLoading && !data?.length && <p className="placeholder" style={{ padding: "1.5rem" }}>Aucun épisode pour l'instant.</p>}
        {data?.map((ep) => (
          <div key={ep.id} className="list-row">
            <div className="list-row-main">
              <div className="list-row-title">
                {ep.episode_number && <span className="badge-pill badge-gold" style={{ marginRight: "0.5rem" }}>Ép. {ep.episode_number}</span>}
                {ep.title}
              </div>
              {ep.published_at && <div className="list-row-meta">{new Date(ep.published_at).toLocaleDateString("fr-FR")}</div>}
            </div>
            <div className="list-row-actions">
              <button className="btn btn-ghost btn-sm" onClick={() => setEditing(ep)}>Modifier</button>
              <button className="btn btn-ghost btn-sm btn-danger" onClick={() => { if (confirm("Supprimer cet épisode ?")) deleteMutation.mutate(ep.id); }}>Supprimer</button>
            </div>
          </div>
        ))}
      </div>
    </AdminLayout>
  );
}