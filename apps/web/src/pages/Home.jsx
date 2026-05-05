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
            Compétente aux yeux de tous.<br />
            <span style={{ color: "var(--accent)" }}>Illégitime aux tiens.</span>
          </h1>
          <p className="landing-hero-body">
            Tu livres, tu performes, tu obtiens des résultats. Mais la promo va à quelqu'un d'autre.
            Tu te tais en réunion quand tu aurais dû parler. Tu attends d'être prête — depuis 3 ans.
            Ce n'est pas un manque de compétences. C'est un plafond de verre intérieur. Et ça se travaille.
          </p>
          <p className="landing-hero-mission">
            Je t'aide à casser ce plafond — pour que tu incarnes enfin la leader que tu es, avec sérénité et légèreté.
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
          <h2 className="landing-title" style={{ textAlign: "center" }}>Performante, mais bloquée ?</h2>

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
                <span>Tu as le diplôme, l'expérience, les résultats</span>
              </div>
              <div className="miroir-pourtant-item">
                <div className="miroir-pourtant-check">✓</div>
                <span>C'est toi qui maîtrises les dossiers : sans toi, l'équipe est perdue</span>
              </div>
              <div className="miroir-pourtant-item">
                <div className="miroir-pourtant-check">✓</div>
                <span>Tout le monde sait que si quelque chose doit être bien fait, c'est toi qu'on appelle</span>
              </div>
              <div className="miroir-pourtant-item">
                <div className="miroir-pourtant-check">✓</div>
                <span>Ton manager te fait confiance pour livrer, toujours</span>
              </div>
            </div>
            <div className="miroir-pourtant-right">
              <p className="miroir-pourtant-but">Mais…</p>
              <p className="miroir-punchline">
                La promo est allée à Thomas. Encore.<br />
                Le projet stratégique ? Quelqu'un d'autre aussi.<br />
                Le poste qui t'attirait ? "Pas encore prête".<br />
                Les années passent.<br /><br />
                <strong>Dans 5 ans, tu seras compétente, indispensable mais invisible.</strong>
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
            Tes réflexes face au doute<br />
            <span style={{ fontSize: "1.2rem", fontWeight: 400, color: "var(--text-muted)" }}>(et pourquoi ça ne marchera pas)</span>
          </h2>

          <div className="essaye-two-col">
            {/* Col 1 */}
            <div className="essaye-col">
              <h3 className="essaye-col-title">Tu en fais toujours « plus »</h3>
              <div className="essaye-thoughts">
                <div className="essaye-thought">« Manque de leadership » → tu t'inscris à une formation.</div>
                <div className="essaye-thought">Réunion ratée → tu prépares deux fois plus la prochaine.</div>
                <div className="essaye-thought">Promo manquée → tu te fixes de nouveaux objectifs de performance.</div>
              </div>
              <p className="essaye-col-body">
                Mais la confiance ne se construit pas en livrant plus, en étant plus disponible, en obtenant de meilleurs résultats.
                Tu peux performer au-delà de toutes les attentes — la voix qui doute, elle, ne s'arrête pas pour autant.
              </p>
              <p className="essaye-col-punchline">Parce que le problème n'est pas là.</p>
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
            <p>Pendant ce temps, les promos vont à d'autres. Une promo manquée à 35 ans, c'est 10 à 15K€/an de salaire en moins — sur 25 ans de carrière, ça fait facilement <strong>250K à 375K€</strong>. Et cette honte silencieuse de ne pas être là où tu t'imaginais être — qui s'installe doucement, année après année.</p>
            <p>Ce n'est pas une formation de plus qui va changer ça. <strong>C'est un travail de fond — sur tes croyances, tes mécanismes, la façon dont tu te vois.</strong></p>
          </div>

          <p className="essaye-closer">
            Tu dépenses ton énergie à prouver ta valeur. Il est temps de la mettre ailleurs — à incarner la leader que tu veux être.
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
                <span>Tu prends la parole en réunion — sans calculer si c'est le bon moment.</span>
              </div>
              <div className="programme-vision-item">
                <div className="programme-vision-dot" />
                <span>Tu postules au poste. Sans attendre d'être prête.</span>
              </div>
              <div className="programme-vision-item">
                <div className="programme-vision-dot" />
                <span>La promo, cette fois, c'est toi.</span>
              </div>
              <div className="programme-vision-item">
                <div className="programme-vision-dot" />
                <span>Tu négocies ton salaire sans t'excuser.</span>
              </div>
              <div className="programme-vision-item">
                <div className="programme-vision-dot" />
                <span>Tu avances avec <strong>ambition</strong> — sans te saboter en chemin.</span>
              </div>
              <div className="programme-vision-item">
                <div className="programme-vision-dot" />
                <span>Tu te projettes dans l'avenir avec <strong>confiance</strong> — et même avec excitation.</span>
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
                  On clarifie ce qui compte vraiment pour toi dans ce chapitre de ta vie — pas ce qu'on attend de toi, ce que toi tu choisis. Tes valeurs deviennent ta boussole. Tu sais depuis quel endroit tu veux décider : la confiance, pas la peur du regard des autres.
                </p>
                <p className="programme-mcard-result">
                  <strong>Tu sais ce que tu veux — et tu avances.</strong>
                </p>
              </div>
              <div className="programme-mcard">
                <span className="programme-mcard-num">03</span>
                <div className="programme-mcard-title">Réinvention</div>
                <div className="programme-mcard-sub">Agir autrement dans ta vraie vie</div>
                <p className="programme-mcard-body">
                  On ancre tout ça dans ta vraie vie pro. La réunion où tu prends la parole — sans calculer. Le poste pour lequel tu postules — sans attendre d'être prête. La négociation que tu mènes — sans t'excuser. Tu fonctionnes autrement. Pas dans les exercices — dans les vraies situations qui comptent.
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
                  <li>Un diagnostic précis de ce qui te retient — pas des généralités, des mécanismes concrets qui s'appliquent à ta situation</li>
                  <li>Des questions qui vont là où tu n'oses pas aller seule — et qui débloquent ce qui stagne depuis des mois</li>
                  <li>Un plan d'action ancré dans ta vraie vie — pas des exercices théoriques, des vrais changements à la prochaine réunion, la prochaine opportunité</li>
                </ul>
              </div>
              <div className="programme-scard">
                <p className="programme-scard-title">Entre les sessions :</p>
                <ul className="programme-scard-list">
                  <li>Support WhatsApp à la demande — pour ne pas rester bloquée entre deux sessions</li>
                  <li>Des ressources ciblées sur ce qu'on travaille ensemble</li>
                  <li>De l'« accountability » bienveillante — pour que les changements s'ancrent dans ta vraie vie, pas juste pendant les sessions</li>
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
                  <br /><br />
                  Je savais que c'était vrai. Et je ne savais pas comment changer ça.
                </p>
              </div>
              <div className="quisuisje-beat">
                <div className="quisuisje-beat-line">
                  <div className="quisuisje-beat-dot" />
                  <div className="quisuisje-beat-connector" />
                </div>
                <p className="quisuisje-beat-text">
                  Je me suis reconvertie en suivant mon appel du cœur. Un nouveau départ, une nouvelle vie.
                  <br /><br />
                  Sauf que j'avais emporté la même voix avec moi. Le même doute. La même difficulté à prendre ma place.
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
            <div className="quisuisje-today-card">
              <p className="quisuisje-today-label">Aujourd'hui</p>
              <p className="quisuisje-today-text">
                Aujourd'hui je prends ma place — au travail, sur les réseaux, dans mes projets. Et ma mission est d'accompagner des femmes à faire la même chose.
              </p>
            </div>
            <div className="quisuisje-today-card">
              <p className="quisuisje-today-label">Ma légitimité</p>
              <p className="quisuisje-today-text">
                Au-delà des certifications de coaching — je connais ce terrain, je parle ton langage et je sais ce que ça demande, pour de vrai.
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
    a: "Tu es capable — c'est pas la question. Le problème, c'est que tu essaies de changer ton regard sur toi-même… avec ce même regard. Tu te dis que si tu fais encore plus, si tu prouves encore plus — la confiance va finir par venir. Mais elle ne vient pas comme ça.\n\nCe n'est pas un manque de compétences. C'est un dialogue intérieur qu'on vient transformer ensemble.",
  },
  {
    q: "« Je n'ai vraiment pas le temps en ce moment. »",
    a: "C'est souvent ce que disent les femmes qui en ont le plus besoin. Et je le comprends — ton agenda est déjà plein.\n\nMais le coaching ne vient pas rajouter une charge. Il vient t'aider à récupérer de l'énergie, de la clarté, de l'espace mental.\n\nLa vraie question : qu'est-ce qui se passe si tu continues comme ça encore 2 ans ?",
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

          <h2 className="cta-final-title">Tu mérites de prendre ta place — enfin.</h2>

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
