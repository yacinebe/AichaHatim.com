import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { api } from "../api/client.js";

const CALENDLY_URL = import.meta.env.VITE_CALENDLY_URL ?? "https://calendly.com/aicha-hatim/let-s-chat";

function FaqItem({ item }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="faq-item">
      <button className="faq-question" onClick={() => setOpen(!open)}>
        {item.question}
        <svg className={`faq-chevron ${open ? "open" : ""}`} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      {open && <div className="faq-answer">{item.answer}</div>}
    </div>
  );
}

export default function FAQ() {
  const { data: faqs, isLoading } = useQuery({ queryKey: ["faq"], queryFn: api.getFaq });

  return (
    <div className="page">
      <section className="section" style={{ background: "var(--surface-2)", paddingBottom: "3rem" }}>
        <div className="container">
          <div className="section-header centered">
            <span className="section-eyebrow">Questions fréquentes</span>
            <h1>Vous avez des questions ?</h1>
            <div className="section-divider" />
            <p style={{ color: "var(--text-muted)", textAlign: "center" }}>
              J'ai rassemblé les questions que l'on me pose le plus souvent.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {isLoading && <div className="loading">Chargement…</div>}
          {!isLoading && !faqs?.length && (
            <p className="placeholder">Les questions fréquentes arrivent bientôt.</p>
          )}
          <div className="faq-list" style={{ margin: "0 auto" }}>
            {faqs?.map((f) => <FaqItem key={f.id} item={f} />)}
          </div>
        </div>
      </section>

      <section className="section cta-section">
        <div className="container">
          <div className="cta-inner">
            <h2>Vous ne trouvez pas votre réponse ?</h2>
            <p>Réservez une séance découverte gratuite, on en parle directement.</p>
            <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className="btn btn-accent btn-lg">
              Réserver une séance gratuite
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}