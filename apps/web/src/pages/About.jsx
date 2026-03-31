import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { api } from "../api/client.js";

const CALENDLY_URL = import.meta.env.VITE_CALENDLY_URL ?? "#";

export default function About() {
  const { data: content } = useQuery({
    queryKey: ["content", "about"],
    queryFn: () => api.getContent("about"),
  });

  return (
    <div className="page">
      {/* Hero */}
      <section className="section" style={{ background: "var(--surface-2)", paddingBottom: "3rem" }}>
        <div className="container">
          <div className="section-header centered">
            <span className="section-eyebrow">À propos</span>
            <h1>{content?.title ?? "Mon histoire"}</h1>
            <div className="section-divider" />
          </div>
        </div>
      </section>

      {/* Main story */}
      <section className="section">
        <div className="container">
          <div className="about-grid">
            <div className="about-image">
              {content?.photo_url
                ? <img src={content.photo_url} alt="Aicha Hatim" />
                : <div style={{ width:"100%", height:"100%", display:"flex", alignItems:"center", justifyContent:"center", color:"var(--text-light)", fontFamily:"var(--font-serif)", fontSize:"1.1rem" }}>Photo à venir</div>
              }
            </div>
            <div className="about-content">
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
                <span className="badge">🏅 ICF Certified Coach</span>
                <span className="badge">🎓 CTI Trained</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section" style={{ background: "var(--surface-2)" }}>
        <div className="container">
          <div className="section-header centered">
            <span className="section-eyebrow">Mon approche</span>
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
              Réserver une séance découverte
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}