import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const CALENDLY_URL = import.meta.env.VITE_CALENDLY_URL ?? "https://calendly.com/aicha-hatim/let-s-chat";

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

function WaveDivider({ from = "transparent", to = "var(--surface-2)" }) {
  return (
    <div style={{ lineHeight: 0, background: from }}>
      <svg viewBox="0 0 1440 60" preserveAspectRatio="none" style={{ display: "block", width: "100%", height: "60px" }}>
        <path d="M0,0 C360,60 1080,0 1440,60 L1440,60 L0,60 Z" fill={to} />
      </svg>
    </div>
  );
}

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

      {/* HERO */}
      <section className="landing-section about-hero" style={{ background: "linear-gradient(160deg, var(--bg) 0%, var(--surface-2) 100%)", paddingTop: "5rem", paddingBottom: "4rem" }}>
        <div className="container">
          <div className="about-hero-inner">
            <div className="about-hero-content">
              <h1 className="about-headline">
                Je t'aide à passer de la femme qui doute…
                <span className="headline-warm"> à la leader confiante et épanouie que tu es déjà.</span>
              </h1>
              <p className="about-intro-text">
                Je m'appelle <strong>Aïcha Hatim</strong>. Je suis coach professionnelle accréditée ICF.
              </p>
              <p className="about-intro-punchline">
                Mais avant ça… <strong>j'ai été exactement cette femme.</strong>
              </p>
            </div>
            <div className="about-hero-photo">
              <img src="/about-hero-photo.jpg" alt="Aicha Hatim" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", display: "block", borderRadius: "var(--radius)" }} />
            </div>
          </div>
        </div>
      </section>

      <WaveDivider from="var(--surface-2)" to="var(--bg)" />

      {/* TIMELINE HISTOIRE */}
      <section id="histoire" className="landing-section" style={{ background: "var(--bg)" }}>
        <div className="container">
          <div className="about-timeline">

            <div className="tl-item">
              <div className="tl-dot-col"><div className="tl-dot" /></div>
              <div className="tl-content">
                <div className="tl-text">
                  <p className="story-eyebrow">L'enfance</p>
                  <p className="about-story-body">
                    Dès le début, j'ai appris les règles du jeu : travaille dur, sois humble, ne fais pas de vague.
                    La bonne élève qui mérite sa place par ses efforts — pas par qui elle est.
                    Ces croyances m'ont portée loin. Et elles m'ont coûté cher.
                  </p>
                </div>
                <div className="tl-photo"><img src="/enfance-photo.jpg" alt="Aicha enfant" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", display: "block" }} /></div>
              </div>
            </div>

            <div className="tl-item">
              <div className="tl-dot-col"><div className="tl-dot" /></div>
              <div className="tl-content">
                <div className="tl-text">
                  <p className="story-eyebrow">Le monde corporate</p>
                  <p className="about-story-body">
                    Prépa, école de commerce, la boîte de mes rêves. Accountable à 1000%, toujours à 120%.
                    Mais jamais celle qui initie, qui prend la parole, qui interagit avec le leadership.
                    Un jour, le feedback est tombé : <em>« Tu manques de visibilité. »</em>
                  </p>
                  <p className="about-story-body">
                    J'ai travaillé sur moi. Et j'ai développé un projet interne — un Coaching Lab.
                    J'en suis devenue l'ambassadrice, j'ai construit une vraie marque autour, j'ai visité d'autres bureaux.
                    J'ai pris ma place — et j'ai été promue manager à 29 ans.
                  </p>
                </div>
                <div className="tl-photo"><img src="/corporate-photo.jpg" alt="Aicha corporate" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", display: "block" }} /></div>
              </div>
            </div>

            <div className="tl-item">
              <div className="tl-dot-col"><div className="tl-dot" /></div>
              <div className="tl-content">
                <div className="tl-text">
                  <p className="story-eyebrow">La maternité — le tournant</p>
                  <p className="about-story-body">
                    La maternité a tout chamboulé. Et une vraie question a émergé : est-ce vraiment ce chemin de vie que je veux ?
                  </p>
                  <p className="about-story-body">
                    Je me suis fait coacher pour trouver mes réponses. Et là, j'ai réalisé quelque chose que je savais depuis des années sans me l'avouer : j'avais toujours envie d'accompagner, de coacher, d'aider les autres à se transformer. Mais j'avais peur. Du regard des autres. De l'exposition. De l'échec.
                  </p>
                </div>
                <div className="tl-photo"><img src="/maternite-photo.jpg" alt="Aicha maternité" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", display: "block" }} /></div>
              </div>
            </div>

            <div className="tl-item tl-item-last">
              <div className="tl-dot-col"><div className="tl-dot tl-dot-gold" /></div>
              <div className="tl-content">
                <div className="tl-text">
                  <p className="story-eyebrow" style={{ color: "var(--gold)" }}>Aujourd'hui</p>
                  <p className="about-story-body">
                    J'ai avancé vers ma reconversion, j'ai travaillé profondément sur mes croyances, mon estime de moi, mes mécanismes intérieurs. Et tout a changé.
                    Je construis mes rêves — ce business de coaching, mon podcast, ma présence sur les réseaux, tout en étant maman de 2 enfants — avec légèreté et confiance.
                  </p>
                  <p className="about-story-body"><em>Je suis toujours ambitieuse. Mais je vis mon ambition depuis un endroit de confiance — pas de peur.</em></p>
                </div>
                <div className="tl-photo"><img src="/reinvention-photo.jpg" alt="Aicha réinvention" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", display: "block" }} /></div>
              </div>
            </div>

          </div>
        </div>
      </section>

      <WaveDivider from="var(--bg)" to="var(--surface-2)" />

      {/* MON COACHING */}
      <section id="coaching" className="landing-section" style={{ background: "var(--surface-2)" }}>
        <div className="container">
          <div className="about-coaching-inner">
            <div className="about-coaching-photo">
              <img src="/about-photo.jpg" alt="Aicha Hatim" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", display: "block" }} />
            </div>
            <div className="about-coaching-content">
              <p className="story-eyebrow">Mon coaching</p>
              <div className="about-certifs">
                <span className="quisuisje-certif">ICF Certified</span>
                <span className="quisuisje-certif">Co-Active Training Institute</span>
              </div>
              <p className="about-story-body">
                Je suis coach certifiée <strong>Co-Active</strong> et accréditée <strong>ICF</strong>
                {" "}(International Coaching Federation, la référence mondiale du coaching).
              </p>
              <p className="about-story-body">
                Mon rôle, ce n'est pas de te donner des réponses. C'est de te poser les bonnes questions — celles qui te permettent de voir ce que tu ne vois pas, et d'avancer vers qui tu veux vraiment être.
              </p>
              <div className="about-worlds">
                <div className="about-world">
                  <div className="about-world-accent" />
                  <p className="about-world-label">Travail intérieur profond</p>
                  <p className="about-world-sub">Émotions, saboteurs, parts, croyances</p>
                </div>
                <div className="about-world-sep">
                  <div className="about-world-sep-inner">×</div>
                </div>
                <div className="about-world">
                  <div className="about-world-accent gold" />
                  <p className="about-world-label">Transformations concrètes</p>
                  <p className="about-world-sub">Dans ta vraie vie : travail, leadership, relations</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <WaveDivider from="var(--surface-2)" to="var(--surface-3)" />

      {/* MISSION */}
      <section className="landing-section" style={{ background: "var(--surface-3)", textAlign: "center", padding: "5rem 0" }}>
        <div className="container">
          <div style={{ maxWidth: "680px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "1.5rem", alignItems: "center" }}>
            <p className="landing-subtitle" style={{ color: "var(--gold-light)", letterSpacing: "0.2em" }}>Ma mission</p>
            <div style={{ width: "40px", height: "1px", background: "var(--gold)", margin: "0 auto" }} />
            <blockquote className="mission-quote">
              « Aider les over-achievers à vivre leur ambition depuis un endroit de confiance — pas de peur. »
            </blockquote>
          </div>
        </div>
      </section>

      <WaveDivider from="var(--surface-3)" to="var(--bg)" />

      {/* CTA */}
      <section className="landing-section" style={{ background: "var(--bg)", textAlign: "center" }}>
        <div className="container">
          <div className="about-cta">
            <p className="landing-subtitle">Pour conclure</p>
            <h2 className="landing-title" style={{ whiteSpace: "nowrap" }}>Si tu te reconnais dans mon histoire…</h2>
            <p className="about-story-body" style={{ textAlign: "center", maxWidth: "52ch", margin: "0 auto" }}>
              Alors tu es probablement <strong>exactement là où j'étais.</strong>
            </p>
            <p className="about-story-body" style={{ textAlign: "center", maxWidth: "52ch", margin: "0 auto" }}>
              Et la bonne nouvelle, c'est que <em>ça peut changer.</em>{" "}
              Pas en faisant plus, mais en apprenant à fonctionner autrement.
            </p>
            <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className="btn-cta">
              Réserver ma session offerte
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
