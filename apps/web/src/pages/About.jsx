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
                Je t'aide à sortir du rôle de la bonne élève
                <span className="headline-warm"> pour devenir une leader épanouie</span>
                {" "}— au travail et dans ta vie.
              </h1>
              <p className="about-intro-text">
                Je m'appelle <strong>Aïcha Hatim</strong>. Je suis coach professionnelle certifiée ICF.
              </p>
              <p className="about-intro-punchline">
                Mais avant ça… <strong>j'ai été exactement cette femme.</strong>
              </p>
            </div>
            <div className="about-hero-photo">
              <PhotoSwitcher startIndex={0} />
            </div>
          </div>
        </div>
      </section>

      <WaveDivider from="var(--surface-2)" to="var(--bg)" />

      {/* HISTOIRE — ENFANCE */}
      <section id="histoire" className="landing-section" style={{ background: "var(--bg)" }}>
        <div className="container">
          <div className="about-story-block">
            <div className="about-story-text">
              <p className="story-eyebrow">L'enfance</p>
              <p className="about-story-body">
                Je suis née au Maroc, j'ai grandi à Casablanca. Avec des croyances très claires dès le départ :
                qu'il faut travailler dur pour y arriver, que quand on veut on peut —
                et surtout, qu'être émotive, c'est une faiblesse.
              </p>
              <p className="about-story-body">
                Ces croyances m'ont construite. Et pendant longtemps, elles m'ont bien servie.
              </p>
            </div>
            <div className="about-story-photo">
              <PhotoSwitcher startIndex={0} />
            </div>
          </div>
        </div>
      </section>

      <WaveDivider from="var(--bg)" to="var(--surface)" />

      {/* CORPORATE */}
      <section className="landing-section" style={{ background: "var(--surface)" }}>
        <div className="container">
          <div className="about-story-block reversed">
            <div className="about-story-photo">
              <PhotoSwitcher startIndex={4} />
            </div>
            <div className="about-story-text">
              <p className="story-eyebrow">Le corporate</p>
              <p className="about-story-body">
                J'ai fait prépa, école de commerce. Puis j'ai construit une carrière dans le corporate —
                sales, management, responsabilités. Des grandes boîtes, des startups.
              </p>
              <p className="about-story-body">
                <strong>J'étais performante. Très performante.</strong> Toujours préparée, toujours fiable, toujours à 110%.
                J'ai été promue. Reconnue. Récompensée.
              </p>
              <p className="about-story-body">
                De l'extérieur… <em>tout était « réussi ».</em>
              </p>
            </div>
          </div>
        </div>
      </section>

      <WaveDivider from="var(--surface)" to="var(--bg)" />

      {/* INTÉRIEUR */}
      <section className="landing-section" style={{ background: "var(--bg)" }}>
        <div className="container">
          <div className="about-story-block">
            <div className="about-story-text">
              <p className="story-eyebrow">Mais à l'intérieur…</p>
              <p className="about-story-body">
                C'était autre chose. Beaucoup de pression. Une exigence constante.
                Une voix qui disait « c'est jamais assez ».
              </p>
              <p className="about-story-body">
                Je vivais dans le contrôle. Toujours en train d'anticiper. De gérer. De tenir.
                Et dès que je relâchais — je mangeais sans faim, je scrollais, je me sentais vide.
              </p>
              <p className="about-story-emphasis">
                Mais je pensais que c'était normal.
              </p>
            </div>
            <div className="about-story-photo">
              <PhotoSwitcher startIndex={8} />
            </div>
          </div>
        </div>
      </section>

      <WaveDivider from="var(--bg)" to="var(--surface)" />

      {/* MATERNITÉ */}
      <section className="landing-section" style={{ background: "var(--surface)" }}>
        <div className="container">
          <div className="about-story-block reversed">
            <div className="about-story-photo">
              <PhotoSwitcher startIndex={12} />
            </div>
            <div className="about-story-text">
              <p className="story-eyebrow">La maternité — le tournant</p>
              <p className="about-story-body">
                Et puis il y a eu la maternité. Et là — plus de contrôle possible, plus de mode d'emploi,
                plus de perfection possible.
              </p>
              <p className="about-story-body">
                <strong>Tout ce qui « marchait » avant… ne marchait plus.</strong>
              </p>
              <p className="about-story-body">
                J'ai essayé de faire comme avant : plus de discipline, plus de contrôle.
                Mais ça ne fonctionnait pas. Et malgré une vie que j'avais « réussie » sur le papier…
                <em> je ne me sentais pas épanouie.</em>
              </p>
            </div>
          </div>
        </div>
      </section>

      <WaveDivider from="var(--surface)" to="var(--bg)" />

      {/* DÉCLIC */}
      <section className="landing-section" style={{ background: "var(--bg)" }}>
        <div className="container">
          <div className="about-story-block">
            <div className="about-story-text">
              <p className="story-eyebrow">Le déclic</p>
              <p className="about-story-body">
                J'ai mis du temps à comprendre que je ne pouvais pas régler ça seule.
                Les livres, les podcasts, la discipline… ne suffisaient pas.
              </p>
              <p className="about-story-body">
                Alors j'ai investi en moi. J'ai fait une thérapie et des coachings.
                J'ai commencé un vrai travail intérieur.
              </p>
              <p className="about-story-emphasis">Et là… quelque chose a changé.</p>
              <p className="about-story-body">
                J'ai appris à écouter mes émotions, comprendre mes mécanismes,
                apaiser mon système nerveux, changer mon dialogue intérieur.
                J'ai redéfini ce qui comptait vraiment pour moi.
              </p>
              <p className="about-story-body">
                Et surtout : <strong>j'ai arrêté de fonctionner contre moi.</strong>
              </p>
            </div>
            <div className="about-story-photo">
              <PhotoSwitcher startIndex={16} />
            </div>
          </div>
        </div>
      </section>

      <WaveDivider from="var(--bg)" to="var(--surface)" />

      {/* OUVERTURE */}
      <section className="landing-section" style={{ background: "var(--surface)" }}>
        <div className="container">
          <div className="about-story-block reversed">
            <div className="about-story-photo">
              <PhotoSwitcher startIndex={20} />
            </div>
            <div className="about-story-text">
              <p className="story-eyebrow">L'ouverture</p>
              <p className="about-story-body">
                En enlevant cette pression… <strong>tout s'est ouvert.</strong>
                J'ai changé de pays, quitté le corporate, me suis reconvertie dans le coaching,
                et j'ai vécu ma deuxième maternité autrement.
              </p>
              <p className="about-story-body">
                Je suis toujours ambitieuse. Mais je ne vis plus mon ambition dans la pression.
                Je la vis avec plus de sérénité, plus d'intention, plus d'épanouissement.
                Mon authenticité est ma boussole et mon dialogue intérieur est aussi un KPI.
              </p>
            </div>
          </div>
        </div>
      </section>

      <WaveDivider from="var(--surface)" to="var(--surface-2)" />

      {/* MON COACHING */}
      <section id="coaching" className="landing-section" style={{ background: "var(--surface-2)" }}>
        <div className="container">
          <div className="about-coaching-inner">
            <div className="about-coaching-photo">
              <PhotoSwitcher startIndex={24} />
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
                Mon rôle, ce n'est pas de te dire quoi faire. C'est de t'aider à voir ce que tu ne vois pas,
                comprendre comment tu fonctionnes et t'aider à changer en profondeur.
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
              « Aider des femmes ambitieuses à se reconnecter à leur monde intérieur…
              pour créer une vie extérieure <strong>qui leur ressemble vraiment.</strong> »
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
            <h2 className="landing-title">Si tu te reconnais dans mon histoire…</h2>
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
