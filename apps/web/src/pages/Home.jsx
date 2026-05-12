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
            Compétente. Ambitieuse.<br />
            <span style={{ color: "var(--accent)" }}>Mais pas encore confiante.</span>
          </h1>
          <p className="landing-hero-body">
            Tu livres, tu performes, tu obtiens des résultats. Mais la promotion va à quelqu'un d'autre.
            Tu te tais en réunion quand tu aurais dû parler. Tu attends d'être prête — depuis 3 ans.
            Ce n'est pas un manque de compétences. C'est un plafond de verre intérieur. Et ça se travaille.
          </p>
          <p className="landing-hero-mission">
            Je t'aide à casser ce plafond — pour que tu incarnes enfin la leader que tu es, avec sérénité et légèreté.
          </p>
          <div className="hero-actions">
            <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className="btn-cta hero-btn">
              Réserver mon diagnostic offert →
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
          <img src="/hero-photo.jpg" alt="Aicha Hatim" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", borderRadius: "var(--radius)" }} />
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
          <h2 className="landing-title" style={{ textAlign: "center" }}>Tu te reconnais ?</h2>

          {/* 3 cards */}
          <div className="miroir-cards">
            {/* Au travail */}
            <div className="miroir-card">
              <div className="miroir-card-icon">💼</div>
              <h3 className="miroir-card-title">La promo qui aurait dû être à toi</h3>
              <p className="miroir-card-neg">
                Tu as postulé. Tu avais le profil, l'expérience, les résultats. Et le feedback est tombé : <em>« Tu manques de visibilité. Tu dois travailler ta présence. Ton leadership n'est pas encore là. »</em>
                <br /><br />
                Ce soir-là, tu as hoché la tête et remercié pour le feedback. Et dans la voiture en rentrant, tu as pleuré.
                <br /><br />
                Parce que tu sais que c'est vrai. Et tu ne sais pas comment changer ça.
              </p>
            </div>

            <div className="miroir-card">
              <div className="miroir-card-icon">🧠</div>
              <h3 className="miroir-card-title">LinkedIn vs la réalité</h3>
              <p className="miroir-card-neg">
                Ton profil est impeccable. Mais à l'intérieur de ta tête ?
                <br /><br />
                <strong>Avant</strong> : la panique. Tu prépares trois fois plus que les autres pour ne pas être prise en défaut.
                <br />
                <strong>Pendant</strong> : tu calcules. Est-ce le bon moment ? Mon idée est-elle assez bonne ? Tu finis par te taire.
                <br />
                <strong>Après</strong> : le replay. Tu rejoues chaque mot, chaque silence, chaque regard. <em>« J'aurais dû dire ça différemment. J'aurais dû prendre la parole. »</em>
              </p>
            </div>

            {/* Dans sa vie */}
            <div className="miroir-card">
              <div className="miroir-card-icon">🪞</div>
              <h3 className="miroir-card-title">Et dans 5 ans ?</h3>
              <p className="miroir-card-neg">
                Sans doute à la même place. Rien de dramatique pour les autres dans ton niveau de poste.
                <br /><br />
                Mais toi, tu sauras : ce n'est pas là où tu t'imaginais être quand tu es sortie d'école.
                Ce poste que tu n'as pas osé. Ce projet que tu n'as pas lancé. Cette version de toi que tu n'as jamais vraiment laissé émerger.
                <br /><br />
                Et chaque année qui passe sans changer ça, c'est un peu plus de confiance qui s'érode.
              </p>
            </div>
          </div>

          {/* Et pourtant */}
          <div className="miroir-pourtant-grid">
            <div className="miroir-pourtant-left">
              <p className="miroir-pourtant-label">Et pourtant…</p>
              <div className="miroir-pourtant-item">
                <div className="miroir-pourtant-check">✓</div>
                <span>Tu as les compétences, l'expérience, les résultats</span>
              </div>
              <div className="miroir-pourtant-item">
                <div className="miroir-pourtant-check">✓</div>
                <span>C'est toi qui maîtrises les dossiers : sans toi, l'équipe est perdue</span>
              </div>
              <div className="miroir-pourtant-item">
                <div className="miroir-pourtant-check">✓</div>
                <span>Tu as la meilleure éthique de travail du bureau</span>
              </div>
              <div className="miroir-pourtant-item">
                <div className="miroir-pourtant-check">✓</div>
                <span>Formations, podcasts, livres : tu travailles ta croissance</span>
              </div>
            </div>
            <div className="miroir-pourtant-right">
              <p className="miroir-pourtant-but">Mais…</p>
              <p className="miroir-punchline">
                Ce n'est pas plus de performance qui va résoudre ça. Ni des tips sur le leadership ou la visibilité.
                <br /><br />
                <strong>C'est un travail de fond sur tes croyances et tes mécanismes — ET une mise en action concrète dès la première session.</strong>
              </p>
            </div>
          </div>

          <p className="miroir-conclusion">
            Ce n'est pas un manque de talent ni de compétences.<br />
            C'est un plafond de verre intérieur.<br />
            <strong>Et personne ne va venir le casser à ta place.</strong>
          </p>

          <div className="section-cta">
            <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className="btn-cta">
              Réserver mon diagnostic offert
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
              que tu n'es pas assez, ton estime de toi-même et ton dialogue intérieur.
            </p>
            <div className="programme-def-tags">
              <div className="programme-def-tag"><div className="programme-def-dot" />Travail en profondeur</div>
              <div className="programme-def-tag"><div className="programme-def-dot" />Pas théorique</div>
              <div className="programme-def-tag"><div className="programme-def-dot" />Ancré dès la 1ère session</div>
            </div>
          </div>

          {/* Vision */}
          <div className="programme-vision">
            <h3 className="programme-section-title">Imagine une vie où…</h3>
            <div className="programme-vision-grid">
              <div className="programme-vision-item">
                <div className="programme-vision-dot" />
                <span>Tu prends la parole en réunion, sans calculer si c'est le bon moment.</span>
              </div>
              <div className="programme-vision-item">
                <div className="programme-vision-dot" />
                <span>Tu postules au poste. Sans attendre d'être prête.</span>
              </div>
              <div className="programme-vision-item">
                <div className="programme-vision-dot" />
                <span>La promotion, cette fois, c'est toi.</span>
              </div>
              <div className="programme-vision-item">
                <div className="programme-vision-dot" />
                <span>Tu négocies ton salaire sans t'excuser.</span>
              </div>
              <div className="programme-vision-item">
                <div className="programme-vision-dot" />
                <span>Tu avances avec <strong>ambition</strong>, sans te saboter en chemin.</span>
              </div>
              <div className="programme-vision-item">
                <div className="programme-vision-dot" />
                <span>Tu te projettes dans l'avenir avec <strong>confiance</strong>, et même avec excitation.</span>
              </div>
            </div>
          </div>

          {/* Méthode */}
          <div className="programme-methode-wrapper">
          <div className="programme-methode">
            <div className="programme-methode-header">
              <div className="programme-methode-sep" />
              <h3 className="landing-title" style={{ marginBottom: "0.5rem" }}>Ma méthode — 3 piliers</h3>
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
                  On explore qui tu es vraiment dans ce chapitre de ta vie : tes valeurs, ta vision, tes forces, tes talents. Ce que tu veux construire, pas ce qu'on attend de toi.
                  <br /><br />
                  Parce qu'on n'incarne pas un leadership authentique sans savoir qui on est. Et quand c'est clair, tu ne décides plus depuis la peur, tu décides depuis toi.
                </p>
                <p className="programme-mcard-result">
                  <strong>Tu sais qui tu es, où tu vas — et pourquoi.</strong>
                </p>
              </div>
              <div className="programme-mcard">
                <span className="programme-mcard-num">03</span>
                <div className="programme-mcard-title">Réinvention</div>
                <div className="programme-mcard-sub">Agir autrement dans ta vraie vie</div>
                <p className="programme-mcard-body">
                  On ancre tout ça dans ta vraie vie pro. La réunion où tu prends la parole, sans calculer. Le poste pour lequel tu postules, sans attendre d'être prête. La négociation que tu mènes, sans t'excuser. Tu fonctionnes autrement. Pas dans les exercices — dans les vraies situations qui comptent.
                </p>
                <p className="programme-mcard-result">
                  <strong>Tu incarnes la leader que tu es déjà. Et tu commences à vivre ton ambition avec légèreté.</strong>
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
                <span className="programme-stat-label">sessions individuelles en visio</span>
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
                  <li>Un diagnostic précis de ce qui te retient, pas des généralités, des mécanismes concrets qui s'appliquent à ta situation</li>
                  <li>Des questions qui vont là où tu n'oses pas aller seule, et qui débloquent ce qui stagne depuis des mois</li>
                  <li>Un plan d'action ancré dans ta vraie vie — pas des exercices théoriques, des vrais changements à la prochaine réunion, la prochaine opportunité</li>
                </ul>
              </div>
              <div className="programme-scard">
                <p className="programme-scard-title">Entre les sessions :</p>
                <ul className="programme-scard-list">
                  <li>Support WhatsApp à la demande, pour ne pas rester bloquée entre deux sessions</li>
                  <li>Des ressources ciblées sur ce qu'on travaille ensemble</li>
                  <li>De l'« accountability » bienveillante, pour que les changements s'ancrent dans ta vraie vie, pas juste pendant les sessions</li>
                </ul>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="section-cta">
            <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className="btn-cta">
              Réserver mon diagnostic offert
            </a>
          </div>

        </div>
      </div>
    </section>
    </>
  );
}
// ═══════════════════════════════════════════════════════════════════════
const TEMOIGNAGES = [
  {
    name: "Laurie — Sales Team Lead, Food Tech",
    text: "Là où avant je doutais systématiquement de ma légitimité, je commence à reconnaître ma valeur. Je suis moins dure avec moi-même — j'essaie de me parler comme je parlerais à quelqu'un d'autre, avec plus de bienveillance.\n\nConcrètement, je m'exprime plus en réunion, je pose des limites, j'accepte de dire non. Et ma direction apprécie — c'est ce qu'ils attendaient de moi finalement !\n\nJ'ai aussi plusieurs outils désormais à ma disposition, auxquels je peux revenir quand je sens le doute revenir.",
  },
  {
    name: "Kim — Project Director, Tech",
    text: "Dès le début, Aicha a créé un espace sûr et sans jugement où je me suis sentie pleinement écoutée. Sa capacité à percevoir ce qui se passe dans mes mots comme dans mon langage corporel a permis des prises de conscience profondes.\n\nJe repars avec des schémas qui ont changé, de nouvelles ressources intérieures, et une confiance qui vient d'une vraie liberté émotionnelle. Je la recommande chaleureusement.",
  },
  {
    name: "Meryem — Senior Manager, Deloitte",
    text: "Ce qui m'a le plus marquée, c'est le concept de saboteur. J'ai appris à voir cette voix intérieure qui me freinait non pas comme une ennemie, mais comme une partie de moi qui cherche à me protéger. Et à lui parler, plutôt que de la subir.\n\nAujourd'hui je suis plus ancrée dans qui je suis. Je dis ce que je pense, je pose mes limites, je ne prends plus sur moi des choses qui ne m'appartiennent pas.\n\nLes outils sont simples. En tant que femme hyper occupée, j'avais peur que ça soit une charge de plus. Mais c'est subtil, et l'impact est puissant.",
  },
];

function TemoignagesSection() {
  return (
    <section className="landing-section" style={{ background: "var(--bg)", paddingTop: "1.5rem" }}>
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <h2 className="landing-title">Témoignages</h2>
        </div>
        <div className="temoignages-grid">
          {TEMOIGNAGES.map((t) => (
            <div key={t.name} className="temoignage-card">
              <div className="temoignage-quote-mark">"</div>
              <p className="temoignage-text">{t.text}</p>
              <div className="temoignage-divider" />
              <p className="temoignage-name">{t.name}</p>
            </div>
          ))}
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
          <h2 className="landing-title" style={{ textAlign: "center" }}>
            Qui suis-je<br />
            <span style={{ fontSize: "0.75em", fontWeight: 400, color: "var(--text-muted)" }}>
              Et pourquoi je te parle de ça
            </span>
          </h2>

          {/* Photo + timeline */}
          <div className="quisuisje-top">
            <div className="quisuisje-photo">
              <img src="/about-photo.jpg" alt="Aicha Hatim" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", display: "block" }} />
              <div className="quisuisje-photo-accent" />
            </div>

            <div className="quisuisje-story">
              <div className="quisuisje-beat">
                <div className="quisuisje-beat-line">
                  <div className="quisuisje-beat-dot" />
                  <div className="quisuisje-beat-connector" />
                </div>
                <p className="quisuisje-beat-text">
                  Moi aussi, j'ai été la super exécutante. Accountable à 1000%, toujours à 120%, celle sur qui on peut compter.
                  Mais jamais celle qui initie un projet ou qui interagit avec le leadership.
                  Et on a fini par me reprocher mon manque de <strong>« visibilité ».</strong>
                  <br />
                  Je savais que c'était vrai. Et je ne savais pas comment changer ça.
                </p>
              </div>
              <div className="quisuisje-beat">
                <div className="quisuisje-beat-line">
                  <div className="quisuisje-beat-dot" />
                  <div className="quisuisje-beat-connector" />
                </div>
                <p className="quisuisje-beat-text">
                  Je me suis reconvertie en suivant mon appel du cœur — ma mission de vie, pas une fuite.
                  Mais j'avais emporté la même voix avec moi. Le même doute. La même difficulté à prendre ma place.
                </p>
              </div>
              <div className="quisuisje-beat">
                <div className="quisuisje-beat-line">
                  <div className="quisuisje-beat-dot" />
                </div>
                <p className="quisuisje-beat-text">
                  C'est quand j'ai commencé à travailler profondément sur moi — mes croyances, mon estime, ma façon de me voir — que tout a changé.
                </p>
              </div>
            </div>
          </div>

          {/* Aujourd'hui + légitimité */}
          <div className="quisuisje-today">
            <div style={{ gridColumn: "1 / -1", display: "flex", justifyContent: "center" }}>
              <div style={{ background: "var(--surface)", border: "0.5px solid var(--border)", borderRadius: "var(--radius)", padding: "1.5rem 1.75rem", display: "flex", flexDirection: "column", gap: "1.25rem", maxWidth: "600px", width: "100%", textAlign: "center" }}>
                <p style={{ fontSize: "0.9rem", lineHeight: 1.8, color: "var(--text-muted)", margin: 0 }}>
                  Aujourd'hui je prends ma place — au travail, sur les réseaux, dans mes projets. Le doute revient parfois. Le syndrome de l'imposteur ne disparaît pas complètement, mais j'ai les outils pour le reconnaître, calmer cette voix, et me reconnecter à ma vision.
                  <br /><br />
                  Et c'est ça qui fait la différence : pas l'absence de doute, mais savoir quoi faire face à lui.
                  <br /><br />
                  <span style={{ color: "var(--text)", fontWeight: 500 }}>Ma mission : accompagner des femmes à faire la même chose.</span>
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", justifyContent: "center" }}>
                  <div style={{ padding: "10px 16px", background: "var(--surface-2)", borderRadius: "var(--radius-sm)", border: "0.5px solid var(--border)", textAlign: "center" }}>
                    <div style={{ fontSize: "13px", fontWeight: 500, color: "var(--text)" }}>✓ Coach accréditée ICF</div>
                    <div style={{ fontSize: "11px", color: "var(--text-muted)", marginTop: "3px" }}>Certification internationale</div>
                  </div>
                  <div style={{ padding: "10px 16px", background: "var(--surface-2)", borderRadius: "var(--radius-sm)", border: "0.5px solid var(--border)", textAlign: "center" }}>
                    <div style={{ fontSize: "13px", fontWeight: 500, color: "var(--text)" }}>✓ Co-Active Training Institute</div>
                    <div style={{ fontSize: "11px", color: "var(--text-muted)", marginTop: "3px" }}>Formation certifiante</div>
                  </div>
                  <div style={{ padding: "10px 16px", background: "var(--surface-2)", borderRadius: "var(--radius-sm)", border: "0.5px solid var(--border)", textAlign: "center" }}>
                    <div style={{ fontSize: "13px", fontWeight: 500, color: "var(--text)" }}>✓ 10 ans+ corporate</div>
                    <div style={{ fontSize: "11px", color: "var(--text-muted)", marginTop: "3px" }}>Big companies & startups</div>
                  </div>
                </div>
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
    a: "Tu es capable — c'est pas la question. Le problème, c'est que tu essaies de changer ton regard sur toi-même… avec ce même regard. Tu te dis que si tu fais encore plus, si tu prouves encore plus — la confiance va finir par venir. Mais la confiance ne se construit pas en faisant plus.\n\nCe n'est pas un manque de compétences. C'est un travail de fond sur tes mécanismes — et une mise en action concrète dès la première session.",
  },
  {
    q: "« Je n'ai vraiment pas le temps en ce moment. »",
    a: "C'est souvent ce que disent les femmes qui en ont le plus besoin. Et je le comprends — ton agenda est déjà plein.\n\nMais le coaching ne vient pas rajouter une charge. Il vient t'aider à récupérer de l'énergie, de la clarté, de l'espace mental.\n\nLa vraie question : qu'est-ce qui se passe si tu continues comme ça encore 2 ans ?",
  },
  {
    q: "« J'ai peur que ça ne marche pas pour moi. »",
    a: "Cette peur, je la comprends. Tu as déjà essayé des choses et tu as l'impression de tourner en rond.\n\nCe qui est différent ici : on travaille directement sur tes mécanismes, dans tes vraies situations. Pas de la théorie générale, un travail concret, fait pour toi.\n\nEt pour que tu puisses te lancer sans risque : si après 2 sessions tu sens que ce n'est pas le bon fit, je te rembourse le reste des sessions. Sans discussion.",
  },
  {
    q: "« Est-ce que c'est le bon moment ? »",
    a: "Si tu te poses la question, c'est souvent que oui. Tu sens qu'il y a un décalage. Tu sais que tu pourrais aller plus loin.\n\nAttendre « le bon moment », c'est souvent laisser passer une promotion de plus, une opportunité de plus.\n\nLe bon moment, c'est quand tu décides que tu ne veux plus jouer en dessous de ce que tu es capable.",
  },
  {
    q: "« Comment ça se passe concrètement ? »",
    a: "On commence par 30 minutes offertes pour une vraie conversation, pas un pitch.\n\nSi ça te donne envie d'aller plus loin : 8 sessions en visio sur 4 mois, des actions dès la première session et avec un support WhatsApp à la demande.",
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
              Réserver mon diagnostic offert
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

          <h2 className="cta-final-title">Tu mérites de prendre ta place — enfin.</h2>

          <div className="cta-final-body">
            <div className="cta-final-text">
              <p>
                Si tu lis ça et que quelque chose résonne, c'est le moment.
                30 minutes offertes pour diagnostiquer ce qui te retient.
              </p>
              <p style={{ opacity: 0.6, fontSize: "0.88rem" }}>
                Pas de pitch. Pas de pression. Une vraie conversation.
              </p>
            </div>

            <div className="cta-final-action">
              <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className="btn-cta cta-final-btn">
                Réserver mon diagnostic offert
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
