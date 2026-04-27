import React from "react";

const CALENDLY_URL = import.meta.env.VITE_CALENDLY_URL ?? "https://calendly.com/aicha-hatim/let-s-chat";
const SPOTIFY_URL = "https://open.spotify.com/show/6WaICsmz5rhzQhMpuDIL2m";
const APPLE_URL = "https://podcasts.apple.com/us/podcast/r%C3%A9inventions/id1848308091";
const YOUTUBE_URL = "https://www.youtube.com/@R%C3%A9inventions";

export default function PodcastPage() {
  const featured = {
    youtubeId: "pLMdssfs7hM",
    title: "[Titre épisode à compléter]",
    guest: "[Invité·e]",
    duration: "—",
    date: "Récent",
    desc: "Un des épisodes les plus regardés de Réinventions. À remplacer par la vraie description."
  };

  const episodes = [
    { num: 11, date: "22 oct 2024", duration: "47 min", title: "Quitter le corporate sans tout casser", guest: "Inès B., ex-manager produit", desc: "Comment poser un cadre de transition qui te laisse le temps d'écouter ce que tu veux vraiment." },
    { num: 10, date: "8 oct 2024", duration: "38 min", title: "Solo — La voix qui dit \"tu n'es pas légitime\"", guest: null, desc: "D'où elle vient, à qui elle parle vraiment, et pourquoi la faire taire est rarement la bonne stratégie." },
    { num: 9, date: "24 sept 2024", duration: "54 min", title: "De directrice marketing à thérapeute", guest: "Camille L., thérapeute", desc: "10 ans de communication, un burn-out, une reconversion en thérapie systémique." },
    { num: 8, date: "10 sept 2024", duration: "41 min", title: "Avocate, mère, et fondatrice — choisir de ne pas choisir", guest: "Léa V., avocate-entrepreneur", desc: "Trois vies en parallèle, sans se renier." },
    { num: 7, date: "27 août 2024", duration: "44 min", title: "Solo — \"J'ai tout pour être heureuse\" et pourtant", guest: null, desc: "Ce que cache cette phrase qu'on entend (et qu'on se dit) cent fois." },
    { num: 6, date: "13 août 2024", duration: "49 min", title: "Quitter Paris à 42 ans pour recommencer", guest: "Anaïs D., libraire", desc: "Pas une fuite. Un choix. Anaïs raconte le déménagement, la librairie, et la femme qu'elle est devenue." },
  ];

  return (
    <main>
      <section className="podcast-hero-v2">
        <div className="container">
          <div className="podcast-hero-v2-inner">
            <div className="podcast-cover">
              <img src="/reinventions-logo.png" alt="Réinventions, le podcast" />
              <div className="podcast-cover-accent" />
            </div>
            <div className="podcast-hero-v2-content">
              <span className="story-eyebrow">Le podcast</span>
              <h1 className="podcast-title-v2">Réinventions</h1>
              <p className="podcast-tagline-v2">
                Des conversations avec des femmes (et parfois des hommes) qui se sont
                <strong> réinventés professionnellement.</strong> Pas de recettes magiques —
                des récits vrais, des bascules concrètes, des lendemains.
              </p>
              <div className="platform-links">
                <a className="platform-btn-v2 spotify" href={SPOTIFY_URL} target="_blank" rel="noopener noreferrer">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0a12 12 0 100 24 12 12 0 000-24zm5.5 17.3a.75.75 0 01-1 .25c-2.8-1.7-6.3-2.1-10.4-1.1a.75.75 0 11-.3-1.5c4.5-1 8.4-.6 11.5 1.4a.75.75 0 01.2 1zm1.5-3.3a.94.94 0 01-1.3.3c-3.2-2-8-2.5-11.8-1.4a.94.94 0 11-.5-1.8c4.3-1.3 9.6-.7 13.3 1.6a.94.94 0 01.3 1.3zm.1-3.4c-3.8-2.3-10.2-2.5-13.9-1.4a1.13 1.13 0 11-.6-2.2c4.2-1.3 11.2-1 15.6 1.6a1.13 1.13 0 11-1.1 2z"/></svg>
                  Spotify
                </a>
                <a className="platform-btn-v2 apple" href={APPLE_URL} target="_blank" rel="noopener noreferrer">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0a12 12 0 100 24 12 12 0 000-24zm0 4.6a3 3 0 110 6 3 3 0 010-6zm0 8.4c2 0 3.7 1.4 4 3.4l.3 2.6a1.4 1.4 0 01-1 1.4 13.5 13.5 0 01-6.6 0 1.4 1.4 0 01-1-1.4l.3-2.6c.3-2 2-3.4 4-3.4z"/></svg>
                  Apple Podcasts
                </a>
                <a className="platform-btn-v2 youtube" href={YOUTUBE_URL} target="_blank" rel="noopener noreferrer">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M23.5 6.2a3 3 0 00-2.1-2.1c-1.87-.5-9.4-.5-9.4-.5s-7.5-.01-9.4.5A3 3 0 00.53 6.2 31.25 31.25 0 000 12c0 1.94.18 3.87.52 5.78a3 3 0 002.1 2.1c1.87.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 002.08-2.1c.34-1.91.51-3.84.5-5.78a31.25 31.25 0 00-.5-5.8zM9.6 15.6V8.4l6.27 3.6z"/></svg>
                  YouTube
                </a>
              </div>
              <span className="podcast-frequency-v2">Un nouvel épisode <strong>un mardi sur deux</strong></span>
            </div>
          </div>
        </div>
      </section>

      <section className="landing-section" style={{ background: "var(--surface-2)" }}>
        <div className="container">
          <div className="podcast-manifesto">
            <span className="story-eyebrow" style={{ textAlign: "center", display: "block" }}>Pourquoi ce podcast</span>
            <p className="podcast-manifesto-lead">
              Parce qu'on parle beaucoup de <em>réussite</em>. Très peu de
              <strong> bascules.</strong>
            </p>
            <p className="podcast-manifesto-body">
              J'invite des femmes — et parfois des hommes — qui ont quitté un métier, un cadre,
              une identité professionnelle. Pas pour faire la leçon. Pour raconter
              <strong> ce qui s'est passé à l'intérieur</strong> avant que ça change à l'extérieur.
              Une fois sur deux je suis seule au micro, sur un sujet qui m'a traversée la semaine.
            </p>
            <p className="podcast-manifesto-sign">— Aicha</p>
          </div>
        </div>
      </section>

      <section className="landing-section" style={{ background: "var(--bg)" }}>
        <div className="container">
          <div className="section-header">
            <span className="section-eyebrow">À l'écoute en ce moment</span>
            <h2>Dernier épisode</h2>
            <div className="section-divider" />
          </div>
          <div className="featured-episode">
            <div className="featured-video">
              <iframe
                src={`https://www.youtube.com/embed/${featured.youtubeId}`}
                title={featured.title}
                frameBorder="0"
                allow="accelerometer; clipboard-write; encrypted-media; picture-in-picture"
                allowFullScreen
              />
            </div>
            <div className="featured-meta">
              <div className="featured-tags">
                <span className="badge-pill badge-gold">Nouveau</span>
                <span className="featured-num">Épisode vedette</span>
              </div>
              <h3 className="featured-title">{featured.title}</h3>
              <div className="featured-sub">
                <span>{featured.guest}</span>
                <span className="dot">·</span>
                <span>{featured.duration}</span>
                <span className="dot">·</span>
                <span>{featured.date}</span>
              </div>
              <p className="featured-desc">{featured.desc}</p>
              <div className="platform-links compact">
                <a className="platform-btn" href={SPOTIFY_URL} target="_blank" rel="noopener noreferrer">Écouter sur Spotify</a>
                <a className="platform-btn" href={APPLE_URL} target="_blank" rel="noopener noreferrer">Apple Podcasts</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="landing-section" style={{ background: "var(--surface-2)" }}>
        <div className="container">
          <div className="section-header">
            <span className="section-eyebrow">Tous les épisodes</span>
            <h2>Le catalogue</h2>
            <div className="section-divider" />
          </div>
          <div className="episodes-list-v2">
            {episodes.map(ep => (
              <article className="episode-card-v2" key={ep.num}>
                <div className="episode-card-num">#{String(ep.num).padStart(2, "0")}</div>
                <div className="episode-card-body">
                  <div className="episode-card-meta">
                    <span>{ep.date}</span>
                    <span className="dot">·</span>
                    <span>{ep.duration}</span>
                    {ep.guest ? (
                      <><span className="dot">·</span><span className="episode-guest">{ep.guest}</span></>
                    ) : (
                      <><span className="dot">·</span><span className="episode-solo">Solo</span></>
                    )}
                  </div>
                  <h3 className="episode-card-title">{ep.title}</h3>
                  <p className="episode-card-desc">{ep.desc}</p>
                </div>
                <div className="episode-card-actions">
                  <a className="ep-action spotify" href={SPOTIFY_URL} target="_blank" rel="noopener noreferrer" aria-label="Spotify">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0a12 12 0 100 24 12 12 0 000-24zm5.5 17.3a.75.75 0 01-1 .25c-2.8-1.7-6.3-2.1-10.4-1.1a.75.75 0 11-.3-1.5c4.5-1 8.4-.6 11.5 1.4a.75.75 0 01.2 1z"/></svg>
                  </a>
                  <a className="ep-action youtube" href={YOUTUBE_URL} target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M23.5 6.2a3 3 0 00-2.1-2.1c-1.87-.5-9.4-.5-9.4-.5s-7.5-.01-9.4.5A3 3 0 00.53 6.2 31.25 31.25 0 000 12c0 1.94.18 3.87.52 5.78a3 3 0 002.1 2.1c1.87.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 002.08-2.1c.34-1.91.51-3.84.5-5.78a31.25 31.25 0 00-.5-5.8zM9.6 15.6V8.4l6.27 3.6z"/></svg>
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
