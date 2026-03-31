import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { api } from "../../api/client.js";
import AdminLayout from "../../components/AdminLayout.jsx";

export default function AdminClients() {
  const [search, setSearch] = useState("");
  const { data, isLoading } = useQuery({
    queryKey: ["admin-clients", search],
    queryFn: () => api.getAdminClients(search),
  });

  return (
    <AdminLayout>
      <div className="admin-header">
        <h1 className="admin-title">Clients</h1>
        <p style={{ color: "var(--text-muted)" }}>Liste de toutes vos clientes inscrites.</p>
      </div>

      <div className="admin-card" style={{ marginBottom: "1.5rem", padding: "1rem" }}>
        <input
          type="search"
          className="input search-input"
          placeholder="Rechercher par email…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ maxWidth: "320px" }}
        />
      </div>

      <div className="admin-card" style={{ padding: 0 }}>
        {isLoading && <div className="loading">Chargement…</div>}
        {!isLoading && !data?.length && <p className="placeholder" style={{ padding: "1.5rem" }}>Aucun client trouvé.</p>}
        {data?.map((c) => (
          <div key={c.id} className="list-row">
            <div className="list-row-main">
              <div className="list-row-title">{c.email}</div>
              <div className="list-row-meta">
                Inscrit le {new Date(c.created_at).toLocaleDateString("fr-FR")}
                {c.purchases?.length ? ` · ${c.purchases.length} achat(s)` : ""}
              </div>
            </div>
            {c.purchases?.length > 0 && (
              <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem", alignItems: "flex-end" }}>
                {c.purchases.map((p) => (
                  <span key={p.id} className="badge-pill badge-green" style={{ fontSize: "0.72rem" }}>{p.product_name}</span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </AdminLayout>
  );
}
