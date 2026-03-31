import { NavLink, useNavigate } from "react-router-dom";
import { useAdmin } from "../context/AdminContext.jsx";
import { api } from "../api/client.js";

const links = [
  { to: "/admin/dashboard", label: "Tableau de bord", icon: "⌂" },
  { to: "/admin/pages", label: "Pages du site", icon: "📄" },
  { to: "/admin/temoignages", label: "Témoignages", icon: "💬" },
  { to: "/admin/faq", label: "FAQ", icon: "❓" },
  { to: "/admin/podcast", label: "Podcast", icon: "🎙" },
  { to: "/admin/ressources", label: "Ressources", icon: "📁" },
  { to: "/admin/produits", label: "Produits", icon: "🛍" },
  { to: "/admin/workbook", label: "Workbook", icon: "📝" },
  { to: "/admin/medias", label: "Médias", icon: "🖼" },
  { to: "/admin/clients", label: "Clients", icon: "👥" },
  { to: "/admin/abonnes", label: "Abonnés", icon: "✉️" },
  { to: "/admin/liens-sociaux", label: "Réseaux sociaux", icon: "🔗" },
];

export default function AdminLayout({ children }) {
  const navigate = useNavigate();
  const { setIsAdmin } = useAdmin();

  const logout = async () => {
    await api.adminLogout();
    setIsAdmin(false);
    navigate("/admin");
  };

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div className="admin-sidebar-title">Aicha Hatim<br /><span style={{ fontSize: "0.75rem", opacity: 0.6, fontFamily: "var(--font-ui)" }}>Administration</span></div>
        {links.map((l) => (
          <NavLink
            key={l.to}
            to={l.to}
            className={({ isActive }) => `admin-nav-link ${isActive ? "active" : ""}`}
          >
            <span style={{ marginRight: "0.5rem" }}>{l.icon}</span>{l.label}
          </NavLink>
        ))}
        <div style={{ marginTop: "auto", paddingTop: "2rem" }}>
          <button
            className="btn btn-ghost btn-sm"
            style={{ width: "100%", color: "rgba(255,255,255,0.6)" }}
            onClick={logout}
          >
            Déconnexion
          </button>
        </div>
      </aside>
      <main className="admin-main">{children}</main>
    </div>
  );
}