import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../api/client.js";
import AdminLayout from "../../components/AdminLayout.jsx";

const EMPTY = { name: "", description: "", price_cents: "", image_url: "", is_active: true };

function ProductForm({ initial, onSave, onCancel, loading }) {
  const [form, setForm] = useState(
    initial
      ? { ...initial, price_euros: (initial.price_cents / 100).toFixed(2) }
      : { ...EMPTY, price_euros: "" }
  );
  const set = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  const save = () => {
    onSave({ ...form, price_cents: Math.round(parseFloat(form.price_euros) * 100) });
  };

  return (
    <div className="admin-card">
      <h3 style={{ marginBottom: "1rem" }}>{initial ? "Modifier le produit" : "Ajouter un produit"}</h3>
      <div className="admin-form">
        <label>Nom du produit<input className="input" value={form.name} onChange={(e) => set("name", e.target.value)} required /></label>
        <label>Description<textarea className="textarea" value={form.description} onChange={(e) => set("description", e.target.value)} /></label>
        <div className="admin-grid">
          <label>Prix (€)<input className="input" type="number" step="0.01" min="0" value={form.price_euros} onChange={(e) => set("price_euros", e.target.value)} required placeholder="29.00" /></label>
          <label style={{ justifyContent: "flex-end" }}>
            <span>Actif (visible en boutique)</span>
            <input type="checkbox" checked={form.is_active} onChange={(e) => set("is_active", e.target.checked)} style={{ width: "auto", marginTop: "0.5rem" }} />
          </label>
        </div>
        <label>URL de l'image (optionnel)<input className="input" placeholder="https://…" value={form.image_url} onChange={(e) => set("image_url", e.target.value)} /></label>
        <div className="admin-actions">
          <button className="btn btn-ghost" onClick={onCancel} type="button">Annuler</button>
          <button className="btn btn-primary" onClick={save} disabled={loading || !form.name || !form.price_euros}>
            {loading ? "Sauvegarde…" : "Enregistrer"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function AdminProducts() {
  const qc = useQueryClient();
  const { data, isLoading } = useQuery({ queryKey: ["admin-products"], queryFn: api.getAdminProducts });
  const [editing, setEditing] = useState(null);

  const invalidate = () => qc.invalidateQueries({ queryKey: ["admin-products"] });
  const createMutation = useMutation({ mutationFn: api.createProduct, onSuccess: () => { invalidate(); setEditing(null); } });
  const updateMutation = useMutation({ mutationFn: ({ id, data }) => api.updateProduct(id, data), onSuccess: () => { invalidate(); setEditing(null); } });
  const deleteMutation = useMutation({ mutationFn: api.deleteProduct, onSuccess: invalidate });

  return (
    <AdminLayout>
      <div className="admin-header">
        <h1 className="admin-title">Produits</h1>
        <p style={{ color: "var(--text-muted)" }}>Gérez vos produits numériques en vente.</p>
      </div>

      {editing === "new" && <ProductForm onSave={(d) => createMutation.mutate(d)} onCancel={() => setEditing(null)} loading={createMutation.isPending} />}
      {editing && editing !== "new" && <ProductForm initial={editing} onSave={(d) => updateMutation.mutate({ id: editing.id, data: d })} onCancel={() => setEditing(null)} loading={updateMutation.isPending} />}

      {!editing && <button className="btn btn-primary" style={{ marginBottom: "1.5rem" }} onClick={() => setEditing("new")}>+ Ajouter un produit</button>}

      <div className="admin-card" style={{ padding: 0 }}>
        {isLoading && <div className="loading">Chargement…</div>}
        {!isLoading && !data?.length && <p className="placeholder" style={{ padding: "1.5rem" }}>Aucun produit pour l'instant.</p>}
        {data?.map((p) => (
          <div key={p.id} className="list-row">
            <div className="list-row-main">
              <div className="list-row-title">{p.name}</div>
              <div className="list-row-meta">
                {(p.price_cents / 100).toFixed(2)} € ·{" "}
                <span className={`badge-pill ${p.is_active ? "badge-green" : "badge-gray"}`}>{p.is_active ? "Actif" : "Inactif"}</span>
              </div>
            </div>
            <div className="list-row-actions">
              <button className="btn btn-ghost btn-sm" onClick={() => setEditing(p)}>Modifier</button>
              <button className="btn btn-ghost btn-sm btn-danger" onClick={() => { if (confirm("Supprimer ce produit ?")) deleteMutation.mutate(p.id); }}>Supprimer</button>
            </div>
          </div>
        ))}
      </div>
    </AdminLayout>
  );
}