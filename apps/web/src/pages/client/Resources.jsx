import { useQuery } from "@tanstack/react-query";
import { api } from "../../api/client.js";
import ClientLayout from "../../components/ClientLayout.jsx";

const API = import.meta.env.VITE_API_URL ?? "http://localhost:3001";

const TYPE_ICONS = { pdf: "📄", audio: "🎵", video: "🎬", other: "📎" };
const TYPE_LABELS = { pdf: "PDF", audio: "Audio", video: "Vidéo", other: "Fichier" };

export default function ClientResources() {
  const { data: resources, isLoading } = useQuery({
    queryKey: ["resources"],
    queryFn: api.getResources,
  });

  return (
    <ClientLayout>
      <div className="client-page-title">
        <h1>Ressources</h1>
        <p style={{ color: "var(--text-muted)" }}>Vos supports et documents mis à disposition.</p>
      </div>

      {isLoading && <div className="loading">Chargement…</div>}
      {!isLoading && !resources?.length && (
        <p className="placeholder">Aucune ressource disponible pour le moment.</p>
      )}

      <div className="resources-list">
        {resources?.map((r) => (
          <div key={r.id} className="resource-row">
            <span className="resource-icon">{TYPE_ICONS[r.file_type] ?? "📎"}</span>
            <div className="resource-info">
              <div className="resource-title">{r.title}</div>
              {r.description && <div className="resource-description">{r.description}</div>}
              <div className="resource-type">{TYPE_LABELS[r.file_type] ?? r.file_type}</div>
            </div>
            <a
              href={`${API}/resources/${r.id}/download`}
              className="btn btn-outline btn-sm"
              target="_blank"
              rel="noopener noreferrer"
            >
              Télécharger
            </a>
          </div>
        ))}
      </div>
    </ClientLayout>
  );
}