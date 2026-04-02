import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { api } from "../api/client.js";

const CALENDLY_URL = import.meta.env.VITE_CALENDLY_URL ?? "#";

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
        background: "rgba(0,0,0,0.55)", borderRadius: "50px", padding: "0.3rem 0.75rem",
        zIndex: 2,
      }}>
        <button onClick={prev} style={{ background: "none", border: "none", color: "#fff", cursor: "pointer", fontSize: "1rem", padding: "0 0.25rem" }}>◀</button>
        <span style={{ color: "rgba(255,255,255,0.8)", fontSize: "0.7rem", minWidth: "80px", textAlign: "center" }}>
          {PHOTOS[idx].replace(".JPG", "")} ({idx + 1}/{PHOTOS.length})
        </span>
        <button onClick={next} style={{ background: "none", border: "none", color: "#fff", cursor: "pointer", fontSize: "1rem", padding: "0 0.25rem" }}>▶</button>
      </div>
    </>
  );
}

export default function About() {
  const { data: content } = useQuery({
    queryKey: ["content", "about"],
    queryFn: () => api.getContent("about"),
  });

  const { hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  }, [hash]);

  return (
    <div className="page">
      {/* Header */}
      <section className="section" style={{ background: "var(--surface-2)", paddingBottom: "3rem" }}>
        <div className="container">
          <div className="section-header centered">
            <span className="section-eyebrow">À propos</span>
            <h1>{content?.title ?? "Découvrez mon parcours"}</h1>
            <div className="section-divider" />
          </div>
        </div>
      </section>

      {/* ── MON HISTOIRE ── */}
      <section id="histoire" className="section">
        <div className="container">
          <div className="about-grid">
            <div className="about-image" style={{ position: "relative" }}>
              <PhotoSwitcher startIndex={5} />
            </div>
            <div className="about-content">
              <div className="section-header">
                <span className="section-eyebrow">Mon histoire</span>
                <h2>Le chemin qui m'a menée ici</h2>
                <div className="section-divider" />
              </div>
              {content?.body
                ? <div dangerouslySetInnerHTML={{ __html: content.body }} />
                : (
                  <>
                    <p style={{ color: "var(--text-muted)" }}>
                      Après plusieurs années dans le monde de l'entreprise, j'ai moi-même vécu ce sentiment d'être à la croisée des chemins — compétente, mais pas alignée. C'est ce chemin personnel qui m'a conduit vers le coaching.
                    </p>
                    <p style={{ color: "var(--text-muted)" }}>
                      Aujourd'hui, certifiée ICF et formée au Co-Active Training Institute (CTI), j'accompagne les femmes qui veulent reprendre les rênes de leur vie professionnelle.
                    </p>
                    <p style={{ color: "var(--text-muted)" }}>
                      Mon approche est à la fois douce et exigeante : je crois en votre capacité à trouver vos propres réponses. Mon rôle est de créer l'espace pour que vous puissiez vous entendre.
                    </p>
                  </>
                )
              }
              <div className="badges" style={{ marginTop: "1.5rem" }}>
                <span className="badge">ICF Certified Coach</span>
                <span className="badge">CTI Trained</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── MON COACHING ── */}
      <section id="coaching" className="section" style={{ background: "var(--surface-2)" }}>
        <div className="container">
          <div className="section-header centered">
            <span className="section-eyebrow">Mon coaching</span>
            <h2>Ce en quoi je crois</h2>
            <div className="section-divider" />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1.5rem" }}>
            {[
              { icon: "✦", title: "Vous avez toutes les réponses", text: "Mon rôle n'est pas de vous dire quoi faire, mais de créer l'espace pour que vous trouviez votre propre chemin." },
              { icon: "✦", title: "Le changement est possible", text: "Peu importe où vous en êtes aujourd'hui, une transformation profonde est à votre portée." },
              { icon: "✦", title: "L'authenticité avant tout", text: "Je crois en un coaching sans masque, ancré dans qui vous êtes vraiment, pas dans qui vous pensez devoir être." },
            ].map((v) => (
              <div key={v.title} className="card">
                <div style={{ color: "var(--accent)", fontSize: "1.5rem", marginBottom: "0.75rem" }}>{v.icon}</div>
                <h3 style={{ marginBottom: "0.5rem" }}>{v.title}</h3>
                <p style={{ color: "var(--text-muted)", fontSize: "0.95rem" }}>{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section cta-section">
        <div className="container">
          <div className="cta-inner">
            <h2>Travaillons ensemble</h2>
            <p>Une conversation de 30 minutes pour explorer si mon accompagnement est fait pour vous.</p>
            <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className="btn btn-accent btn-lg">
              Coaching offert
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
