import { useQuery } from "@tanstack/react-query";
import { api } from "../api/client.js";

const CALENDLY_URL = import.meta.env.VITE_CALENDLY_URL ?? "#";
const INSTAGRAM_PODCAST = "https://instagram.com/reinventionspodcast";

// ── Wave divider ──────────────────────────────────────────────────────
function WaveDivider({ to = "var(--surface-2)" }) {
  return (
    <div className="wave-divider">
      <svg viewBox="0 0 1440 60" preserveAspectRatio="none">
        <path d="M0,0 C360,60 1080,0 1440,60 L1440,60 L0,60 Z" fill={to} />
      </svg>
    </div>
  );
}

// ── Platform links ────────────────────────────────────────────────────
function PlatformLinks({ content, compact = false }) {
  const platforms = [
    { key: "spotify_url", icon: "🎵", label: "Spotify", color: "#1db954" },
    { key: "apple_url", icon: "🎙", label: "Apple Podcasts", color: "#9933cc" },
    { key: "youtube_url", icon: "▶", label: "YouTube", color: "#ff0000" },
  ];

  return (
    <div className={`platform-links ${compact ? "compact" : ""}`}>
      {platforms.map((p) => (
        <a
          key={p.key}
          href={content?.[p.key] ?? "#"}
          target="_blank"
          rel="noopener noreferrer"
          className="platform-btn"
        >
          <span className="platform-icon">{p.icon}</span>
          <span>{p.label}</span>
        </a>
      ))}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════
// PAGE PODCAST
// ═══════════════════════════════════════════════════════════════════════
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
      {/* ═══════════════════════════════════════════════════════════════ */}
      {/* HERO — RÉINVENTIONS */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      <section className="podcast-hero">
        <div className="container">
          <div className="podcast-hero-inner">
            <div className="podcast-hero-content">
              <p className="landing-subtitle" style={{ color: "var(--accent)" }}>Le podcast</p>
              <h1 className="podcast-title">RÉINVENTIONS</h1>
              <p className="podcast-tagline">
                Le podcast qui explore ce qui se passe dans la tête et dans le cœur
                <br /><strong>quand on change de vie.</strong>
              </p>
              <PlatformLinks content={content} />
              <p className="podcast-frequency">
                🎙️ Un nouvel épisode tous les 15 jours
              </p>
            </div>

            {/* Phone mockup */}
            <div className="podcast-phone">
              <div className="phone-frame">
                <div className="phone-screen">
                  <div className="phone-header">
                    <span>9:41</span>
                    <div className="phone-notch" />
                  </div>
                  <div className="phone-player">
                    <div className="phone-cover">
                      <span className="phone-cover-label">RÉINVENTIONS</span>
                    </div>
                    <div className="phone-title-box">
                      <p className="phone-episode-title">Oser se réinventer</p>
                      <p className="phone-episode-sub">Épisode #1 · Aïcha Hatim</p>
                    </div>
                    <div className="phone-progress">
                      <div className="phone-progress-bar" />
                    </div>
                    <div className="phone-controls">
                      <span>⏮</span>
                      <div className="phone-play">▶</div>
                      <span>⏭</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <WaveDivider to="var(--bg)" />

      {/* ═══════════════════════════════════════════════════════════════ */}
      {/* CONCEPT — Ouverture */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      <section className="landing-section landing-section-narrow" style={{ background: "var(--bg)" }}>
        <div className="container">
          <div style={{ maxWidth: "var(--max-w-narrow)", margin: "0 auto", textAlign: "center" }}>
            <p className="podcast-intro-line">
              Tu peux avoir une vie qui <em>« coche toutes les cases »</em>…<br />
              et ressentir qu'il manque quelque chose.
            </p>
            <p className="podcast-intro-line">
              Tu peux être ambitieuse, avancer, réussir…<br />
              et en même temps te demander :
            </p>
            <p className="podcast-big-question">
              « Est-ce que c'est vraiment ça, ma vie ? »
            </p>
          </div>
        </div>
      </section>

      <WaveDivider to="var(--surface-2)" />

      {/* ═══════════════════════════════════════════════════════════════ */}
      {/* MON HISTOIRE (liée au podcast) */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      <section className="landing-section landing-section-narrow" style={{ background: "var(--surface-2)" }}>
        <div className="container">
          <div style={{ maxWidth: "var(--max-w-narrow)", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
              <p className="landing-subtitle">La genèse</p>
              <h2 className="landing-title">Comment Réinventions est né</h2>
            </div>

            <p className="landing-text" style={{ margin: "0 auto" }}>
              Je m'appelle <strong>Aïcha Hatim</strong>. Je suis coach professionnelle certifiée.
            </p>
            <p className="landing-text" style={{ margin: "0.75rem auto" }}>
              Mais avant ça, j'ai passé plus de 10 ans à construire une carrière dans le corporate,
              à toujours vouloir bien faire, à toujours donner plus.
            </p>
            <p className="landing-text" style={{ margin: "0.75rem auto" }}>
              <strong>Jusqu'au jour où j'ai senti que ce « plus » ne me nourrissait plus.</strong>
            </p>
            <p className="landing-text" style={{ margin: "0.75rem auto" }}>
              Et avec ça, une question :
            </p>
            <p className="podcast-question-highlight">
              « Et maintenant… je fais quoi ? »
            </p>
            <p className="landing-text" style={{ margin: "0.75rem auto" }}>
              À ce moment-là, j'avais l'impression que personne ne parlait de ça :
              des doutes, des remises en question, de ce qui se passe à l'intérieur
              quand tout bouge.
            </p>
            <p className="landing-text" style={{ margin: "1.25rem auto", fontWeight: 500, color: "var(--primary)", fontSize: "1.1rem", textAlign: "center" }}>
              C'est là qu'est né <em>Réinventions</em>.
            </p>
            <p className="landing-text" style={{ margin: "0 auto", textAlign: "center", fontStyle: "italic" }}>
              Le podcast que j'aurais aimé écouter à ce moment-là.
            </p>
          </div>
        </div>
      </section>

      <WaveDivider to="var(--bg)" />

      {/* ═══════════════════════════════════════════════════════════════ */}
      {/* À PROPOS DU PODCAST */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      <section className="landing-section landing-section-narrow" style={{ background: "var(--bg)" }}>
        <div className="container">
          <div style={{ maxWidth: "var(--max-w-narrow)", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "3rem" }}>
              <p className="landing-subtitle">Le concept</p>
              <h2 className="landing-title">De quoi on parle ?</h2>
            </div>

            <p className="landing-text" style={{ textAlign: "center", margin: "0 auto" }}>
              Dans chaque épisode, j'invite des <strong>Marocaines du monde entier</strong>
              qui ont osé se réinventer.
            </p>

            <ul className="arrow-list" style={{ maxWidth: "600px", margin: "2rem auto" }}>
              <li>Quitter une voie toute tracée</li>
              <li>Remettre en question leur définition du succès</li>
              <li>Construire une vie plus alignée avec qui elles sont vraiment</li>
            </ul>

            <p className="landing-text" style={{ textAlign: "center", margin: "0 auto" }}>
              Mais ici… on ne parle pas juste de ce qu'elles ont fait.
            </p>
            <p className="landing-text" style={{ textAlign: "center", margin: "0.75rem auto" }}>
              On parle de :
            </p>

            <div className="podcast-topics">
              <span className="podcast-topic">leurs doutes</span>
              <span className="podcast-topic">leurs déclics</span>
              <span className="podcast-topic">leurs peurs</span>
              <span className="podcast-topic">leurs choix</span>
              <span className="podcast-topic">tout ce qui se passe à l'intérieur</span>
            </div>

            <div className="podcast-manifesto">
              <p><strong>Ce n'est pas un podcast sur le succès.</strong></p>
              <p>C'est un podcast sur :</p>
              <ul className="arrow-list">
                <li>Ce qu'il faut déconstruire pour avancer autrement</li>
                <li>Ce qu'on traverse quand on sort du pilote automatique</li>
                <li>Comment on se reconnecte à soi</li>
              </ul>
              <p style={{ marginTop: "1rem" }}>
                Chaque épisode est une conversation <strong>profonde, intime, sans posture</strong>.
              </p>
              <p>Une invitation à ralentir, t'écouter et questionner ta propre trajectoire.</p>
            </div>

            <p className="landing-text" style={{ textAlign: "center", margin: "1.5rem auto 0", fontStyle: "italic", color: "var(--accent-dim)" }}>
              À travers ce podcast, comme dans mon coaching, je cherche à créer
              un pont entre <strong>ambition et épanouissement</strong>.
            </p>
          </div>
        </div>
      </section>

      <WaveDivider to="var(--surface-2)" />

      {/* ═══════════════════════════════════════════════════════════════ */}
      {/* SECTION ÉCOUTE */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      <section className="landing-section" style={{ background: "var(--surface-2)" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <p className="landing-subtitle">Écouter</p>
            <h2 className="landing-title">🎧 Les épisodes</h2>
            <p className="landing-text" style={{ margin: "0 auto" }}>
              Disponible sur toutes les plateformes
            </p>
          </div>

          <PlatformLinks content={content} />

          {/* Episodes list */}
          <div className="episodes-list" style={{ marginTop: "3rem", maxWidth: "820px", marginLeft: "auto", marginRight: "auto" }}>
            {isLoading && <div className="loading">Chargement des épisodes…</div>}

            {!isLoading && !episodes?.length && (
              <div style={{ textAlign: "center", padding: "3rem", background: "var(--surface)", borderRadius: "var(--radius)", border: "1px solid var(--border)" }}>
                <p style={{ color: "var(--text-light)", fontFamily: "var(--font-heading)" }}>
                  Les premiers épisodes arrivent bientôt…
                </p>
              </div>
            )}

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

      <WaveDivider to="var(--surface-3)" />

      {/* ═══════════════════════════════════════════════════════════════ */}
      {/* CTA DOUX */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      <section className="landing-section" style={{ background: "var(--surface-3)", color: "#fff", textAlign: "center" }}>
        <div className="container">
          <div style={{ maxWidth: "620px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "1.25rem", alignItems: "center" }}>
            <p className="landing-subtitle" style={{ color: "var(--accent-light)" }}>Aller plus loin</p>
            <h2 className="landing-title" style={{ color: "#fff" }}>
              Si ces conversations résonnent en toi…
            </h2>
            <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "1.05rem", lineHeight: 1.8, maxWidth: "50ch" }}>
              Il y a peut-être quelque chose en toi qui est prêt à évoluer.
            </p>
            <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.95rem", lineHeight: 1.7, maxWidth: "50ch" }}>
              Et si tu veux aller plus loin que l'écoute :<br />
              tu peux réserver une session découverte avec moi.
            </p>
            <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className="btn-cta" style={{ marginTop: "0.5rem" }}>
              Réserver ma session offerte
            </a>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════ */}
      {/* FOOTER PODCAST */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      <section style={{ background: "var(--primary-dim)", color: "rgba(255,255,255,0.75)", padding: "2.5rem 0", textAlign: "center" }}>
        <div className="container">
          <div className="podcast-footer">
            <span>🎙️ Un nouvel épisode tous les 15 jours</span>
            <span className="podcast-footer-sep">·</span>
            <span>📍 Disponible sur toutes les plateformes</span>
            <span className="podcast-footer-sep">·</span>
            <a href={INSTAGRAM_PODCAST} target="_blank" rel="noopener noreferrer" style={{ color: "var(--accent-light)" }}>
              📲 @reinventionspodcast
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
