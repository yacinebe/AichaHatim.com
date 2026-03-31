import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const links = [
  { to: "/espace-client", label: "Accueil", icon: "⌂", end: true },
  { to: "/espace-client/ressources", label: "Ressources", icon: "📄" },
  { to: "/espace-client/bilan", label: "Bilan de compétences", icon: "📝" },
  { to: "/espace-client/achats", label: "Mes achats", icon: "🛍" },
];

export default function ClientLayout({ children }) {
  const { client, logout } = useAuth();

  return (
    <div className="client-layout">
      <aside className="client-sidebar">
        <div style={{ padding: "0 0.5rem 1.5rem", borderBottom: "1px solid var(--border)", marginBottom: "1rem" }}>
          <p style={{ fontWeight: 500, fontSize: "0.9rem" }}>{client?.email}</p>
          <p style={{ color: "var(--text-muted)", fontSize: "0.78rem" }}>Espace client</p>
        </div>
        {links.map((l) => (
          <NavLink
            key={l.to}
            to={l.to}
            end={l.end}
            className={({ isActive }) => `sidebar-link ${isActive ? "active" : ""}`}
          >
            <span>{l.icon}</span>
            {l.label}
          </NavLink>
        ))}
        <div style={{ marginTop: "auto", paddingTop: "2rem" }}>
          <button className="btn btn-ghost btn-sm" style={{ width: "100%" }} onClick={logout}>
            Se déconnecter
          </button>
        </div>
      </aside>
      <main className="client-main">{children}</main>
    </div>
  );
}