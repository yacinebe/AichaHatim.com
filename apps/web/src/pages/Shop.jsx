import { useQuery, useMutation } from "@tanstack/react-query";
import { api } from "../api/client.js";

export default function Shop() {
  const { data: products, isLoading } = useQuery({ queryKey: ["products"], queryFn: api.getProducts });

  const checkoutMutation = useMutation({
    mutationFn: (id) => api.checkout(id),
    onSuccess: (data) => {
      if (data?.url) window.location.href = data.url;
    },
  });

  return (
    <div className="page">
      <section className="section" style={{ background: "var(--surface-2)", paddingBottom: "3rem" }}>
        <div className="container">
          <div className="section-header centered">
            <span className="section-eyebrow">Boutique</span>
            <h1>Ressources &amp; produits</h1>
            <div className="section-divider" />
            <p style={{ color: "var(--text-muted)", textAlign: "center" }}>
              Des outils concrets pour avancer à votre rythme.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {isLoading && <div className="loading">Chargement…</div>}
          {!isLoading && !products?.length && (
            <p className="placeholder" style={{ textAlign: "center" }}>Les produits arrivent bientôt…</p>
          )}
          <div className="products-grid">
            {products?.map((p) => (
              <div key={p.id} className="card card-hover product-card">
                {p.image_url && (
                  <img src={p.image_url} alt={p.name} style={{ width: "100%", borderRadius: "var(--radius-sm)", aspectRatio: "16/9", objectFit: "cover" }} />
                )}
                <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  <h3 className="product-title">{p.name}</h3>
                  <p className="product-description">{p.description}</p>
                </div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "auto" }}>
                  <span className="product-price">{(p.price_cents / 100).toFixed(2)} €</span>
                  <button
                    className="btn btn-primary"
                    onClick={() => checkoutMutation.mutate(p.id)}
                    disabled={checkoutMutation.isPending}
                  >
                    {checkoutMutation.isPending ? "Redirection…" : "Acheter"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}