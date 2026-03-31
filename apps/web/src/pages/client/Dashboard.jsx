import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import ClientLayout from "../../components/ClientLayout.jsx";

export default function ClientDashboard() {
  const { client } = useAuth();

  const cards = [
    { to: "/espace-client/ressources", icon: "📄", title: "Ressources", desc: "PDF, audios et supports mis à votre disposition." },
    { to: "/espace-client/bilan", icon: "📝", title: "Bilan de compétences", desc: "Votre cahier de travail interactif." },
    { to: "/espace-client/achats", icon: "🛍", title: "Mes achats", desc: "Accédez à vos produits numériques." },
  ];

  return (
    <ClientLayout>
      <div className="client-page-title">
        <h1>Bonjour 👋</h1>
        <p style={{ color: "var(--text-muted)" }}>Bienvenue dans votre espace personnel.</p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1.25rem" }}>
        {cards.map((c) => (
          <Link key={c.to} to={c.to} style={{ textDecoration: "none" }}>
            <div className="card card-hover" style={{ height: "100%", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              <div style={{ fontSize: "2rem" }}>{c.icon}</div>
              <h3 style={{ fontSize: "1.1rem" }}>{c.title}</h3>
              <p style={{ color: "var(--text-muted)", fontSize: "0.88rem" }}>{c.desc}</p>
            </div>
          </Link>
        ))}
      </div>
    </ClientLayout>
  );
}