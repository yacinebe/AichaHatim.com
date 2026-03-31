import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { api } from "../../api/client.js";
import ClientLayout from "../../components/ClientLayout.jsx";

export default function ClientPurchases() {
  // Purchases come from getMe extended data or a dedicated endpoint
  const { data: me, isLoading } = useQuery({ queryKey: ["me"], queryFn: api.getMe });

  const purchases = me?.purchases ?? [];

  return (
    <ClientLayout>
      <div className="client-page-title">
        <h1>Mes achats</h1>
        <p style={{ color: "var(--text-muted)" }}>Vos produits numériques achetés.</p>
      </div>

      {isLoading && <div className="loading">Chargement…</div>}

      {!isLoading && !purchases.length && (
        <div style={{ textAlign: "center", padding: "3rem 0" }}>
          <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🛍</div>
          <p style={{ color: "var(--text-muted)", marginBottom: "1.5rem" }}>Vous n'avez pas encore effectué d'achat.</p>
          <Link to="/boutique" className="btn btn-primary">Découvrir la boutique</Link>
        </div>
      )}

      <div className="resources-list">
        {purchases.map((p) => (
          <div key={p.id} className="resource-row">
            <span className="resource-icon">📦</span>
            <div className="resource-info">
              <div className="resource-title">{p.product_name}</div>
              <div className="resource-description">
                Acheté le {new Date(p.purchased_at).toLocaleDateString("fr-FR")} · {(p.amount_cents / 100).toFixed(2)} €
              </div>
            </div>
            <span className="badge-pill badge-green">Accès actif</span>
          </div>
        ))}
      </div>
    </ClientLayout>
  );
}