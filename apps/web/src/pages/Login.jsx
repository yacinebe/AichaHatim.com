import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { api } from "../api/client.js";

export default function Login() {
  const { client, checked } = useAuth();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(null); // null | "sent" | "err"
  const [loading, setLoading] = useState(false);

  if (checked && client) return <Navigate to="/espace-client" replace />;

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.requestMagicLink(email);
      setStatus("sent");
    } catch {
      setStatus("err");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-logo">Aicha Hatim</div>
        <div style={{ textAlign: "center" }}>
          <h2 style={{ fontSize: "1.4rem", marginBottom: "0.4rem" }}>Connexion à l'espace client</h2>
          <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>
            Entrez votre email pour recevoir un lien de connexion.
          </p>
        </div>

        {status === "sent" ? (
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>📬</div>
            <p style={{ fontWeight: 500, marginBottom: "0.5rem" }}>Vérifiez votre boîte mail</p>
            <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>
              Un lien de connexion a été envoyé à <strong>{email}</strong>.
              Il est valable 15 minutes.
            </p>
          </div>
        ) : (
          <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <label>
              Adresse email
              <input
                type="email"
                className="input"
                placeholder="votre@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoFocus
              />
            </label>
            {status === "err" && (
              <p className="form-error">Une erreur est survenue. Réessayez.</p>
            )}
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? "Envoi en cours…" : "Recevoir mon lien de connexion"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}