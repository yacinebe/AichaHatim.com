import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { useAdmin } from "../../context/AdminContext.jsx";
import { api } from "../../api/client.js";

export default function AdminLogin() {
  const { isAdmin, checked, setIsAdmin } = useAdmin();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  if (checked && isAdmin) return <Navigate to="/admin/dashboard" replace />;

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await api.adminLogin(password);
      setIsAdmin(true);
      navigate("/admin/dashboard");
    } catch {
      setError("Mot de passe incorrect.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-logo">Aicha Hatim</div>
        <div style={{ textAlign: "center" }}>
          <h2 style={{ fontSize: "1.3rem", marginBottom: "0.3rem" }}>Administration</h2>
          <p style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>Accès réservé</p>
        </div>
        <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <label>
            Mot de passe
            <input
              type="password"
              className="input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoFocus
            />
          </label>
          {error && <p className="form-error">{error}</p>}
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? "Connexion…" : "Se connecter"}
          </button>
        </form>
      </div>
    </div>
  );
}