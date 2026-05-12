import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const CALENDLY_URL = import.meta.env.VITE_CALENDLY_URL ?? "https://calendly.com/aicha-hatim/let-s-chat";

export default function Navbar() {
  const { client } = useAuth();
  const [open, setOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="navbar-logo">Aicha Hatim</Link>

        <ul className="navbar-links">
          <li><NavLink to="/">Réinvention Intérieure</NavLink></li>
          <li><NavLink to="/a-propos">Mon histoire</NavLink></li>
          <li><NavLink to="/podcast">Mon podcast</NavLink></li>
          {client
            ? <li><NavLink to="/espace-client">Espace Perso</NavLink></li>
            : <li><NavLink to="/connexion">Espace Perso</NavLink></li>
          }
          <li className="nav-cta">
            <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className="btn btn-accent btn-sm nav-cta-btn">
              Diagnostic offert
            </a>
          </li>
        </ul>

        <button className="burger" onClick={() => setOpen(!open)} aria-label="Menu">
          <span /><span /><span />
        </button>
      </div>

      {open && (
        <div className="mobile-menu">
          <NavLink to="/" onClick={() => setOpen(false)}>Réinvention Intérieure</NavLink>
          <NavLink to="/a-propos" onClick={() => setOpen(false)}>Mon histoire</NavLink>
          <NavLink to="/podcast" onClick={() => setOpen(false)}>Mon podcast</NavLink>
          {client
            ? <NavLink to="/espace-client" onClick={() => setOpen(false)}>Espace Perso</NavLink>
            : <NavLink to="/connexion" onClick={() => setOpen(false)}>Espace Perso</NavLink>
          }
          <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className="btn btn-accent nav-cta-btn">
            Diagnostic offert
          </a>
        </div>
      )}
    </nav>
  );
}
