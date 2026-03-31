import { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { api } from "../api/client.js";

const CALENDLY_URL = import.meta.env.VITE_CALENDLY_URL ?? "#";

function EmailCapture() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(null);

  const submit = async (e) => {
    e.preventDefault();
    try {
      await api.subscribe(email, "homepage");
      setStatus("ok");
      setEmail("");
    } catch {
      setStatus("err");
    }
  };

  return (
    <section className="section capture-section">
      <div className="container">
        <div className="capture-box">
          <div className="section-header centered">
            <span className="section-eyebrow">Ressources offertes</span>
            <h2>Accédez à mes ressources gratuites</h2>
            <p style={{ color: "var(--text-muted)" }}>
              Rejoignez ma communauté et recevez des outils concrets pour avancer dans votre vie professionnelle.
            </p>
          </div>
          {status === "ok" ? (
            <p className="form-success" style={{ fontSize: "1rem" }}>
              Merci ! Vérifiez votre boîte mail.
            </p>
          ) : (
            <form className="capture-form" onSubmit={submit}>
              <input
                type="email"
                className="input"
                placeholder="votre@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit" className="btn btn-primary">S'inscrire</button>
            </form>
          )}
          {status === "err" && <p className="form-error">Une erreur est survenue. Réessayez.</p>}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const { data, isLoading } = useQuery({ queryKey: ["testimonials"], queryFn: api.getTestimonials });

  if (isLoading) return null;
  if (!data?.length) return null;

  return (
    <section className="section" style={{ background: "var(--surface-2)" }}>
      <div className="container">
        <div className="section-header centered">
          <span className="section-eyebrow">Témoignages</span>
          <h2>Ce qu'en disent mes clientes</h2>
          <div className="section-divider" />
        </div>
        <div className="testimonials-grid">
          {data.map((t) => (
            <div key={t.id} className="testimonial-card">
              {t.video_url ? (
                <div className="testimonial-video">
                  <iframe
                    src={t.video_url.replace("watch?v=", "embed/")}
                    title={t.author_name}
                    allowFullScreen
                  />
                </div>
              ) : (
                <p className="testimonial-quote">{t.content}</p>
              )}
              <div className="testimonial-author">
                <div className="testimonial-avatar" style={{ background: "var(--surface-2)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"1.1rem" }}>
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
      </div>
    </section>
  );
}

export default function Home() {
  const { data: content } = useQuery({
    queryKey: ["content", "home"],
    queryFn: () => api.getContent("home"),
  });

  return (
    <div className="page">
      {/* Hero */}
      <section className="hero">
        <div className="hero-inner">
          <div className="hero-content">
            <span className="hero-eyebrow">Coach professionnelle certifiée ICF &amp; CTI</span>
            <h1 className="hero-title">
              {content?.hero_title ?? "Révélez votre potentiel, construisez la carrière qui vous ressemble"}
            </h1>
            <p className="hero-subtitle">
              {content?.hero_subtitle ?? "Je vous accompagne à clarifier votre vision, surmonter vos blocages et passer à l'action avec confiance."}
            </p>
            <div className="hero-actions">
              <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-lg">
                Réserver une séance découverte
              </a>
              <Link to="/a-propos" className="btn btn-outline">
                En savoir plus
              </Link>
            </div>
          </div>
          <div className="hero-image">
            {content?.hero_image_url
              ? <img src={content.hero_image_url} alt="Aicha Hatim" />
              : <div style={{ width:"100%", height:"100%", display:"flex", alignItems:"center", justifyContent:"center", color:"var(--text-light)", fontFamily:"var(--font-serif)", fontSize:"1.1rem" }}>Photo à venir</div>
            }
          </div>
        </div>
      </section>

      {/* VSL */}
      {content?.vsl_url && (
        <section className="section vsl-section">
          <div className="container">
            <div className="section-header centered">
              <span className="section-eyebrow">Découvrez mon approche</span>
              <h2>Une méthode qui transforme</h2>
            </div>
            <div className="vsl-wrapper">
              <iframe
                src={content.vsl_url.replace("watch?v=", "embed/")}
                title="Présentation Aicha Hatim"
                allowFullScreen
              />
            </div>
          </div>
        </section>
      )}

      {/* About snippet */}
      <section className="section">
        <div className="container">
          <div className="about-grid">
            <div className="about-image">
              {content?.about_image_url
                ? <img src={content.about_image_url} alt="Aicha Hatim" />
                : <div style={{ width:"100%", height:"100%", display:"flex", alignItems:"center", justifyContent:"center", color:"var(--text-light)" }}>Photo</div>
              }
            </div>
            <div className="about-content">
              <div className="section-header">
                <span className="section-eyebrow">À propos</span>
                <h2>Bonjour, je suis Aicha</h2>
                <div className="section-divider" />
              </div>
              <p style={{ color: "var(--text-muted)" }}>
                {content?.about_intro ?? "Coach professionnelle certifiée, j'aide les femmes ambitieuses à trouver leur voie, reprendre confiance en elles et créer une carrière alignée avec leurs valeurs."}
              </p>
              <div className="badges">
                <span className="badge">ICF Certified</span>
                <span className="badge">CTI Trained</span>
              </div>
              <Link to="/a-propos" className="btn btn-outline" style={{ alignSelf: "flex-start", marginTop: "0.5rem" }}>
                Mon parcours →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <Testimonials />

      {/* CTA Calendly */}
      <section className="section cta-section">
        <div className="container">
          <div className="cta-inner">
            <span className="section-eyebrow" style={{ color: "var(--accent)" }}>Prêt·e à changer ?</span>
            <h2>Commençons ensemble</h2>
            <p>
              Une séance découverte de 30 minutes, offerte et sans engagement, pour voir si nous sommes faites pour travailler ensemble.
            </p>
            <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className="btn btn-accent btn-lg">
              Réserver ma séance gratuite
            </a>
          </div>
        </div>
      </section>

      {/* Email capture */}
      <EmailCapture />
    </div>
  );
}