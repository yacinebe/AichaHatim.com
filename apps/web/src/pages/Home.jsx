import { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { api } from "../api/client.js";

const CALENDLY_URL = import.meta.env.VITE_CALENDLY_URL ?? "#";

// ── Photo switcher (temporaire — pour tester les photos) ──────────────
const PHOTOS = [
  "IMG_4586.JPG","IMG_4587.JPG","IMG_4589.JPG","IMG_4591.JPG","IMG_4592.JPG",
  "IMG_4593.JPG","IMG_4594 2.JPG","IMG_4594.JPG","IMG_4595 2.JPG","IMG_4595.JPG",
  "IMG_4596.JPG","IMG_4597 2.JPG","IMG_4597.JPG","IMG_4599.JPG","IMG_4600.JPG",
  "IMG_4601.JPG","IMG_4602.JPG","IMG_4603.JPG","IMG_4604.JPG","IMG_4605.JPG",
  "IMG_4606.JPG","IMG_4607.JPG","IMG_4608.JPG","IMG_4609.JPG","IMG_4610.JPG",
  "IMG_4611.JPG","IMG_4612.JPG","IMG_4613.JPG","IMG_4618.JPG",
];

function PhotoSwitcher({ startIndex = 0 }) {
  const [idx, setIdx] = useState(startIndex % PHOTOS.length);
  const prev = () => setIdx((i) => (i - 1 + PHOTOS.length) % PHOTOS.length);
  const next = () => setIdx((i) => (i + 1) % PHOTOS.length);
  return (
    <>
      <img src={`/pictures/${PHOTOS[idx]}`} alt="Aicha Hatim" />
      <div style={{
        position: "absolute", bottom: "0.75rem", left: "50%", transform: "translateX(-50%)",
        display: "flex", gap: "0.5rem", alignItems: "center",
        background: "rgba(0,0,0,0.55)", borderRadius: "50px", padding: "0.3rem 0.75rem", zIndex: 2,
      }}>
        <button onClick={prev} style={{ background: "none", border: "none", color: "#fff", cursor: "pointer", fontSize: "1rem" }}>◀</button>
        <span style={{ color: "rgba(255,255,255,0.8)", fontSize: "0.7rem", minWidth: "80px", textAlign: "center" }}>
          {PHOTOS[idx].replace(".JPG", "")} ({idx + 1}/{PHOTOS.length})
        </span>
        <button onClick={next} style={{ background: "none", border: "none", color: "#fff", cursor: "pointer", fontSize: "1rem" }}>▶</button>
      </div>
    </>
  );
}

// ── Wave divider SVG ──────────────────────────────────────────────────
function WaveDivider({ from = "var(--bg)", to = "var(--surface-2)" }) {
  return (
    <div className="wave-divider">
      <svg viewBox="0 0 1440 60" preserveAspectRatio="none">
        <path d="M0,0 C360,60 1080,0 1440,60 L1440,60 L0,60 Z" fill={to} />
        <rect width="1440" height="1" fill={from} opacity="0" />
      </svg>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════
// SECTION 1 — HERO
// ═══════════════════════════════════════════════════════════════════════
function HeroSection() {
  return (
    <section className="landing-hero">
      <div className="landing-hero-inner">
        <div className="landing-hero-content">
          <h1 className="landing-hero-headline">
            Tu as suivi toutes les règles. Travaillé dur. Tout donné.{" "}
            <span className="headline-warm">Mais tu cours encore — et tu ne sais même plus pourquoi.</span>
          </h1>
          <p className="landing-hero-body">
            Tu réussis à l'extérieur. Mais à l'intérieur, tu es à bout.
            Fatiguée, irritable, jamais assez. Et tu sens que si tu continues comme ça, quelque chose va lâcher.
          </p>
          <p className="landing-hero-mission">
            Je t'aide à passer de la bonne élève qui s'épuise… à la femme qui s'épanouit.
          </p>
          <div className="hero-actions">
            <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className="btn-cta hero-btn">
              Réserver ma session offerte →
            </a>
            <span className="hero-reassurance">Gratuit · 30 min · Sans engagement</span>
          </div>
          <div className="hero-proof">
            <div className="hero-proof-item">
              <span className="hero-proof-num">+10 ans</span>
              <span className="hero-proof-label">d'expérience corporate</span>
            </div>
            <div className="hero-proof-item">
              <span className="hero-proof-num">ICF</span>
              <span className="hero-proof-label">Coach certifiée</span>
            </div>
            <div className="hero-proof-item">
              <span className="hero-proof-num">4 mois</span>
              <span className="hero-proof-label">d'accompagnement 1:1</span>
            </div>
          </div>
        </div>
        <div className="landing-photo">
          <PhotoSwitcher startIndex={0} />
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════
// SECTION 2 — SECTION MIROIR
// ═══════════════════════════════════════════════════════════════════════
function MiroirSection() {
  return (
    <section className="landing-section" style={{ background: "var(--bg)" }}>
      <div className="container">
        <div className="miroir-content">
          <h2 className="landing-title" style={{ textAlign: "center" }}>Qui est la bonne élève ?</h2>

          {/* 3 cards */}
          <div className="miroir-cards">
            {/* Au travail */}
            <div className="miroir-card">
              <div className="miroir-card-icon">💼</div>
              <h3 className="miroir-card-title">Au travail</h3>
              <p className="miroir-card-pos">
                Elle livre, performe, anticipe. On peut compter sur elle.
              </p>
              <div className="miroir-card-sep" />
              <p className="miroir-card-neg">
                Mais elle doute en réunion, n'ose pas prendre certaines places.
                Elle a peur qu'on découvre qu'elle n'est pas si sûre d'elle.
                Et malgré tout… elle n'arrive pas à <em>être fière.</em>
              </p>
            </div>

            {/* Vie perso */}
            <div className="miroir-card">
              <div className="miroir-card-icon">🏠</div>
              <h3 className="miroir-card-title">Dans sa vie perso</h3>
              <p className="miroir-card-pos">
                Elle gère aussi la maison, les enfants, le couple, la charge mentale. Tout.
              </p>
              <div className="miroir-card-sep" />
              <p className="miroir-card-neg">
                Mais elle rentre épuisée, irritable. Elle réagit trop fort pour des petites choses.
                Et elle culpabilise — parce qu'elle ne veut pas être <em>cette maman-là.</em>
              </p>
            </div>

            {/* Avec elle-même */}
            <div className="miroir-card">
              <div className="miroir-card-icon">🪞</div>
              <h3 className="miroir-card-title">Avec elle-même</h3>
              <p className="miroir-card-pos">
                Elle essaie de prendre soin d'elle. Le sport, l'alimentation, les podcasts, les livres de dev perso.
              </p>
              <div className="miroir-card-sep" />
              <p className="miroir-card-neg">
                Mais malgré tout ça, elle reste <em>dure avec elle-même.</em> Jamais assez.
                Elle a du mal à ralentir, à ne rien faire, à profiter sans culpabiliser.
              </p>
            </div>
          </div>

          {/* Et pourtant */}
          <div className="miroir-pourtant-grid">
            <div className="miroir-pourtant-left">
              <p className="miroir-pourtant-label">Et pourtant…</p>
              <div className="miroir-pourtant-item">
                <div className="miroir-pourtant-check">✓</div>
                <span>Elle a tout bien fait</span>
              </div>
              <div className="miroir-pourtant-item">
                <div className="miroir-pourtant-check">✓</div>
                <span>Elle a réussi</span>
              </div>
              <div className="miroir-pourtant-item">
                <div className="miroir-pourtant-check">✓</div>
                <span>Elle a construit une belle vie</span>
              </div>
            </div>
            <div className="miroir-pourtant-right">
              <p className="miroir-pourtant-but">Mais…</p>
              <p className="miroir-punchline">
                Elle ne ressent pas la fierté, la joie ou l'épanouissement
                qu'elle s'était imaginé en arrivant là.
              </p>
            </div>
          </div>

          <p className="miroir-conclusion">
            La bonne élève, c'est une femme brillante…<br />
            <strong>coincée dans un mode qui l'épuise et l'empêche de profiter de la vie qu'elle a mis tant d'efforts à construire.</strong>
          </p>

          {/* Placeholder vidéo */}
          <div className="miroir-video">
            <div className="vsl-wrapper" style={{ maxWidth: "680px", margin: "0 auto" }}>
              <div style={{
                position: "absolute", inset: 0, display: "flex", alignItems: "center",
                justifyContent: "center", background: "var(--surface-2)", color: "var(--text-light)",
                fontFamily: "var(--font-heading)", fontSize: "1rem",
              }}>
                ▶ Vidéo à venir
              </div>
            </div>
          </div>

          <div className="section-cta">
            <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className="btn-cta">
              Réserver ma session offerte
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════
// SECTION 3 — CE QUE TU AS ESSAYÉ
// ═══════════════════════════════════════════════════════════════════════
function EssayeSection() {
  return (
    <section className="landing-section" style={{ background: "var(--surface-2)" }}>
      <div className="container">
        <div className="essaye-content">
          <h2 className="landing-title" style={{ textAlign: "center" }}>
            Ce que tu as déjà essayé<br />
            <span style={{ fontSize: "0.75em", fontWeight: 400, color: "var(--text-muted)" }}>
              (et pourquoi ça n'a pas suffi)
            </span>
          </h2>

          <div className="essaye-two-col">
            {/* Col 1 */}
            <div className="essaye-col">
              <h3 className="essaye-col-title">Tu serres les dents et tu continues</h3>
              <p className="essaye-col-body">
                Quand ça ne va plus… tu pousses encore plus fort.
              </p>
              <div className="essaye-thoughts">
                <div className="essaye-thought">« Je dois mieux m'organiser »</div>
                <div className="essaye-thought">« Je dois me reprendre »</div>
                <div className="essaye-thought">« Je dois être plus disciplinée »</div>
              </div>
              <p className="essaye-col-body">
                Tu lis, tu écoutes des podcasts, des livres de dev perso ou de leadership.
                Tu comprends plein de choses. Tu sais même exactement ce qui ne va pas.
              </p>
              <p className="essaye-col-punchline">Mais tu continues à fonctionner exactement pareil.</p>
            </div>

            {/* Col 2 */}
            <div className="essaye-col">
              <h3 className="essaye-col-title">Tu veux tout plaquer</h3>
              <p className="essaye-col-body">
                Ou alors tu te dis que la solution c'est de repartir de zéro.
                Changer d'air. Changer de cadre. Que quelque chose à l'extérieur
                va enfin changer ce que tu ressens à l'intérieur.
              </p>
              <div className="essaye-strike-list">
                <div className="essaye-strike-item">
                  <div className="essaye-strike-x">✕</div>
                  <span className="essaye-strike-text">quitter ton job</span>
                </div>
                <div className="essaye-strike-item">
                  <div className="essaye-strike-x">✕</div>
                  <span className="essaye-strike-text">changer de carrière</span>
                </div>
                <div className="essaye-strike-item">
                  <div className="essaye-strike-x">✕</div>
                  <span className="essaye-strike-text">déménager</span>
                </div>
                <div className="essaye-strike-item">
                  <div className="essaye-strike-x">✕</div>
                  <span className="essaye-strike-text">tout recommencer ailleurs</span>
                </div>
              </div>
              <p className="essaye-col-body">
                Mais au fond tu le sais déjà. Tu ne veux pas vraiment tout envoyer balader.
                Et même si tu changeais tout…
              </p>
              <p className="essaye-col-punchline">Tu recrééerais la même pression ailleurs.</p>
            </div>
          </div>

          <div className="essaye-highlight">
            <p>Parce que le problème n'est pas ta vie.</p>
            <p className="essaye-highlight-big">C'est ta façon de fonctionner de l'intérieur.</p>
            <p>
              Et ça, tu ne peux pas le voir seule.<br />
              Pas parce que tu n'es pas capable —<br />
              mais parce que <strong>c'est avec ce même mode que tu essaies de t'en sortir.</strong>
            </p>
          </div>

          <p className="landing-text" style={{ textAlign: "center", margin: "0 auto", fontWeight: 500, color: "var(--primary)" }}>
            Si tu sens que tu tournes en rond…<br />
            c'est exactement ce qu'on vient débloquer ensemble.
          </p>

          <div className="section-cta">
            <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className="btn-cta">
              Voir si c'est fait pour moi
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════
// SECTION 4 — PROGRAMME (unifié : définition + vision + méthode + structure)
// ═══════════════════════════════════════════════════════════════════════
function ProgrammeSection() {
  return (
    <section className="landing-section" style={{ background: "var(--bg)" }}>
      <div className="container">
        <div className="programme-content">

          {/* Header */}
          <div className="programme-header">
            <p className="landing-subtitle" style={{ textAlign: "center" }}>Le programme</p>
            <h2 className="landing-title" style={{ textAlign: "center" }}>Réinvention Intérieure</h2>
          </div>

          {/* Définition */}
          <div className="programme-def">
            <p className="programme-def-small">Tu n'as pas besoin de tout casser. Tu n'as pas besoin de faire plus.</p>
            <p className="programme-def-big">
              Ce qui doit changer, c'est ce qui se passe à l'intérieur — ces voix qui te disent
              que tu n'es pas assez, ces mécanismes automatiques qui te poussent à sur-contrôler,
              à sur-performer, à t'oublier.
            </p>
            <p className="programme-def-small">
              C'est un travail en profondeur. Pas théorique.{" "}
              <strong>Ancré dans ta vraie vie, dès la première session.</strong>
            </p>
            <p className="programme-def-small" style={{ fontStyle: "italic" }}>
              Pour que tu passes d'un mode « je serre les dents et je tiens »
              à un mode « je me fais confiance et j'avance ».
            </p>
          </div>

          {/* Vision */}
          <div className="programme-vision">
            <h3 className="programme-section-title">Imagine une vie où…</h3>
            <div className="programme-vision-grid">
              <div className="programme-vision-item">
                <div className="programme-vision-dot" />
                <span>Tu te sens <strong>calme</strong>, même quand il y a de la pression.</span>
              </div>
              <div className="programme-vision-item">
                <div className="programme-vision-dot" />
                <span>Tu avances <strong>sans te suradapter</strong> en permanence.</span>
              </div>
              <div className="programme-vision-item">
                <div className="programme-vision-dot" />
                <span>Tu <strong>prends ta place</strong>, naturellement.</span>
              </div>
              <div className="programme-vision-item">
                <div className="programme-vision-dot" />
                <span>Tu travailles bien — mais <strong>sans t'épuiser.</strong></span>
              </div>
              <div className="programme-vision-item">
                <div className="programme-vision-dot" />
                <span>Tu es <strong>présente</strong> avec tes proches. <strong>En paix</strong> avec toi-même.</span>
              </div>
              <div className="programme-vision-item">
                <div className="programme-vision-dot" />
                <span>Tu as de l'<strong>énergie</strong>. De la <strong>clarté</strong>. De la <strong>légèreté</strong>.</span>
              </div>
            </div>
            <p className="programme-vision-finale">
              Tu ne fais plus que « tenir ».<br />
              <strong>Tu te sens vraiment épanouie dans ta vie.</strong>
            </p>
          </div>

          {/* Méthode */}
          <div className="programme-methode">
            <h3 className="programme-section-title">Ma méthode — 3 piliers</h3>
            <p className="programme-section-sub">
              On ne fait pas que comprendre. On change ta manière de fonctionner — durablement.
            </p>
            <div className="programme-methode-cards">
              <div className="programme-mcard">
                <span className="programme-mcard-num">01</span>
                <div className="programme-mcard-title">Clarté</div>
                <div className="programme-mcard-sub">Comprendre comment tu fonctionnes</div>
                <p className="programme-mcard-body">
                  Tes schémas de pression, de surcontrôle, de fatigue.
                  Les mécanismes automatiques qui te maintiennent là.
                </p>
                <ul className="programme-mcard-list">
                  <li>Saboteurs et réflexes automatiques</li>
                  <li>Dialogue intérieur</li>
                  <li>Croyances limitantes & peurs</li>
                </ul>
                <p className="programme-mcard-result">
                  Tu comprends enfin <strong>pourquoi</strong> tu fonctionnes comme ça.
                </p>
              </div>
              <div className="programme-mcard">
                <span className="programme-mcard-num">02</span>
                <div className="programme-mcard-title">Reconnexion</div>
                <div className="programme-mcard-sub">Revenir à toi</div>
                <p className="programme-mcard-body">
                  Ta vision de vie, tes valeurs, tes émotions, ton corps.
                  Ce qui compte vraiment pour toi.
                </p>
                <ul className="programme-mcard-list">
                  <li>Écouter au lieu de pousser</li>
                  <li>Te comprendre au lieu de te juger</li>
                  <li>Te réguler au lieu de te suradapter</li>
                </ul>
                <p className="programme-mcard-result">
                  Tu passes de <strong>« je subis »</strong> à <strong>« je choisis »</strong>.
                </p>
              </div>
              <div className="programme-mcard">
                <span className="programme-mcard-num">03</span>
                <div className="programme-mcard-title">Réinvention</div>
                <div className="programme-mcard-sub">Agir autrement dans ta vraie vie</div>
                <p className="programme-mcard-body">
                  On traduit tout ça dans ton quotidien, à partir de tes vraies situations.
                </p>
                <ul className="programme-mcard-list">
                  <li>Prendre ta place sans te suradapter</li>
                  <li>Poser des limites sans culpabiliser</li>
                  <li>Ton leadership & ton équilibre de vie</li>
                </ul>
                <p className="programme-mcard-result">
                  <strong>On change ce qui se joue dans ta vraie vie.</strong>
                </p>
              </div>
            </div>
          </div>

          {/* Structure */}
          <div className="programme-structure">
            <h3 className="programme-section-title">Concrètement, c'est :</h3>
            <div className="programme-stats">
              <div className="programme-stat">
                <span className="programme-stat-num">8</span>
                <span className="programme-stat-label">sessions individuelles en visio (1:1)</span>
              </div>
              <div className="programme-stat">
                <span className="programme-stat-num">4</span>
                <span className="programme-stat-label">mois d'accompagnement sur mesure</span>
              </div>
            </div>
            <div className="programme-structure-two">
              <div className="programme-scard">
                <p className="programme-scard-title">Chaque session, c'est :</p>
                <ul className="programme-scard-list">
                  <li>Un espace sûr, sans jugement, où tu n'as pas à performer</li>
                  <li>Des conversations profondes qui t'aident à voir clair</li>
                  <li>Des prises de conscience qui changent ta manière de te percevoir</li>
                  <li>Des mises en action douces mais puissantes</li>
                </ul>
              </div>
              <div className="programme-scard">
                <p className="programme-scard-title">Entre les sessions :</p>
                <ul className="programme-scard-list">
                  <li>Support WhatsApp pour ne pas rester seule</li>
                  <li>Ressources audio et vidéo exclusives</li>
                  <li>Exercices personnalisés pour ancrer ce que l'on travaille</li>
                </ul>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="section-cta">
            <p style={{ textAlign: "center", fontWeight: 500, color: "var(--primary)", marginBottom: "1rem" }}>
              Si tu veux faire ce travail accompagnée…
            </p>
            <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className="btn-cta">
              Réserver ma session offerte
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════
// SECTION 8 — TÉMOIGNAGES
// ═══════════════════════════════════════════════════════════════════════
function TemoignagesSection() {
  const { data: testimonials } = useQuery({ queryKey: ["testimonials"], queryFn: api.getTestimonials });

  return (
    <section className="landing-section" style={{ background: "var(--bg)" }}>
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <p className="landing-subtitle">Elles l'ont vécu</p>
          <h2 className="landing-title">Témoignages</h2>
        </div>

        {testimonials?.length ? (
          <div className="testimonials-grid">
            {testimonials.map((t) => (
              <div key={t.id} className="testimonial-card">
                {t.video_url ? (
                  <div className="testimonial-video">
                    <iframe src={t.video_url.replace("watch?v=", "embed/")} title={t.author_name} allowFullScreen />
                  </div>
                ) : (
                  <p className="testimonial-quote">{t.content}</p>
                )}
                <div className="testimonial-author">
                  <div className="testimonial-avatar" style={{ background: "var(--surface-2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.1rem" }}>
                    {t.author_name?.[0]}
                  </div>
                  <div>
                    <div className="testimonial-name">{t.author_name}</div>
                    {t.author_role && <div className="testimonial-role">{t.author_role}</div>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ textAlign: "center", padding: "3rem", background: "var(--surface-2)", borderRadius: "var(--radius)" }}>
            <p style={{ color: "var(--text-light)", fontFamily: "var(--font-heading)" }}>Témoignages à venir — vidéos, audio et copies d'écran</p>
          </div>
        )}

        <p className="landing-text" style={{ textAlign: "center", margin: "2.5rem auto 0", fontWeight: 500, color: "var(--primary)" }}>
          Si tu te reconnais dans ces parcours…
        </p>
        <div className="section-cta">
          <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className="btn-cta">
            Parlons-en
          </a>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════
// SECTION 9 — QUI SUIS-JE
// ═══════════════════════════════════════════════════════════════════════
function QuiSuisJeSection() {
  return (
    <section className="landing-section" style={{ background: "var(--surface-2)" }}>
      <div className="container">
        <div className="quisuisje-content">
          <p className="landing-subtitle" style={{ textAlign: "center" }}>Qui suis-je</p>
          <h2 className="landing-title" style={{ textAlign: "center" }}>Et pourquoi je te parle de ça</h2>

          {/* Photo + timeline */}
          <div className="quisuisje-top">
            <div className="quisuisje-photo">
              <PhotoSwitcher startIndex={10} />
              <div className="quisuisje-photo-accent" />
            </div>

            <div className="quisuisje-story">
              <div className="quisuisje-beat">
                <div className="quisuisje-beat-line">
                  <div className="quisuisje-beat-dot" />
                  <div className="quisuisje-beat-connector" />
                </div>
                <p className="quisuisje-beat-text">
                  Je connais très bien ce mode « bonne élève ».{" "}
                  <strong>Je l'ai vécu de l'intérieur.</strong> Pendant plus de 10 ans,
                  j'ai évolué dans le corporate, en sales et en management. J'aimais mon travail.
                  Je performais. J'étais celle sur qui on peut compter : organisée, fiable, toujours à 110%.
                </p>
              </div>
              <div className="quisuisje-beat">
                <div className="quisuisje-beat-line">
                  <div className="quisuisje-beat-dot" />
                  <div className="quisuisje-beat-connector" />
                </div>
                <p className="quisuisje-beat-text">
                  De l'extérieur… ça ressemblait exactement à ce qu'on appelle une « réussite ».{" "}
                  <strong>Mais à l'intérieur… c'était une autre histoire.</strong> Beaucoup de pression.
                  Une exigence constante. Cette voix qui dit « ce n'est jamais assez ».
                </p>
              </div>
              <div className="quisuisje-beat">
                <div className="quisuisje-beat-line">
                  <div className="quisuisje-beat-dot" />
                </div>
                <p className="quisuisje-beat-text">
                  Jusqu'au moment où j'ai décidé de me faire accompagner.<br />
                  Et là… <strong>tout a changé.</strong>
                </p>
              </div>
            </div>
          </div>

          {/* Phrase pivot */}
          <div className="quisuisje-pivot">
            Le problème n'était pas ma vie —<br />
            mais la manière dont je la vivais.
          </div>

          {/* Aujourd'hui + légitimité */}
          <div className="quisuisje-today">
            <div className="quisuisje-today-card">
              <p className="quisuisje-today-label">Aujourd'hui</p>
              <p className="quisuisje-today-text">
                Je suis toujours ambitieuse. Mais je ne vis plus mon ambition dans la pression.
                Je la vis avec plus de <strong>sérénité</strong>, plus d'<strong>intention</strong>,
                plus d'<strong>épanouissement</strong>.
              </p>
            </div>
            <div className="quisuisje-today-card">
              <p className="quisuisje-today-label">Ma légitimité</p>
              <p className="quisuisje-today-text">
                Au-delà des certifications — je connais ce terrain, je parle ton langage
                et je sais ce que ça demande, pour de vrai.
              </p>
              <div className="quisuisje-certifs">
                <span className="quisuisje-certif">ICF Certified</span>
                <span className="quisuisje-certif">+10 ans corporate</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════
// SECTION 10 — FAQ
// ═══════════════════════════════════════════════════════════════════════
const FAQ_DATA = [
  {
    q: "« Je peux faire ce travail seule. »",
    a: "Oui. Mais si tu pouvais vraiment le faire seule… tu ne serais probablement pas ici.\n\nLe sujet, ce n'est pas ta capacité. C'est que tu es déjà à l'intérieur de tes propres schémas : tu comprends beaucoup de choses, tu analyses, tu réfléchis. Mais tu restes au même endroit.\n\nLe coaching, ce n'est pas « t'apprendre des choses ». C'est voir ce que tu ne vois pas, mettre de la conscience là où tu es en automatique, et t'aider à agir autrement, concrètement.",
  },
  {
    q: "« Je n'ai pas le temps pour un coaching. »",
    a: "C'est souvent ce que disent les femmes… qui en ont le plus besoin.\n\nTon problème aujourd'hui, ce n'est pas le manque de temps. C'est la manière dont tu utilises ton énergie. Tu réfléchis beaucoup, tu rumines, tu suranalyses, tu te mets la pression. Et ça te prend déjà énormément de place.\n\nLe coaching ne vient pas rajouter une charge. Il vient t'aider à arrêter de t'éparpiller, retrouver de la clarté et fonctionner avec moins de pression.\n\nLa vraie question, ce n'est pas « est-ce que j'ai le temps ? » — c'est : « qu'est-ce qui se passe si je continue comme ça encore 1 an ? »",
  },
  {
    q: "« Est-ce que c'est le bon moment ? »",
    a: "Si tu te poses la question… c'est souvent que oui.\n\nTu sens qu'il y a un décalage. Tu sens que ton mode de fonctionnement actuel a ses limites. Mais tu continues… parce que « ça va sur le papier ».\n\nSauf que rester comme ça a un coût : en énergie, en clarté, en plaisir, dans tes relations, dans ton rapport au travail. Et surtout : ça t'éloigne petit à petit de toi-même.\n\nDécider de te faire accompagner, ce n'est pas « faire un grand changement ». C'est arrêter de subir, reprendre la main, et créer du mouvement.",
  },
  {
    q: "« C'est quoi concrètement le coaching ? »",
    a: "Le coaching, ce n'est pas te donner des conseils. C'est t'aider à comprendre comment tu fonctionnes, voir tes schémas, et créer tes propres réponses.\n\nJe ne suis pas là pour te dire quoi faire. Je suis là pour te poser les bonnes questions, t'aider à accéder à ce que tu sais déjà (mais que tu n'écoutes pas), et t'accompagner à passer à l'action.\n\nL'objectif : que tu développes ta clarté, ta confiance et ton autonomie.",
  },
  {
    q: "« Quelle différence avec une thérapie ? »",
    a: "Les deux sont complémentaires.\n\nLa thérapie va souvent explorer le passé, comprendre pourquoi. Le coaching est orienté vers le présent et le futur : comment tu fonctionnes aujourd'hui, ce que tu veux créer, et comment tu y vas concrètement.\n\nDans mon approche, on travaille aussi en profondeur (émotions, parts, saboteurs…). Mais toujours avec un objectif : que ça change dans ta vraie vie.",
  },
  {
    q: "« Et si j'ai encore des questions ? »",
    a: "Tu peux simplement m'écrire par email ou réserver une session découverte. C'est un espace pour poser tes questions, expérimenter l'espace que je crée, et sentir si c'est un bon match entre nous.",
  },
];

function FaqLandingSection() {
  const [openIdx, setOpenIdx] = useState(0);

  return (
    <section className="landing-section" style={{ background: "var(--bg)" }}>
      <div className="container">
        <div className="faq-content">
          <h2 className="landing-title" style={{ textAlign: "center" }}>Tu te demandes peut-être…</h2>

          <div className="faq-two-col">
            {/* Questions list */}
            <div className="faq-questions-list">
              {FAQ_DATA.map((item, i) => (
                <button
                  key={i}
                  className={`faq-q-btn ${openIdx === i ? "active" : ""}`}
                  onClick={() => setOpenIdx(i)}
                >
                  <span>{item.q}</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </button>
              ))}
            </div>

            {/* Answer panel */}
            <div className="faq-answer-panel">
              <p className="faq-answer-question">{FAQ_DATA[openIdx].q}</p>
              <div className="faq-answer-body">
                {FAQ_DATA[openIdx].a.split("\n\n").map((p, j) => (
                  <p key={j}>{p}</p>
                ))}
              </div>
            </div>
          </div>

          <div className="section-cta">
            <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className="btn-cta">
              Réserver ma session offerte
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════
// SECTION 11 — CTA FINAL
// ═══════════════════════════════════════════════════════════════════════
function CtaFinalSection() {
  return (
    <section className="landing-section" style={{ background: "var(--surface-3)" }}>
      <div className="container">
        <div className="cta-final-content">

          <h2 className="cta-final-title">Et si on en parlait ?</h2>

          <div className="cta-final-body">
            <div className="cta-final-text">
              <p>
                Une session découverte de <strong>30 minutes</strong>, offerte et sans engagement.
              </p>
              <p>
                Un espace pour poser tes questions, sentir si c'est le bon moment —
                et voir si on est faites pour travailler ensemble.
              </p>
              <p style={{ opacity: 0.6, fontSize: "0.88rem" }}>
                Pas de pitch. Pas de pression. Une vraie conversation.
              </p>
            </div>

            <div className="cta-final-action">
              <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className="btn-cta cta-final-btn">
                Réserver ma session offerte
              </a>
              <p className="cta-final-reassurance">Gratuit · 30 min · Sans engagement</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════
// PAGE
// ═══════════════════════════════════════════════════════════════════════
export default function Home() {
  return (
    <div className="page">
      <HeroSection />
      <MiroirSection />
      <EssayeSection />
      <ProgrammeSection />
      <TemoignagesSection />
      <QuiSuisJeSection />
      <FaqLandingSection />
      <CtaFinalSection />
    </div>
  );
}
