import { useState, useRef } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../api/client.js";
import AdminLayout from "../../components/AdminLayout.jsx";

export default function AdminResources() {
  const qc = useQueryClient();
  const { data, isLoading } = useQuery({ queryKey: ["admin-resources"], queryFn: api.getAdminResources });
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);
  const fileRef = useRef();

  const invalidate = () => qc.invalidateQueries({ queryKey: ["admin-resources"] });
  const deleteMutation = useMutation({ mutationFn: api.deleteResource, onSuccess: invalidate });
  const updateMutation = useMutation({ mutationFn: ({ id, data }) => api.updateResource(id, data), onSuccess: invalidate });

  const upload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    setUploadError(null);
    const fd = new FormData();
    fd.append("file", file);
    fd.append("title", file.name.replace(/\.[^/.]+$/, ""));
    try {
      await api.uploadResource(fd);
      invalidate();
    } catch {
      setUploadError("Erreur lors de l'upload. Vérifiez la taille du fichier (max 50 Mo).");
    } finally {
      setUploading(false);
      fileRef.current.value = "";
    }
  };

  return (
    <AdminLayout>
      <div className="admin-header">
        <h1 className="admin-title">Ressources</h1>
        <p style={{ color: "var(--text-muted)" }}>Gérez les fichiers disponibles pour vos clientes.</p>
      </div>

      <div className="admin-card" style={{ marginBottom: "1.5rem" }}>
        <h3 style={{ marginBottom: "1rem" }}>Ajouter un fichier</h3>
        <div style={{ display: "flex", gap: "1rem", alignItems: "center", flexWrap: "wrap" }}>
          <input type="file" ref={fileRef} onChange={upload} accept=".pdf,.mp3,.mp4,.m4a,.wav" disabled={uploading} style={{ flex: 1, minWidth: "200px" }} />
          {uploading && <span style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>Upload en cours…</span>}
        </div>
        {uploadError && <p className="admin-error" style={{ marginTop: "0.5rem" }}>{uploadError}</p>}
        <p style={{ color: "var(--text-muted)", fontSize: "0.82rem", marginTop: "0.75rem" }}>Formats acceptés : PDF, MP3, MP4, M4A, WAV · Max 50 Mo</p>
      </div>

      <div className="admin-card" style={{ padding: 0 }}>
        {isLoading && <div className="loading">Chargement…</div>}
        {!isLoading && !data?.length && <p className="placeholder" style={{ padding: "1.5rem" }}>Aucune ressource pour l'instant.</p>}
        {data?.map((r) => (
          <div key={r.id} className="list-row">
            <div className="list-row-main">
              <div className="list-row-title">{r.title}</div>
              <div className="list-row-meta">
                {r.file_type?.toUpperCase()} ·{" "}
                <span className={`badge-pill ${r.is_public ? "badge-green" : "badge-gold"}`}>
                  {r.is_public ? "Public" : "Clients uniquement"}
                </span>
              </div>
            </div>
            <div className="list-row-actions">
              <button
                className="btn btn-ghost btn-sm"
                onClick={() => updateMutation.mutate({ id: r.id, data: { is_public: !r.is_public } })}
              >
                {r.is_public ? "Rendre privé" : "Rendre public"}
              </button>
              <button className="btn btn-ghost btn-sm btn-danger" onClick={() => { if (confirm("Supprimer cette ressource ?")) deleteMutation.mutate(r.id); }}>
                Supprimer
              </button>
            </div>
          </div>
        ))}
      </div>
    </AdminLayout>
  );
}