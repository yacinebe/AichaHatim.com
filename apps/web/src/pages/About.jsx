import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

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

// ── Story block : photo + text (alterne gauche/droite) ─────────────────
function StoryBlock({ photoIndex, reversed = false, children }) {
  return (
    <div className={`story-block ${reversed ? "reversed" : ""}`}>
      <div className="landing-photo story-photo">
        <PhotoSwitcher startIndex={photoIndex} />
      </div>
      <div className="story-text">
        {children}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════
// PAGE À PROPOS
// ═══════════════════════════════════════════════════════════════════════
export default function About() {
  const { hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  }, [hash]);

  return (
    <div className="page">
      {/* ═══════════════════════════════════════════════════════════════ */}
      {/* HEADER */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      <section className="landing-section" style={{ background: "linear-gradient(160deg, #faf8f5 0%, #f0e8d8 100%)", paddingTop: "5rem", paddingBottom: "4rem" }}>
        <div className="container">
          <div className="about-header">
            <p className="landing-subtitle">À propos</p>
            <h1 className="about-main-headline">
              Je t'aide à sortir du rôle de la bonne élève<br />
              <span className="headline-warm">pour devenir une leader épanouie</span><br />
              — au travail et dans ta vie.
            </h1>
            <div className="about-intro">
              <p>
                Je m'appelle <strong>Aïcha Hatim</strong>. Je suis coach professionnelle certifiée (ICF).
              </p>
              <p className="about-intro-punchline">
                Mais avant ça… <strong>j'ai été exactement cette femme.</strong>
              </p>
            </div>
          </div>
        </div>
      </section>

      <WaveDivider to="var(--bg)" />

      {/* ═══════════════════════════════════════════════════════════════ */}
      {/* MON HISTOIRE */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      <section id="histoire" className="landing-section" style={{ background: "var(--bg)" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <p className="landing-subtitle">Chapitre 1</p>
            <h2 className="landing-title">Mon histoire</h2>
          </div>

          <div className="story-blocks">

            {/* Photo enfant */}
            <StoryBlock photoIndex={0}>
              <p className="story-eyebrow">L'enfance</p>
              <p className="landing-text">
                Je suis née au Maroc, j'ai grandi à Casablanca.<br />
                Avec des croyances très claires :
              </p>
              <ul className="arrow-list">
                <li>Il faut travailler dur pour y arriver</li>
                <li>Quand on veut, on peut</li>
                <li>Être émotive, c'est une faiblesse</li>
              </ul>
            </StoryBlock>

            {/* Photo corporate */}
            <StoryBlock photoIndex={4} reversed>
              <p className="story-eyebrow">Le corporate</p>
              <p className="landing-text">
                J'ai fait prépa, école de commerce.<br />
                Puis j'ai construit une carrière dans le corporate. Sales. Management. Responsabilités.
                Des grandes boîtes, des startups.
              </p>
              <p className="landing-text">
                <strong>J'étais performante. Très performante.</strong>
              </p>
              <ul className="arrow-list">
                <li>Toujours préparée</li>
                <li>Toujours fiable</li>
                <li>Toujours à 110%</li>
              </ul>
              <p className="landing-text">
                J'ai été promue. Reconnue. Récompensée.<br />
                De l'extérieur… <em>tout était « réussi ».</em>
              </p>
            </StoryBlock>

            {/* Photo vie perso */}
            <StoryBlock photoIndex={8}>
              <p className="story-eyebrow">Mais à l'intérieur…</p>
              <p className="landing-text">
                C'était autre chose.
              </p>
              <ul className="arrow-list">
                <li>Beaucoup de pression</li>
                <li>Une exigence constante</li>
                <li>Une voix qui disait « c'est jamais assez »</li>
              </ul>
              <p className="landing-text">
                Je vivais dans le contrôle. Toujours en train d'anticiper. De gérer. De tenir.<br />
                Et dès que je relâchais…
              </p>
              <ul className="arrow-list">
                <li>Je mangeais sans faim</li>
                <li>Je scrollais</li>
                <li>Je me sentais vide</li>
              </ul>
              <p className="landing-text">
                <em>Mais je pensais que c'était normal.</em>
              </p>
            </StoryBlock>

            {/* Photo bébé */}
            <StoryBlock photoIndex={12} reversed>
              <p className="story-eyebrow">La maternité — Le tournant</p>
              <p className="landing-text">
                Et puis il y a eu la maternité.<br />
                Et là…
              </p>
              <ul className="arrow-list">
                <li>Plus de contrôle possible</li>
                <li>Plus de mode d'emploi</li>
                <li>Plus de perfection possible</li>
              </ul>
              <p className="landing-text">
                <strong>Tout ce qui « marchait » avant… ne marchait plus.</strong>
              </p>
              <p className="landing-text">
                J'ai essayé de faire comme avant : plus de discipline et plus de contrôle. Mais ça ne fonctionnait pas.
              </p>
              <p className="landing-text">
                Et malgré une vie que j'avais « réussie » sur le papier…
                <em> je ne me sentais pas bien dans ma vie.</em>
              </p>
            </StoryBlock>

            {/* Photo 2023 */}
            <StoryBlock photoIndex={16}>
              <p className="story-eyebrow">Le déclic</p>
              <p className="landing-text">
                J'ai mis du temps à comprendre que je ne pouvais pas régler ça seule.
                Les livres, les podcasts, la discipline… ne suffisaient pas.
              </p>
              <p className="landing-text">
                Alors j'ai investi en moi. J'ai fait une thérapie et des coachings.
                J'ai commencé un vrai travail intérieur.
              </p>
              <p className="landing-text" style={{ fontWeight: 500, color: "var(--primary)" }}>
                Et là… quelque chose a changé.
              </p>
              <p className="landing-text">J'ai appris à :</p>
              <ul className="arrow-list">
                <li>Écouter mes émotions</li>
                <li>Comprendre mes mécanismes</li>
                <li>Apaiser mon système nerveux</li>
                <li>Changer mon dialogue intérieur</li>
              </ul>
              <p className="landing-text">
                J'ai redéfini ce qui comptait vraiment pour moi.<br />
                Et surtout : <strong>j'ai arrêté de fonctionner contre moi.</strong>
              </p>
            </StoryBlock>

            {/* Photo qui coach */}
            <StoryBlock photoIndex={20} reversed>
              <p className="story-eyebrow">L'ouverture</p>
              <p className="landing-text">
                En enlevant cette pression… <strong>tout s'est ouvert.</strong>
              </p>
              <ul className="arrow-list">
                <li>J'ai changé de pays</li>
                <li>J'ai quitté le corporate</li>
                <li>Je me suis reconvertie dans le coaching</li>
                <li>J'ai vécu ma deuxième maternité autrement</li>
              </ul>
              <p className="landing-text">Et aujourd'hui :</p>
              <ul className="arrow-list">
                <li>Mon authenticité est ma boussole</li>
                <li>Mon dialogue intérieur est un KPI</li>
              </ul>
              <p className="landing-text">
                Je suis toujours ambitieuse. Mais je ne vis plus mon ambition dans la pression.
              </p>
              <p className="landing-text">Je la vis avec :</p>
              <ul className="arrow-list">
                <li>Plus de sérénité</li>
                <li>Plus d'intention</li>
                <li>Plus d'épanouissement</li>
              </ul>
            </StoryBlock>

          </div>
        </div>
      </section>

      <WaveDivider to="var(--surface-2)" />

      {/* ═══════════════════════════════════════════════════════════════ */}
      {/* MON COACHING */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      <section id="coaching" className="landing-section" style={{ background: "var(--surface-2)" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <p className="landing-subtitle">Chapitre 2</p>
            <h2 className="landing-title">Mon coaching</h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "0.9fr 1.1fr", gap: "4rem", alignItems: "center" }}>
            <div className="landing-photo">
              <PhotoSwitcher startIndex={24} />
            </div>

            <div>
              <div className="badges" style={{ marginBottom: "1.5rem" }}>
                <span className="badge">🏅 ICF Certified</span>
                <span className="badge">🎓 Co-Active Training Institute</span>
              </div>

              <p className="landing-text">
                Je suis coach certifiée <strong>Co-Active</strong> et accréditée <strong>ICF</strong>
                (International Coaching Federation, la référence mondiale du coaching).
              </p>

              <p className="landing-text">
                Mon approche repose sur une conviction forte :
              </p>

              <p className="coaching-belief">
                Tu n'as rien à « corriger ».<br />
                <strong>Tu es déjà complète.</strong>
              </p>

              <p className="landing-text">
                Mon rôle, ce n'est pas de te dire quoi faire. C'est de t'aider à :
              </p>
              <ul className="arrow-list">
                <li>Voir ce que tu ne vois pas</li>
                <li>Comprendre comment tu fonctionnes</li>
                <li>Et changer en profondeur</li>
              </ul>
            </div>
          </div>

          <div className="coaching-approach">
            <h3 style={{ textAlign: "center", fontSize: "1.4rem", color: "var(--primary)", marginBottom: "2rem" }}>
              Mon coaching est à la croisée de deux mondes
            </h3>
            <div className="coaching-worlds">
              <div className="coaching-world">
                <span className="coaching-world-icon">🌿</span>
                <h4>Travail intérieur profond</h4>
                <p>Émotions, saboteurs, parts, croyances</p>
              </div>
              <div className="coaching-world-divider">×</div>
              <div className="coaching-world">
                <span className="coaching-world-icon">⚡</span>
                <h4>Transformations concrètes</h4>
                <p>Dans ta vraie vie : travail, leadership, relations</p>
              </div>
            </div>
            <p className="coaching-closer">
              Parce que réussir, c'est bien<br />
              et <strong>s'épanouir, c'est essentiel.</strong><br />
              <em>Et tu n'as pas à choisir entre les deux.</em>
            </p>
          </div>
        </div>
      </section>

      <WaveDivider to="var(--surface-3)" />

      {/* ═══════════════════════════════════════════════════════════════ */}
      {/* MA MISSION */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      <section className="landing-section" style={{ background: "var(--surface-3)", color: "#fff", textAlign: "center" }}>
        <div className="container">
          <p className="landing-subtitle" style={{ color: "var(--accent-light)" }}>Ma mission</p>
          <blockquote className="mission-quote">
            « Aider des femmes ambitieuses à se reconnecter à leur monde intérieur…
            pour créer une vie extérieure <strong>qui leur ressemble vraiment.</strong> »
          </blockquote>
        </div>
      </section>

      <WaveDivider to="var(--bg)" />

      {/* ═══════════════════════════════════════════════════════════════ */}
      {/* FIN + CTA */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      <section className="landing-section" style={{ background: "var(--bg)", textAlign: "center" }}>
        <div className="container">
          <div style={{ maxWidth: "620px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "1.5rem", alignItems: "center" }}>
            <p className="landing-subtitle">Pour conclure</p>
            <h2 className="landing-title">Si tu te reconnais dans mon histoire…</h2>
            <p className="landing-text" style={{ textAlign: "center", margin: "0 auto" }}>
              Alors tu es probablement <strong>exactement là où j'étais.</strong>
            </p>
            <p className="landing-text" style={{ textAlign: "center", margin: "0 auto", fontWeight: 500, color: "var(--primary)" }}>
              Et la bonne nouvelle, c'est que <em>ça peut changer.</em><br />
              Pas en faisant plus, mais en apprenant à fonctionner autrement.
            </p>
            <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className="btn-cta" style={{ marginTop: "0.5rem" }}>
              Réserver ma session offerte
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
