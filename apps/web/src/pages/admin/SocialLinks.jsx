import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../api/client.js";
import AdminLayout from "../../components/AdminLayout.jsx";

const PLATFORMS = [
  { key: "instagram", label: "Instagram", icon: "📷", placeholder: "https://www.instagram.com/…" },
  { key: "linkedin", label: "LinkedIn", icon: "💼", placeholder: "https://www.linkedin.com/in/…" },
  { key: "youtube", label: "YouTube", icon: "▶", placeholder: "https://www.youtube.com/@…" },
  { key: "calendly", label: "Calendly (lien réservation)", icon: "📅", placeholder: "https://calendly.com/…" },
];

export default function AdminSocialLinks() {
  const qc = useQueryClient();
  const { data, isLoading } = useQuery({ queryKey: ["admin-social-links"], queryFn: api.getAdminSocialLinks });
  const [form, setForm] = useState({});
  const [status, setStatus] = useState(null);

  useEffect(() => {
    if (data) {
      const map = {};
      data.forEach((l) => { map[l.platform] = l.url; });
      setForm(map);
    }
  }, [data]);

  const mutation = useMutation({
    mutationFn: (links) => api.updateSocialLinks(links),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin-social-links"] });
      qc.invalidateQueries({ queryKey: ["social-links"] });
      setStatus("ok");
      setTimeout(() => setStatus(null), 2500);
    },
    onError: () => setStatus("err"),
  });

  const save = () => {
    const links = Object.entries(form)
      .filter(([, url]) => url?.trim())
      .map(([platform, url]) => ({ platform, url: url.trim() }));
    mutation.mutate(links);
  };

  if (isLoading) return <AdminLayout><div className="loading">Chargement…</div></AdminLayout>;

  return (
    <AdminLayout>
      <div className="admin-header">
        <h1 className="admin-title">Réseaux sociaux</h1>
        <p style={{ color: "var(--text-muted)" }}>Ces liens apparaissent dans le footer du site et sur les boutons CTA.</p>
      </div>

      <div className="admin-card">
        <div className="admin-form">
          {PLATFORMS.map((p) => (
            <label key={p.key}>
              <span style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}><span>{p.icon}</span>{p.label}</span>
              <input
                className="input"
                type="url"
                placeholder={p.placeholder}
                value={form[p.key] ?? ""}
                onChange={(e) => setForm((prev) => ({ ...prev, [p.key]: e.target.value }))}
              />
            </label>
          ))}

          <div className="admin-actions">
            {status === "ok" && <span className="admin-success">✓ Sauvegardé</span>}
            {status === "err" && <span className="admin-error">Erreur lors de la sauvegarde.</span>}
            <button className="btn btn-primary" onClick={save} disabled={mutation.isPending}>
              {mutation.isPending ? "Sauvegarde…" : "Enregistrer"}
            </button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
