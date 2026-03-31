import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { api } from "../api/client.js";

function EmailCapture() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(null);

  const submit = async (e) => {
    e.preventDefault();
    try {
      await api.subscribe(email, "podcast");
      setStatus("ok");
      setEmail("");
    } catch {
      setStatus("err");
    }
  };

  return (
    <section className="section capture-section">
      <div className="container">
        <div className="capture-box">
          <div className="section-header centered">
            <span className="section-eyebrow">Ne ratez aucun épisode</span>
            <h2>Restez informé·e</h2>
          </div>
          {status === "ok" ? (
            <p className="form-success" style={{ fontSize: "1rem" }}>Merci ! À très vite dans votre boîte mail.</p>
          ) : (
            <form className="capture-form" onSubmit={submit}>
              <input
                type="email"
                className="input"
                placeholder="votre@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit" className="btn btn-primary">S'inscrire</button>
            </form>
          )}
          {status === "err" && <p className="form-error">Une erreur est survenue. Réessayez.</p>}
        </div>
      </div>
    </section>
  );
}

export default function Podcast() {
  const { data: content } = useQuery({
    queryKey: ["content", "podcast"],
    queryFn: () => api.getContent("podcast"),
  });

  const { data: episodes, isLoading } = useQuery({
    queryKey: ["episodes"],
    queryFn: api.getEpisodes,
  });

  return (
    <div className="page">
      {/* Header */}
      <section className="section" style={{ background: "var(--surface-2)", paddingBottom: "3rem" }}>
        <div className="container">
          <div className="section-header centered">
            <span className="section-eyebrow">Le Podcast</span>
            <h1>{content?.title ?? "Le podcast d'Aicha Hatim"}</h1>
            <div className="section-divider" />
            <p style={{ color: "var(--text-muted)", textAlign: "center", maxWidth: "56ch" }}>
              {content?.description ?? "Des conversations profondes sur la carrière, la confiance en soi et l'art de vivre aligné·e avec ses valeurs."}
            </p>
          </div>

          {/* Platform links */}
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            {content?.spotify_url && (
              <a href={content.spotify_url} target="_blank" rel="noopener noreferrer" className="btn btn-outline btn-sm">
                🎵 Spotify
              </a>
            )}
            {content?.apple_url && (
              <a href={content.apple_url} target="_blank" rel="noopener noreferrer" className="btn btn-outline btn-sm">
                🎙 Apple Podcasts
              </a>
            )}
            {content?.youtube_url && (
              <a href={content.youtube_url} target="_blank" rel="noopener noreferrer" className="btn btn-outline btn-sm">
                ▶ YouTube
              </a>
            )}
          </div>
        </div>
      </section>

      {/* Episodes list */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-eyebrow">Épisodes</span>
            <h2>Tous les épisodes</h2>
            <div className="section-divider" />
          </div>

          {isLoading && <div className="loading">Chargement des épisodes…</div>}

          {!isLoading && !episodes?.length && (
            <p className="placeholder">Les épisodes arrivent bientôt…</p>
          )}

          <div className="episodes-list">
            {episodes?.map((ep) => (
              <div key={ep.id} className="episode-card">
                <div className="episode-meta">
                  {ep.episode_number && (
                    <span className="badge-pill badge-gold">Épisode {ep.episode_number}</span>
                  )}
                  {ep.published_at && (
                    <span className="episode-date">
                      {new Date(ep.published_at).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}
                    </span>
                  )}
                </div>
                <h3 className="episode-title">{ep.title}</h3>
                {ep.description && <p className="episode-description">{ep.description}</p>}
                {ep.embed_url && (
                  <div className="episode-embed">
                    <iframe
                      src={ep.embed_url}
                      height="152"
                      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                      loading="lazy"
                      title={ep.title}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <EmailCapture />
    </div>
  );
}