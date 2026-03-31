import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { api } from "../../api/client.js";
import AdminLayout from "../../components/AdminLayout.jsx";

export default function AdminDashboard() {
  const { data: clients } = useQuery({ queryKey: ["admin-clients"], queryFn: () => api.getAdminClients() });
  const { data: subscribers } = useQuery({ queryKey: ["admin-subscribers"], queryFn: api.getAdminSubscribers });
  const { data: products } = useQuery({ queryKey: ["admin-products"], queryFn: api.getAdminProducts });
  const { data: testimonials } = useQuery({ queryKey: ["admin-testimonials"], queryFn: api.getAdminTestimonials });

  const shortcuts = [
    { to: "/admin/pages", icon: "📄", label: "Modifier les pages" },
    { to: "/admin/temoignages", icon: "💬", label: "Témoignages" },
    { to: "/admin/faq", icon: "❓", label: "FAQ" },
    { to: "/admin/podcast", icon: "🎙", label: "Podcast" },
    { to: "/admin/ressources", icon: "📁", label: "Ressources" },
    { to: "/admin/produits", icon: "🛍", label: "Produits" },
    { to: "/admin/workbook", icon: "📝", label: "Workbook" },
    { to: "/admin/liens-sociaux", icon: "🔗", label: "Réseaux sociaux" },
  ];

  return (
    <AdminLayout>
      <div className="admin-header">
        <h1 className="admin-title">Tableau de bord</h1>
        <p style={{ color: "var(--text-muted)" }}>Bienvenue dans votre espace d'administration.</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <span className="stat-label">Clients</span>
          <span className="stat-value">{clients?.length ?? "—"}</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Abonnés</span>
          <span className="stat-value">{subscribers?.length ?? "—"}</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Produits actifs</span>
          <span className="stat-value">{products?.filter((p) => p.is_active)?.length ?? "—"}</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Témoignages</span>
          <span className="stat-value">{testimonials?.length ?? "—"}</span>
        </div>
      </div>

      <h2 style={{ fontSize: "1.2rem", marginBottom: "1rem", color: "var(--primary)" }}>Accès rapide</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: "1rem" }}>
        {shortcuts.map((s) => (
          <Link key={s.to} to={s.to} style={{ textDecoration: "none" }}>
            <div className="admin-card" style={{ display: "flex", alignItems: "center", gap: "0.75rem", cursor: "pointer", transition: "box-shadow 0.2s" }}
              onMouseOver={(e) => e.currentTarget.style.boxShadow = "0 4px 16px rgba(45,74,62,0.12)"}
              onMouseOut={(e) => e.currentTarget.style.boxShadow = ""}
            >
              <span style={{ fontSize: "1.5rem" }}>{s.icon}</span>
              <span style={{ fontWeight: 500, fontSize: "0.9rem" }}>{s.label}</span>
            </div>
          </Link>
        ))}
      </div>
    </AdminLayout>
  );
}