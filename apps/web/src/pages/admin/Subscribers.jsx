import { useQuery } from "@tanstack/react-query";
import { api } from "../../api/client.js";
import AdminLayout from "../../components/AdminLayout.jsx";

export default function AdminSubscribers() {
  const { data, isLoading } = useQuery({ queryKey: ["admin-subscribers"], queryFn: api.getAdminSubscribers });

  const exportCsv = () => {
    if (!data?.length) return;
    const rows = ["Email,Source,Date", ...data.map((s) => `${s.email},${s.source ?? ""},${new Date(s.created_at).toLocaleDateString("fr-FR")}`)];
    const blob = new Blob([rows.join("\n")], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "abonnes.csv";
    a.click();
  };

  return (
    <AdminLayout>
      <div className="admin-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <h1 className="admin-title">Abonnés</h1>
          <p style={{ color: "var(--text-muted)" }}>{data?.length ?? 0} abonné(s) au total.</p>
        </div>
        <button className="btn btn-outline btn-sm" onClick={exportCsv} disabled={!data?.length}>
          Exporter CSV
        </button>
      </div>

      <div className="admin-card" style={{ padding: 0 }}>
        {isLoading && <div className="loading">Chargement…</div>}
        {!isLoading && !data?.length && <p className="placeholder" style={{ padding: "1.5rem" }}>Aucun abonné pour l'instant.</p>}
        {data?.map((s) => (
          <div key={s.id} className="list-row">
            <div className="list-row-main">
              <div className="list-row-title">{s.email}</div>
              <div className="list-row-meta">
                {s.source && <span className="badge-pill badge-gold" style={{ marginRight: "0.5rem" }}>{s.source}</span>}
                {new Date(s.created_at).toLocaleDateString("fr-FR")}
              </div>
            </div>
          </div>
        ))}
      </div>
    </AdminLayout>
  );
}
