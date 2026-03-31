import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { api } from "../api/client.js";

export default function MagicLinkVerify() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const { setClient } = useAuth();
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = params.get("token");
    if (!token) { setError("Lien invalide."); return; }

    fetch(`${import.meta.env.VITE_API_URL ?? "http://localhost:3001"}/auth/verify?token=${token}`, {
      credentials: "include",
    })
      .then((r) => r.json())
      .then((data) => {
        if (data?.client) {
          setClient(data.client);
          navigate("/espace-client", { replace: true });
        } else {
          setError("Lien expiré ou invalide.");
        }
      })
      .catch(() => setError("Une erreur est survenue."));
  }, []);

  if (error) {
    return (
      <div className="login-page">
        <div className="login-card" style={{ textAlign: "center" }}>
          <div style={{ fontSize: "2.5rem" }}>⚠️</div>
          <h2>Lien invalide</h2>
          <p style={{ color: "var(--text-muted)" }}>{error}</p>
          <button className="btn btn-primary" onClick={() => navigate("/connexion")}>
            Réessayer
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="login-page">
      <div className="login-card" style={{ textAlign: "center" }}>
        <div className="loading">Connexion en cours…</div>
      </div>
    </div>
  );
}