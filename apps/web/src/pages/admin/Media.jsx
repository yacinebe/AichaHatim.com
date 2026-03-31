import { useRef, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../api/client.js";
import AdminLayout from "../../components/AdminLayout.jsx";

const API = import.meta.env.VITE_API_URL ?? "http://localhost:3001";

export default function AdminMedia() {
  const qc = useQueryClient();
  const { data, isLoading } = useQuery({ queryKey: ["admin-media"], queryFn: api.getAdminMedia });
  const fileRef = useRef();
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);

  const invalidate = () => qc.invalidateQueries({ queryKey: ["admin-media"] });
  const deleteMutation = useMutation({ mutationFn: api.deleteMedia, onSuccess: invalidate });

  const upload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    setError(null);
    const fd = new FormData();
    fd.append("file", file);
    try {
      await api.uploadMedia(fd);
      invalidate();
    } catch {
      setError("Erreur lors de l'upload.");
    } finally {
      setUploading(false);
      fileRef.current.value = "";
    }
  };

  const copyUrl = (url) => {
    navigator.clipboard.writeText(`${API}${url}`);
  };

  return (
    <AdminLayout>
      <div className="admin-header">
        <h1 className="admin-title">Médiathèque</h1>
        <p style={{ color: "var(--text-muted)" }}>Uploadez et gérez vos images et fichiers.</p>
      </div>

      <div className="admin-card" style={{ marginBottom: "1.5rem" }}>
        <h3 style={{ marginBottom: "1rem" }}>Ajouter un fichier</h3>
        <input type="file" ref={fileRef} onChange={upload} disabled={uploading} />
        {uploading && <p style={{ color: "var(--text-muted)", marginTop: "0.5rem", fontSize: "0.9rem" }}>Upload en cours…</p>}
        {error && <p className="admin-error" style={{ marginTop: "0.5rem" }}>{error}</p>}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: "1rem" }}>
        {isLoading && <div className="loading" style={{ gridColumn: "1/-1" }}>Chargement…</div>}
        {!isLoading && !data?.length && <p className="placeholder" style={{ gridColumn: "1/-1" }}>Aucun fichier uploadé.</p>}
        {data?.map((m) => (
          <div key={m.id} className="card" style={{ padding: "0.75rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            {m.mime_type?.startsWith("image/") ? (
              <img src={`${API}${m.url}`} alt={m.filename} style={{ width: "100%", height: "100px", objectFit: "cover", borderRadius: "var(--radius-sm)" }} />
            ) : (
              <div style={{ width: "100%", height: "100px", background: "var(--surface-2)", borderRadius: "var(--radius-sm)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "2rem" }}>📎</div>
            )}
            <p style={{ fontSize: "0.75rem", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", color: "var(--text-muted)" }}>{m.filename}</p>
            <div style={{ display: "flex", gap: "0.25rem" }}>
              <button className="btn btn-ghost btn-sm" style={{ flex: 1 }} onClick={() => copyUrl(m.url)}>Copier URL</button>
              <button className="btn btn-ghost btn-sm btn-danger" onClick={() => { if (confirm("Supprimer ?")) deleteMutation.mutate(m.id); }}>×</button>
            </div>
          </div>
        ))}
      </div>
    </AdminLayout>
  );
}
