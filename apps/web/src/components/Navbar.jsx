import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const CALENDLY_URL = import.meta.env.VITE_CALENDLY_URL ?? "#";

export default function Navbar() {
  const { client } = useAuth();
  const [open, setOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="navbar-logo">Aicha Hatim</Link>

        <ul className="navbar-links">
          <li><NavLink to="/a-propos">À propos</NavLink></li>
          <li><NavLink to="/podcast">Podcast</NavLink></li>
          <li><NavLink to="/faq">FAQ</NavLink></li>
          <li><NavLink to="/boutique">Boutique</NavLink></li>
          {client
            ? <li><NavLink to="/espace-client">Mon espace</NavLink></li>
            : <li><NavLink to="/connexion">Connexion</NavLink></li>
          }
          <li className="nav-cta">
            <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm">
              Séance découverte
            </a>
          </li>
        </ul>

        <button className="burger" onClick={() => setOpen(!open)} aria-label="Menu">
          <span /><span /><span />
        </button>
      </div>

      {open && (
        <div className="mobile-menu" onClick={() => setOpen(false)}>
          <NavLink to="/a-propos">À propos</NavLink>
          <NavLink to="/podcast">Podcast</NavLink>
          <NavLink to="/faq">FAQ</NavLink>
          <NavLink to="/boutique">Boutique</NavLink>
          {client
            ? <NavLink to="/espace-client">Mon espace</NavLink>
            : <NavLink to="/connexion">Connexion</NavLink>
          }
          <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
            Séance découverte
          </a>
        </div>
      )}
    </nav>
  );
}