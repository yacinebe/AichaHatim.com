import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../api/client.js";
import AdminLayout from "../../components/AdminLayout.jsx";
import RichText from "../../components/RichText.jsx";

const PAGES = [
  { key: "home", label: "Page d'accueil" },
  { key: "about", label: "Page À propos" },
  { key: "podcast", label: "Page Podcast" },
];

function PageEditor({ pageKey, label }) {
  const qc = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ["admin-page", pageKey],
    queryFn: () => api.getAdminPage(pageKey),
  });

  const [form, setForm] = useState(null);
  const [status, setStatus] = useState(null);

  const current = form ?? data ?? {};
  const set = (k, v) => setForm((prev) => ({ ...(prev ?? data ?? {}), [k]: v }));

  const mutation = useMutation({
    mutationFn: (d) => api.updateAdminPage(pageKey, d),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin-page", pageKey] });
      qc.invalidateQueries({ queryKey: ["content", pageKey] });
      setStatus("ok");
      setTimeout(() => setStatus(null), 2500);
    },
    onError: () => setStatus("err"),
  });

  if (isLoading) return <div className="loading">Chargement…</div>;

  return (
    <div className="admin-card">
      <h2 style={{ fontSize: "1.2rem", marginBottom: "1.5rem", color: "var(--primary)" }}>{label}</h2>
      <div className="admin-form">
        {pageKey === "home" && (
          <>
            <label>Titre hero<input className="input" value={current.hero_title ?? ""} onChange={(e) => set("hero_title", e.target.value)} /></label>
            <label>Sous-titre hero<input className="input" value={current.hero_subtitle ?? ""} onChange={(e) => set("hero_subtitle", e.target.value)} /></label>
            <label>URL image hero<input className="input" placeholder="https://…" value={current.hero_image_url ?? ""} onChange={(e) => set("hero_image_url", e.target.value)} /></label>
            <label>URL vidéo VSL (YouTube)<input className="input" placeholder="https://www.youtube.com/watch?v=…" value={current.vsl_url ?? ""} onChange={(e) => set("vsl_url", e.target.value)} /></label>
            <label>Texte intro "À propos"<textarea className="textarea" value={current.about_intro ?? ""} onChange={(e) => set("about_intro", e.target.value)} /></label>
            <label>URL photo "À propos" (accueil)<input className="input" placeholder="https://…" value={current.about_image_url ?? ""} onChange={(e) => set("about_image_url", e.target.value)} /></label>
          </>
        )}
        {pageKey === "about" && (
          <>
            <label>Titre de la page<input className="input" value={current.title ?? ""} onChange={(e) => set("title", e.target.value)} /></label>
            <label>URL de la photo<input className="input" placeholder="https://…" value={current.photo_url ?? ""} onChange={(e) => set("photo_url", e.target.value)} /></label>
            <label>
              Contenu (histoire, valeurs…)
              <RichText value={current.body ?? ""} onChange={(v) => set("body", v)} />
            </label>
          </>
        )}
        {pageKey === "podcast" && (
          <>
            <label>Titre de la page<input className="input" value={current.title ?? ""} onChange={(e) => set("title", e.target.value)} /></label>
            <label>Description<textarea className="textarea" value={current.description ?? ""} onChange={(e) => set("description", e.target.value)} /></label>
            <label>Lien Spotify<input className="input" placeholder="https://open.spotify.com/…" value={current.spotify_url ?? ""} onChange={(e) => set("spotify_url", e.target.value)} /></label>
            <label>Lien Apple Podcasts<input className="input" placeholder="https://podcasts.apple.com/…" value={current.apple_url ?? ""} onChange={(e) => set("apple_url", e.target.value)} /></label>
            <label>Lien YouTube<input className="input" placeholder="https://youtube.com/…" value={current.youtube_url ?? ""} onChange={(e) => set("youtube_url", e.target.value)} /></label>
          </>
        )}

        <div className="admin-actions">
          {status === "ok" && <span className="admin-success">✓ Sauvegardé</span>}
          {status === "err" && <span className="admin-error">Erreur lors de la sauvegarde.</span>}
          <button className="btn btn-primary" onClick={() => mutation.mutate(current)} disabled={mutation.isPending}>
            {mutation.isPending ? "Sauvegarde…" : "Enregistrer"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function AdminPages() {
  const [active, setActive] = useState("home");
  const page = PAGES.find((p) => p.key === active);

  return (
    <AdminLayout>
      <div className="admin-header">
        <h1 className="admin-title">Pages du site</h1>
        <p style={{ color: "var(--text-muted)" }}>Modifiez les contenus affichés sur le site.</p>
      </div>

      <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1.5rem", flexWrap: "wrap" }}>
        {PAGES.map((p) => (
          <button key={p.key} className={`btn btn-sm ${active === p.key ? "btn-primary" : "btn-ghost"}`} onClick={() => setActive(p.key)}>
            {p.label}
          </button>
        ))}
      </div>

      <PageEditor pageKey={active} label={page?.label ?? ""} />
    </AdminLayout>
  );
}