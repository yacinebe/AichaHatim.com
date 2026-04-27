import { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { api } from "../api/client.js";

const CALENDLY_URL = import.meta.env.VITE_CALENDLY_URL ?? "https://calendly.com/aicha-hatim/let-s-chat";

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
            Tu performes.<br />
            Tu gères.<br />
            Tu tiens.<br />
            <span className="headline-warm">Mais est-ce que tu te souviens de la dernière fois où tu t'es sentie légère et sereine ?</span>
          </h1>
          <p className="landing-hero-body">
            En réunion tu performes. À la maison tu tiens. Mais à l'intérieur tu es à bout.
            Fatiguée de tout contrôler, irritable sans le vouloir, jamais vraiment fière.
            Et quelque part tu sais — si tu continues comme ça, quelque chose va lâcher.
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
            <p className="essaye-highlight-big">C'est ta façon de fonctionner <span className="gold-em">de l'intérieur.</span></p>
            <p>
              Et ça, tu ne peux pas le voir seule.<br />
              Pas parce que tu n'es pas capable —<br />
              mais parce que <strong>c'est avec ce même mode que tu essaies de t'en sortir.</strong>
            </p>
          </div>

          <p className="essaye-closer">
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
    <>
      {/* Bandeau header bordeaux */}
      <div className="programme-bandeau">
        <p className="programme-bandeau-eyebrow">Bienvenue dans ton programme</p>
        <h2 className="programme-bandeau-title">Réinvention Intérieure</h2>
      </div>

      {/* Contenu sur fond beige */}
      <section className="landing-section" style={{ background: "var(--bg)" }}>
      <div className="container">
        <div className="programme-content">

          {/* Définition */}
          <div className="programme-def">
            <p className="programme-def-intro">
              Tu n'as pas besoin de tout casser. Tu n'as pas besoin de faire plus.
            </p>
            <p className="programme-def-big">
              Ce qui doit changer, c'est ce qui se passe à l'intérieur — ces voix qui te disent
              que tu n'es pas assez, ces mécanismes qui te poussent à sur-contrôler, à t'oublier.
            </p>
            <div className="programme-def-tags">
              <div className="programme-def-tag"><div className="programme-def-dot" />Travail en profondeur</div>
              <div className="programme-def-tag"><div className="programme-def-dot" />Pas théorique</div>
              <div className="programme-def-tag"><div className="programme-def-dot" />Ancré dès la 1ère session</div>
            </div>
            <div className="programme-def-divider" />
            <p className="programme-def-quote">
              Pour que tu passes d'un mode « je serre les dents et je tiens »<br />
              à un mode « je me fais confiance et j'avance ».
            </p>
          </div>

          {/* Vision */}
          <div className="programme-vision">
            <h3 className="programme-section-title">Imagine une vie où…</h3>
            <div className="programme-vision-grid">
              <div className="programme-vision-item">
                <div className="programme-vision-dot" />
                <span>Tu avances dans tes journées avec <strong>légèreté</strong> — pas avec dureté et sur-contrôle.</span>
              </div>
              <div className="programme-vision-item">
                <div className="programme-vision-dot" />
                <span>Tu te sens <strong>légitime</strong> dans la salle. Tu prends la parole sans te justifier.</span>
              </div>
              <div className="programme-vision-item">
                <div className="programme-vision-dot" />
                <span>Tu rentres à la maison <strong>présente</strong> — pas épuisée et irritable.</span>
              </div>
              <div className="programme-vision-item">
                <div className="programme-vision-dot" />
                <span>Tu travailles avec <strong>ambition</strong> — sans te perdre et sans t'épuiser.</span>
              </div>
              <div className="programme-vision-item">
                <div className="programme-vision-dot" />
                <span>Tu es ta propre <strong>meilleure alliée</strong> — pas ta pire ennemie.</span>
              </div>
              <div className="programme-vision-item">
                <div className="programme-vision-dot" />
                <span>Tu te projettes dans l'avenir avec <strong>optimisme</strong> — et même avec excitation.</span>
              </div>
            </div>
          </div>

          {/* Méthode */}
          <div className="programme-methode-wrapper">
          <div className="programme-methode">
            <div className="programme-methode-header">
              <div className="programme-methode-sep" />
              <h3 className="landing-title" style={{ marginBottom: "0.5rem" }}>Ma méthode — 3 piliers</h3>
              <p className="programme-section-sub">
                On ne fait pas que comprendre.<br />
                On change ta manière de fonctionner — durablement.
              </p>
            </div>
            <div className="programme-methode-cards">
              <div className="programme-mcard">
                <span className="programme-mcard-num">01</span>
                <div className="programme-mcard-title">Clarté</div>
                <div className="programme-mcard-sub">Rencontrer tes voix intérieures</div>
                <p className="programme-mcard-body">
                  On identifie tes mécanismes automatiques : la voix qui dit "tu n'es pas assez",
                  les réflexes de sur-contrôle, la peur d'être démasquée. On comprend d'où ils viennent
                  — et pourquoi seule, tu tournes en rond.
                </p>
                <p className="programme-mcard-result">
                  Tu comprends enfin pourquoi tu fonctionnes comme ça. <strong>Et tu arrêtes de te battre contre toi-même.</strong>
                </p>
              </div>
              <div className="programme-mcard">
                <span className="programme-mcard-num">02</span>
                <div className="programme-mcard-title">Reconnexion</div>
                <div className="programme-mcard-sub">Revenir à toi</div>
                <p className="programme-mcard-body">
                  On reconnecte avec ce qui compte vraiment pour toi : tes valeurs, tes émotions, ton corps.
                  Tu apprends à écouter ta sagesse intérieure plutôt que de la noyer sous la pression.
                  On travaille aussi avec des pratiques somatiques pour relâcher les tensions que tu portes physiquement.
                </p>
                <p className="programme-mcard-result">
                  Tu passes de <strong>« je subis »</strong> à <strong>« je ressens et je choisis »</strong>.
                </p>
              </div>
              <div className="programme-mcard">
                <span className="programme-mcard-num">03</span>
                <div className="programme-mcard-title">Réinvention</div>
                <div className="programme-mcard-sub">Agir autrement dans ta vraie vie</div>
                <p className="programme-mcard-body">
                  On ancre tout ça dans ton quotidien réel : prendre la parole en réunion,
                  déléguer sans culpabiliser, poser des limites, gérer ton énergie,
                  être présente à la maison. Pas de la théorie — des vrais changements dans tes vraies situations.
                </p>
                <p className="programme-mcard-result">
                  <strong>Tu fonctionnes autrement. Dans ta vie, pas dans les exercices.</strong>
                </p>
              </div>
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
                  <li>Un espace où tu peux enfin poser l'armure — pas besoin de performer, d'avoir l'air d'aller bien, ou d'avoir les bonnes réponses</li>
                  <li>Des conversations qui vont au fond des choses</li>
                  <li>Des prises de conscience qui changent quelque chose dès la semaine d'après</li>
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
            <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className="btn-cta">
              Réserver ma session offerte
            </a>
          </div>

        </div>
      </div>
    </section>
    </>
  );
}
// ═══════════════════════════════════════════════════════════════════════
function TemoignagesSection() {
  const { data: testimonials } = useQuery({ queryKey: ["testimonials"], queryFn: api.getTestimonials });

  return (
    <section className="landing-section" style={{ background: "var(--bg)" }}>
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
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
          <h2 className="landing-title" style={{ textAlign: "center" }}>
            Qui suis-je<br />
            <span style={{ fontSize: "0.75em", fontWeight: 400, color: "var(--text-muted)" }}>
              Et pourquoi je te parle de ça
            </span>
          </h2>

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
                  Moi aussi, j'ai été la bonne élève. Pendant plus de 10 ans dans le corporate —
                  sales, management. J'aimais mon travail. Je performais.
                  J'étais celle sur qui on peut compter. <strong>Toujours à 110%.</strong>
                </p>
              </div>
              <div className="quisuisje-beat">
                <div className="quisuisje-beat-line">
                  <div className="quisuisje-beat-dot" />
                  <div className="quisuisje-beat-connector" />
                </div>
                <p className="quisuisje-beat-text">
                  De l'extérieur, c'était une réussite. À l'intérieur, j'étais épuisée,
                  sous pression constante, jamais vraiment fière. Cette voix qui dit
                  « ce n'est jamais assez ». Ma soupape de décompression ?
                  Je mangeais trop le weekend pour me noyer — et je repartais au régime le lundi.
                  <strong> Je recommençais la semaine comme si de rien n'était.</strong>
                </p>
              </div>
              <div className="quisuisje-beat">
                <div className="quisuisje-beat-line">
                  <div className="quisuisje-beat-dot" />
                </div>
                <p className="quisuisje-beat-text">
                  C'est la maternité qui a tout changé. Quand j'ai vu que je n'avais plus rien
                  à donner à mon enfant en rentrant le soir — que j'étais irritable, absente,
                  à bout — j'ai su que je ne pouvais plus continuer comme ça.
                  J'ai décidé de me faire accompagner. Pas parce que tout allait mal.
                  Mais parce que <strong>je méritais mieux que de juste tenir.</strong>
                </p>
              </div>
            </div>
          </div>

          {/* Phrase pivot */}
          <div className="quisuisje-pivot">
            Le problème n'était pas ma vie.<br />
            C'était la façon dont je la vivais — et la façon dont je me parlais.
          </div>

          {/* Aujourd'hui + légitimité */}
          <div className="quisuisje-today">
            <div className="quisuisje-today-card">
              <p className="quisuisje-today-label">Aujourd'hui</p>
              <p className="quisuisje-today-text">
                Je suis toujours ambitieuse. Mais je vis mon ambition avec légèreté.
                Je prends ma place sans m'excuser. Je rentre à la maison présente.
                Et je suis enfin fière de qui je suis — <strong>pas juste de ce que je produis.</strong>
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
    q: "« Je devrais pouvoir m'en sortir seule. »",
    a: "Tu es capable — c'est pas la question. Le problème, c'est que tu essaies de te sortir de tes schémas… avec ces mêmes schémas. C'est comme essayer de voir ta propre nuque sans miroir.\n\nCe n'est pas un manque de capacité. C'est juste que certaines choses ne se voient pas de l'intérieur.",
  },
  {
    q: "« Je n'ai vraiment pas le temps en ce moment. »",
    a: "C'est souvent ce que disent les femmes qui en ont le plus besoin. Et je le comprends — ton agenda est déjà plein.\n\nMais le coaching ne vient pas rajouter une charge. Il vient t'aider à récupérer de l'énergie, de la clarté, de l'espace mental.\n\nLa vraie question : qu'est-ce qui se passe si tu continues comme ça encore 6 mois ?",
  },
  {
    q: "« J'ai peur que ça ne marche pas pour moi. »",
    a: "Cette peur, je la comprends. Tu as déjà essayé des choses — des livres, des podcasts, peut-être une thérapie — et tu as l'impression de tourner en rond.\n\nCe qui est différent ici, c'est qu'on travaille directement sur tes mécanismes, dans tes vraies situations. Pas de la théorie générale. Un travail fait pour toi, avec toi.",
  },
  {
    q: "« C'est quoi la différence avec une thérapie ? »",
    a: "Les deux sont complémentaires. La thérapie explore souvent le passé — pourquoi tu es comme ça. Le coaching est orienté présent et futur — comment tu fonctionnes aujourd'hui, et comment tu veux fonctionner demain.\n\nDans mon approche, on va aussi en profondeur. Mais l'objectif est toujours concret : que quelque chose change dans ta vraie vie.",
  },
  {
    q: "« Est-ce que c'est le bon moment ? »",
    a: "Si tu te poses la question, c'est souvent que oui. Tu sens qu'il y a un décalage. Tu sens que tu ne peux pas continuer comme ça indéfiniment.\n\nAttendre « le bon moment » c'est souvent attendre que ça aille encore plus mal.\n\nLe bon moment, c'est quand tu décides que tu mérites mieux que de juste tenir.",
  },
  {
    q: "« Comment ça se passe concrètement ? »",
    a: "On commence par une session découverte gratuite de 30 minutes — pour qu'on se rencontre, que tu poses tes questions, et qu'on voie ensemble si c'est le bon fit.\n\nSi on décide d'avancer : 8 sessions en visio sur 4 mois, à un rythme qui s'adapte à toi, avec un support WhatsApp entre les sessions.",
  },
];

function FaqLandingSection() {
  const [openIdx, setOpenIdx] = useState(0);

  return (
    <section className="landing-section" style={{ background: "var(--bg)" }}>
      <div className="container">
        <div className="faq-content">
          <h2 className="landing-title" style={{ textAlign: "center" }}>
            Tu te demandes peut-être…
          </h2>

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

          <h2 className="cta-final-title">Tu mérites mieux que de juste tenir.</h2>

          <div className="cta-final-body">
            <div className="cta-final-text">
              <p>
                Si tu te reconnais dans ce que tu viens de lire — si tu sens que quelque chose doit changer — cette session est pour toi.
              </p>
              <p>
                <strong>30 minutes</strong>, offertes, sans engagement. On se rencontre,
                tu poses tes questions, on voit ensemble si c'est le bon fit.
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
      <WaveDivider from="#edd5c8" to="var(--bg)" />
      <MiroirSection />
      <WaveDivider from="var(--bg)" to="var(--surface-2)" />
      <EssayeSection />
      <WaveDivider from="var(--surface-2)" to="var(--accent)" />
      <ProgrammeSection />
      <WaveDivider from="var(--bg)" to="var(--bg)" />
      <TemoignagesSection />
      <WaveDivider from="var(--bg)" to="var(--surface-2)" />
      <QuiSuisJeSection />
      <WaveDivider from="var(--surface-2)" to="var(--bg)" />
      <FaqLandingSection />
      <WaveDivider from="var(--bg)" to="var(--surface-3)" />
      <CtaFinalSection />
    </div>
  );
}
