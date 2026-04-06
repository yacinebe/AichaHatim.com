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
            Tu as été une bonne élève toute ta vie.<br />
            <span className="headline-warm">Mais aujourd'hui… ça ne te suffit plus.</span>
          </h1>
          <p className="landing-hero-body">
            Tu es compétente, fiable et tu fais « tout comme il faut ».<br />
            Mais tu fonctionnes sous pression, tu doutes de toi,<br />
            et tu sens que ce mode te limite — au travail comme dans ta vie.
          </p>
          <p className="landing-hero-mission">
            Je t'aide à sortir du rôle de la bonne élève pour prendre ta place de leader
            et rayonner dans tous les domaines de ta vie.
          </p>
          <div>
            <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className="btn-cta">
              Réserver ma session offerte
            </a>
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
          <p className="landing-subtitle" style={{ textAlign: "center" }}>Tu te reconnais ?</p>
          <h2 className="landing-title" style={{ textAlign: "center" }}>Qui est la bonne élève ?</h2>

          <p className="miroir-intro">
            La bonne élève, c'est celle qui fait tout « comme il faut ».<br />
            Mais qui, au fond, <strong>ne se sent pas bien.</strong>
          </p>

          {/* 3 cards */}
          <div className="miroir-cards">
            {/* Au travail */}
            <div className="miroir-card">
              <div className="miroir-card-icon">💼</div>
              <h3 className="miroir-card-title">Au travail</h3>
              <p className="miroir-card-pos">
                Elle est irréprochable. Elle gère, elle délivre, elle anticipe. On peut compter sur elle.
              </p>
              <div className="miroir-card-sep" />
              <p className="miroir-card-neg">
                Mais elle fonctionne sous pression, elle doute beaucoup, elle se suradapte.
                Et elle espère qu'à force de tout donner… elle finira par se sentir <em>légitime.</em>
              </p>
            </div>

            {/* Vie perso */}
            <div className="miroir-card">
              <div className="miroir-card-icon">🏠</div>
              <h3 className="miroir-card-title">Dans sa vie perso</h3>
              <p className="miroir-card-pos">
                Elle tient aussi. Elle gère la maison, les enfants, la charge mentale.
              </p>
              <div className="miroir-card-sep" />
              <p className="miroir-card-neg">
                Mais elle est fatiguée, irritable parfois.
                Et elle culpabilise de ne pas être la femme, la mère, la partenaire <em>qu'elle voudrait être.</em>
              </p>
            </div>

            {/* Avec elle-même */}
            <div className="miroir-card">
              <div className="miroir-card-icon">🪞</div>
              <h3 className="miroir-card-title">Avec elle-même</h3>
              <p className="miroir-card-pos">
                Elle essaie de prendre soin d'elle. Elle fait du sport, elle mange « bien »,
                elle fait sa skin-care, elle lit, elle écoute des podcasts.
              </p>
              <div className="miroir-card-sep" />
              <p className="miroir-card-neg">
                Mais malgré tout ça, elle reste dure, exigeante, jamais vraiment satisfaite.
                Elle a du mal à ralentir, à profiter, ou à <em>se sentir fière.</em>
              </p>
            </div>
          </div>

          {/* Et pourtant */}
          <div className="miroir-pourtant">
            <p className="miroir-pourtant-label">Et pourtant…</p>
            <div className="miroir-pills">
              <span className="miroir-pill">Elle a « tout bien fait »</span>
              <span className="miroir-pill">Elle a réussi</span>
              <span className="miroir-pill">Elle a construit une belle vie</span>
            </div>
            <p className="miroir-punchline">
              Mais elle ne ressent pas la fierté, la joie ou l'épanouissement
              qu'elle imaginait en arrivant là.
            </p>
          </div>

          <p className="miroir-conclusion">
            La bonne élève, c'est une femme brillante…<br />
            <strong>coincée dans un mode de fonctionnement qui l'épuise
            et l'empêche de prendre pleinement sa place dans sa vie.</strong>
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
          <p className="landing-subtitle" style={{ textAlign: "center" }}>Le cercle vicieux</p>
          <h2 className="landing-title" style={{ textAlign: "center" }}>
            Ce que tu as essayé<br />
            <span style={{ fontSize: "0.75em", fontWeight: 400, color: "var(--text-muted)" }}>
              (et pourquoi ça ne marche pas)
            </span>
          </h2>

          <p className="landing-text" style={{ textAlign: "center", margin: "0 auto" }}>
            Et quand ça ne va plus… tu essaies de t'en sortir seule.<br />
            Tu te dis :
          </p>

          <div className="essaye-quotes">
            <div className="essaye-quote">« Je dois mieux m'organiser »</div>
            <div className="essaye-quote">« Je dois me reprendre »</div>
            <div className="essaye-quote">« Je dois être plus disciplinée »</div>
          </div>

          <p className="landing-text" style={{ textAlign: "center", margin: "0 auto" }}>
            Tu lis. Tu écoutes des podcasts. Tu lis des livres de développement personnel
            ou de leadership. Bref, tu comprends plein de choses et tu es dans la maîtrise théorique.
          </p>

          <p className="essaye-punchline">
            Mais concrètement… tu continues à fonctionner pareil.
          </p>

          <div className="essaye-divider" />

          <p className="landing-text" style={{ textAlign: "center", margin: "0 auto" }}>
            Ou alors, tu penses que la solution, c'est de <strong>tout changer</strong> :
          </p>

          <div className="essaye-list">
            <span>changer de job</span>
            <span>changer de rythme</span>
            <span>changer de vie</span>
          </div>

          <p className="landing-text" style={{ textAlign: "center", margin: "0 auto" }}>
            Mais au fond, tu le sens : tu ne veux pas tout envoyer balader.<br />
            Et surtout… tu sens que même si tu changes tout…<br />
            <strong>tu vas recréer la même pression ailleurs.</strong>
          </p>

          <div className="essaye-highlight">
            <p>Parce que le problème n'est pas ta vie.</p>
            <p className="essaye-highlight-big">C'est la manière dont tu la vis.</p>
            <p>
              Et ça, tu ne peux pas le résoudre seule.<br />
              Pas parce que tu n'es pas capable…<br />
              mais parce que <strong>c'est avec ce même mode de fonctionnement
              que tu essaies de t'en sortir.</strong>
            </p>
          </div>

          <p className="landing-text" style={{ textAlign: "center", margin: "0 auto", fontWeight: 500, color: "var(--primary)" }}>
            Si tu sens que tu tournes en rond…<br />
            c'est exactement ce qu'on vient débloquer en coaching.
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
// SECTION 4 — RÉINVENTION INTÉRIEURE (présentation programme)
// ═══════════════════════════════════════════════════════════════════════
function ReinventionSection() {
  return (
    <section className="landing-section" style={{ background: "var(--bg)" }}>
      <div className="container">
        <div className="reinvention-content">
          <p className="landing-subtitle" style={{ textAlign: "center" }}>Le programme</p>
          <h2 className="landing-title" style={{ textAlign: "center" }}>Réinvention Intérieure</h2>

          <p className="landing-text" style={{ textAlign: "center", margin: "0 auto" }}>
            Tu comprends que : <strong>faire plus</strong> ne va pas t'aider à évoluer professionnellement,
            être la « meilleure version de toi » ne va pas t'épanouir
            et <strong>tenir encore</strong> va continuer à te coûter.
          </p>

          <p className="landing-text" style={{ textAlign: "center", margin: "0 auto" }}>
            Ce qui doit changer… c'est ce qui se passe <strong>à l'intérieur de toi</strong> :
            la manière dont tu te parles, tes croyances autour de la réussite
            et les réflexes qui te poussent à surperformer ou à te suradapter.
          </p>

          <div className="reinvention-highlight">
            <p>C'est ça, la réinvention intérieure.</p>
            <p>Pas tout casser ou repartir de zéro.</p>
            <p><strong>Mais sortir de ce mode « bonne élève » qui t'a construite…
            mais qui aujourd'hui te limite.</strong></p>
          </div>

          <p className="landing-text" style={{ textAlign: "center", margin: "0 auto" }}>
            Et apprendre à fonctionner autrement :
          </p>

          <div className="reinvention-pillars">
            <div className="reinvention-pillar">
              <span className="reinvention-pillar-icon">🛡</span>
              <span>avec plus de <strong>sécurité intérieure</strong></span>
            </div>
            <div className="reinvention-pillar">
              <span className="reinvention-pillar-icon">✦</span>
              <span>avec plus de <strong>confiance</strong></span>
            </div>
            <div className="reinvention-pillar">
              <span className="reinvention-pillar-icon">💡</span>
              <span>avec plus de <strong>clarté</strong></span>
            </div>
          </div>

          <p className="landing-text" style={{ textAlign: "center", margin: "0 auto", fontWeight: 500, color: "var(--primary)" }}>
            Pour te sentir à nouveau aux commandes de ta vie.
          </p>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════
// SECTION 5 — IMAGINE UNE VIE OÙ (vision/désir)
// ═══════════════════════════════════════════════════════════════════════
function VisionSection() {
  return (
    <section className="landing-section" style={{ background: "var(--surface-3)", color: "#fff" }}>
      <div className="container">
        <div className="vision-content">
          <p className="landing-subtitle" style={{ textAlign: "center", color: "var(--accent-light)" }}>Ta transformation</p>
          <h2 className="landing-title" style={{ textAlign: "center", color: "#fff" }}>Imagine une vie où…</h2>

          <div className="vision-list">
            <div className="vision-item">
              <span className="vision-icon">✨</span>
              <p>Tu te sens <strong>calme</strong>, même quand il y a de la pression.</p>
            </div>
            <div className="vision-item">
              <span className="vision-icon">✨</span>
              <p>Tu avances <strong>sans te suradapter</strong> en permanence ou être dans le contrôle.</p>
            </div>
            <div className="vision-item">
              <span className="vision-icon">✨</span>
              <p>Tu <strong>prends ta place</strong>, naturellement.</p>
            </div>
            <div className="vision-item">
              <span className="vision-icon">✨</span>
              <p>Tu travailles bien. Mais sur les bons sujets, avec la posture que tu choisis et <strong>sans t'épuiser</strong>.</p>
            </div>
            <div className="vision-item">
              <span className="vision-icon">✨</span>
              <p>Tu es <strong>présente</strong> avec tes enfants. <strong>Disponible</strong> avec ton partenaire. <strong>En paix</strong> avec toi-même.</p>
            </div>
            <div className="vision-item">
              <span className="vision-icon">✨</span>
              <p>Tu as de l'<strong>énergie</strong>. De la <strong>clarté</strong>. De la <strong>légèreté</strong>.</p>
            </div>
          </div>

          <div className="vision-finale">
            <p>Et surtout…</p>
            <p className="vision-big">Tu ne fais plus que « tenir ».</p>
            <p className="vision-big">Tu te sens <strong>vraiment épanouie</strong> dans ta vie.</p>
            <p style={{ fontSize: "0.95rem", opacity: 0.7, marginTop: "1rem" }}>
              Pas parfaite. Pas toujours simple.<br />
              Mais pleine, vivante… et profondément à ta place.
            </p>
          </div>

          <div className="section-cta">
            <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className="btn-cta" style={{ background: "#fff", color: "var(--primary)" }}>
              Prendre ma place (enfin)
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════
// SECTION 6 — MA MÉTHODE (3 piliers)
// ═══════════════════════════════════════════════════════════════════════
function MethodeSection() {
  return (
    <section className="landing-section" style={{ background: "var(--bg)" }}>
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <p className="landing-subtitle">Mon approche</p>
          <h2 className="landing-title">Ma méthode</h2>
          <p className="landing-text" style={{ margin: "0 auto" }}>
            Un travail en profondeur qui transforme concrètement ta manière de travailler, de décider et de vivre.
          </p>
          <p className="landing-text" style={{ margin: "0.5rem auto 0", fontWeight: 500, color: "var(--primary)" }}>
            On ne fait pas que comprendre. On change ta manière de fonctionner — durablement.
          </p>
        </div>

        <div className="methode-grid">
          {/* Pilier 1 */}
          <div className="methode-card">
            <span className="methode-number">01</span>
            <h3 className="methode-card-title">Clarté</h3>
            <p className="methode-card-subtitle">Comprendre comment tu fonctionnes</p>
            <p className="landing-text">On commence par comprendre : tes schémas de pression, de surcontrôle et de fatigue. Les mécanismes automatiques qui te maintiennent là.</p>
            <p className="methode-card-label">Concrètement, on travaille sur :</p>
            <ul className="methode-list">
              <li>Tes saboteurs et réflexes automatiques</li>
              <li>Ton dialogue intérieur</li>
              <li>Tes croyances limitantes</li>
              <li>Tes peurs</li>
            </ul>
            <p className="methode-card-result">Tu comprends enfin <strong>pourquoi</strong> tu fonctionnes comme ça. Et pourquoi, seule, tu tournes en rond.</p>
          </div>

          {/* Pilier 2 */}
          <div className="methode-card">
            <span className="methode-number">02</span>
            <h3 className="methode-card-title">Reconnexion</h3>
            <p className="methode-card-subtitle">Revenir à toi</p>
            <p className="landing-text">On reconnecte avec ce qui compte vraiment pour toi : ta vision de vie, tes valeurs, tes émotions, ton corps.</p>
            <p className="methode-card-label">Tu apprends à :</p>
            <ul className="methode-list">
              <li>Écouter au lieu de pousser</li>
              <li>Te comprendre au lieu de te juger</li>
              <li>Te réguler au lieu de te suradapter</li>
            </ul>
            <p className="methode-card-result">Tu passes d'un mode <strong>« je subis / je tiens »</strong> à un mode <strong>« je ressens / je choisis »</strong>.</p>
          </div>

          {/* Pilier 3 */}
          <div className="methode-card">
            <span className="methode-number">03</span>
            <h3 className="methode-card-title">Réinvention</h3>
            <p className="methode-card-subtitle">Agir autrement dans ta vraie vie</p>
            <p className="landing-text">On traduit tout ça dans ton quotidien, à partir de tes vraies situations.</p>
            <p className="methode-card-label">On travaille aussi :</p>
            <ul className="methode-list">
              <li>Prendre ta place sans te suradapter</li>
              <li>Poser des limites sans culpabiliser</li>
              <li>Ton leadership et ton rapport à la réussite</li>
              <li>Ton équilibre de vie</li>
            </ul>
            <p className="methode-card-result">On ne reste pas dans la réflexion. <strong>On change ce qui se joue dans ta vraie vie.</strong></p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════
// SECTION 7 — STRUCTURE DU PROGRAMME
// ═══════════════════════════════════════════════════════════════════════
function StructureSection() {
  return (
    <section className="landing-section" style={{ background: "var(--surface-2)" }}>
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <p className="landing-subtitle">Comment ça se passe</p>
          <h2 className="landing-title">Concrètement</h2>
        </div>

        <div className="structure-grid">
          <div className="structure-card structure-main">
            <h3 style={{ fontSize: "1.6rem", color: "var(--primary)", marginBottom: "1rem" }}>Réinvention Intérieure, c'est :</h3>
            <div className="structure-stats">
              <div className="structure-stat">
                <span className="structure-stat-num">8</span>
                <span className="structure-stat-label">sessions individuelles en visio (1:1)</span>
              </div>
              <div className="structure-stat">
                <span className="structure-stat-num">4</span>
                <span className="structure-stat-label">mois d'accompagnement sur mesure</span>
              </div>
            </div>
          </div>

          <div className="structure-card">
            <h3 style={{ color: "var(--accent-dim)", marginBottom: "1rem" }}>Chaque session, c'est :</h3>
            <ul className="arrow-list">
              <li>Un espace sûr, sans jugement, où tu n'as pas à performer</li>
              <li>Des conversations profondes qui t'aident à voir clair</li>
              <li>Des prises de conscience qui changent ta manière de te percevoir</li>
              <li>Des mises en action douces mais puissantes</li>
            </ul>
          </div>

          <div className="structure-card">
            <h3 style={{ color: "var(--accent-dim)", marginBottom: "1rem" }}>🔁 Entre les sessions</h3>
            <p className="landing-text">Tu es soutenue entre chaque session :</p>
            <ul className="arrow-list">
              <li>Support WhatsApp pour ne pas rester seule</li>
              <li>Ressources audio et vidéo exclusives</li>
              <li>Exercices personnalisés pour ancrer ce que l'on travaille</li>
            </ul>
          </div>
        </div>

        <p className="landing-text" style={{ textAlign: "center", margin: "2.5rem auto 0", fontWeight: 500, color: "var(--primary)" }}>
          Si tu veux faire ce travail accompagnée…
        </p>
        <div className="section-cta">
          <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className="btn-cta">
            Réserver ma session offerte
          </a>
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
        <div style={{ display: "grid", gridTemplateColumns: "0.9fr 1.1fr", gap: "4rem", alignItems: "center" }}>
          <div className="landing-photo">
            <PhotoSwitcher startIndex={10} />
          </div>
          <div>
            <p className="landing-subtitle">Qui suis-je</p>
            <h2 className="landing-title">Et pourquoi je te parle de ça</h2>

            <p className="landing-text">
              Je connais très bien ce mode « bonne élève ». <strong>Je l'ai vécu de l'intérieur.</strong>
            </p>
            <p className="landing-text">
              Pendant plus de 10 ans, j'ai évolué dans le corporate, en sales et en management.
              J'aimais mon travail. Je performais. J'ai été promue, encore et encore.
              J'étais celle sur qui on peut compter : organisée, fiable, toujours à 110%.
            </p>
            <p className="landing-text">
              De l'extérieur… ça ressemblait exactement à ce qu'on appelle une « réussite ».
            </p>
            <p className="landing-text">
              <strong>Mais à l'intérieur… c'était une autre histoire.</strong><br />
              Beaucoup de pression. Une exigence constante.
              Cette voix qui dit « ce n'est jamais assez ».
            </p>
            <p className="landing-text">
              Jusqu'au moment où j'ai décidé de me faire accompagner.<br />
              Et là… <strong>tout a changé.</strong>
            </p>
            <p className="landing-text" style={{ color: "var(--primary)", fontWeight: 500 }}>
              Le problème n'était pas ma vie — mais la manière dont je la vivais.
            </p>
            <p className="landing-text">
              Aujourd'hui, je suis toujours ambitieuse. Mais je ne vis plus mon ambition dans la pression.
              Je la vis avec plus de sérénité, plus d'intention, plus d'épanouissement.
            </p>
            <p className="landing-text" style={{ marginTop: "1rem" }}>
              Je suis <strong>coach certifiée</strong> (International Coaching Federation), formée à une approche en profondeur.<br />
              Mais au-delà des certifications — je connais ce terrain, je parle ton langage
              et je sais ce que ça demande, pour de vrai.
            </p>
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
  const [openIdx, setOpenIdx] = useState(null);

  return (
    <section className="landing-section" style={{ background: "var(--bg)" }}>
      <div className="container">
        <div>
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <p className="landing-subtitle">Questions</p>
            <h2 className="landing-title">Tu te demandes peut-être…</h2>
          </div>

          <div className="faq-list">
            {FAQ_DATA.map((item, i) => (
              <div key={i} className="faq-item">
                <button className="faq-question" onClick={() => setOpenIdx(openIdx === i ? null : i)}>
                  <span>{item.q}</span>
                  <svg className={`faq-chevron ${openIdx === i ? "open" : ""}`} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>
                {openIdx === i && (
                  <div className="faq-answer">
                    {item.a.split("\n\n").map((p, j) => <p key={j} style={{ marginBottom: "0.75rem" }}>{p}</p>)}
                  </div>
                )}
              </div>
            ))}
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
    <section className="landing-section" style={{ background: "var(--surface-3)", color: "#fff", textAlign: "center" }}>
      <div className="container">
        <div style={{ maxWidth: "900px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "1.5rem", alignItems: "center" }}>
          <p className="landing-subtitle" style={{ color: "var(--accent-light)" }}>Prête ?</p>
          <h2 className="landing-title" style={{ color: "#fff" }}>
            Et si on en parlait ?
          </h2>
          <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "1.05rem", lineHeight: 1.8, maxWidth: "50ch" }}>
            Une session découverte de 30 minutes, offerte et sans engagement.
            Un espace pour sentir si c'est le bon moment — et si on est faites pour travailler ensemble.
          </p>
          <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className="btn-cta" style={{ background: "var(--accent)", marginTop: "0.5rem" }}>
            Réserver ma session offerte
          </a>
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
      <WaveDivider from="#e8ddd0" to="var(--bg)" />
      <MiroirSection />
      <WaveDivider from="var(--bg)" to="var(--surface-2)" />
      <EssayeSection />
      <WaveDivider from="var(--surface-2)" to="var(--bg)" />
      <ReinventionSection />
      <VisionSection />
      <WaveDivider from="var(--surface-3)" to="var(--bg)" />
      <MethodeSection />
      <WaveDivider from="var(--bg)" to="var(--surface-2)" />
      <StructureSection />
      <WaveDivider from="var(--surface-2)" to="var(--bg)" />
      <TemoignagesSection />
      <WaveDivider from="var(--bg)" to="var(--surface-2)" />
      <QuiSuisJeSection />
      <WaveDivider from="var(--surface-2)" to="var(--bg)" />
      <FaqLandingSection />
      <CtaFinalSection />
    </div>
  );
}
