# AichaHatim.com — Requirements & Build Plan

## Project Overview

French-language professional coaching website for **Aicha Hatim**.
Built as a Turborepo monorepo (`apps/web` = React + Vite, `apps/api` = Fastify + PostgreSQL).

**Three pillars:**
1. **Site vitrine** — site marketing pour prospects (conversion, confiance, vente)
2. **Espace client** — ressources réservées aux clients existants
3. **Admin portal** — Aicha gère tout le contenu seule, sans développeur

---

## Design Direction

| Token | Value |
|-------|-------|
| Background | `#faf7f2` (crème chaud) |
| Primary | `#2d4a3e` (vert forêt profond) |
| Accent | `#c9a96e` (or doux) |
| Heading font | Cormorant Garamond (serif, élégant) |
| Body font | Inter (propre, lisible) |
| Style | Généreux whitespace, photographie pro au premier plan |
| Animations | Hover subtils, animations retenues (fade-in au scroll) |

**Références principales :**
- [coachingwithkrista.com](https://www.coachingwithkrista.com/) — tonalité chaude, connexion émotionnelle, typographie serif
- [amyporterfield.com](https://www.amyporterfield.com/) — sticky nav, carrousel de témoignages, inscription newsletter
- [liveasyouwellness.com/intuitive-eating-coaching](https://www.liveasyouwellness.com/intuitive-eating-coaching) — structure problème → solution → témoignages, FAQ accordéon

---

## Site Structure & Pages

### PUBLIC (non authentifié)

#### 1. Page d'accueil (`/`)
- **Hero** : grande photo pro, headline fort, sous-titre positionnement, CTA "Réserver une séance découverte" (Calendly)
- **VSL** : lecteur vidéo intégré (YouTube embed)
- **Qui est Aicha** : extrait "À propos" avec photo, lien vers page complète
- **Témoignages** : carrousel (texte + vidéo YouTube)
- **Présentation de l'offre** : cards des services principaux
- **CTA Calendly** : section dédiée répétée
- **Instagram feed** : grille des dernières publications
- **Inscription email** : capture email (accès ressources / webinaires)
- **Footer** : liens réseaux sociaux, navigation, mentions légales

#### 2. À propos (`/a-propos`)
- Histoire personnelle d'Aicha
- Approche et valeurs
- Certifications : badges ICF + CTI
- Photo professionnelle
- CTA Calendly

#### 3. Podcast (`/podcast`)
- Présentation du concept et de l'émission
- Lecteur intégré (Spotify / Apple Podcasts / YouTube / Podbean)
- Liste des épisodes (depuis le CMS)
- CTA inscription email

#### 4. FAQ (`/faq`)
- Accordéon dynamique
- Géré via le CMS admin

#### 5. Boutique (`/boutique`)
- Grille des produits numériques
- Page détail produit
- Checkout Stripe

#### 6. Contact / Réserver (`/contact`)
- CTA Calendly embedded
- Liens réseaux sociaux

---

### ESPACE CLIENT (authentifié — magic link)

#### 7. Connexion (`/connexion`)
- Formulaire "Entrez votre email"
- Réception d'un magic link par email
- Redirection vers le dashboard

#### 8. Dashboard client (`/espace-client`)
- Vue d'ensemble : ressources disponibles, progression workbook
- Liens vers les sections

#### 9. Ressources (`/espace-client/ressources`)
- PDF et ressources audio hébergés
- Filtrage par catégorie
- Téléchargement sécurisé

#### 10. Cahier de bilan de compétences (`/espace-client/bilan`)
- Workbook interactif (sections + questions)
- Réponses sauvegardées automatiquement
- Progression visible

#### 11. Mes achats (`/espace-client/achats`)
- Historique des produits achetés
- Accès aux contenus débloqués

---

### ADMIN PORTAL (authentifié — mot de passe)

#### 12. Connexion admin (`/admin`)
- Login mot de passe

#### 13. Dashboard admin (`/admin/dashboard`)
- Vue d'ensemble rapide

#### 14. Gestion des pages (`/admin/pages`)
- Éditeur rich text pour : Accueil, À propos, Podcast
- Upload de photos

#### 15. Témoignages (`/admin/temoignages`)
- Ajouter / modifier / supprimer / réordonner
- Texte + URL vidéo YouTube

#### 16. FAQ (`/admin/faq`)
- Ajouter / modifier / supprimer / réordonner

#### 17. Podcast (`/admin/podcast`)
- Ajouter / modifier / supprimer des épisodes
- Titre, description, URL lecteur, date

#### 18. Ressources (`/admin/ressources`)
- Upload PDF / audio
- Gérer accès (public vs client)

#### 19. Produits (`/admin/produits`)
- Créer / modifier / supprimer produits
- Prix, description, image, actif/inactif

#### 20. Workbook (`/admin/workbook`)
- Créer / modifier sections et questions du bilan

#### 21. Médias (`/admin/medias`)
- Bibliothèque de fichiers uploadés

#### 22. Clients (`/admin/clients`)
- Liste des clients inscrits
- Historique d'achats

#### 23. Abonnés (`/admin/abonnes`)
- Liste emails collectés

#### 24. Liens sociaux (`/admin/liens-sociaux`)
- Mettre à jour Instagram, LinkedIn, YouTube, Calendly

---

## Key Features Summary

| Feature | Notes |
|---------|-------|
| Magic link auth (clients) | Email → lien → session |
| Admin password auth | Bcrypt + JWT cookie |
| Stripe checkout | Produits numériques |
| Stripe webhooks | Enregistrement des achats |
| Email via Resend | Magic links + confirmation inscription |
| Rich text editor | TipTap dans l'admin |
| Drag & drop reorder | dnd-kit pour témoignages, FAQ, podcast |
| File uploads | PDF, audio, images (50MB max) |
| Instagram feed | Intégration grille dernières publications |
| Calendly | Bouton/embed pour séance découverte |
| Podcast player | Intégration Spotify / Apple / YouTube |
| Responsive | Mobile-first |
| Langue | Tout en français |

---

## Current Build Status

| Layer | Status | Notes |
|-------|--------|-------|
| API (Fastify) | ✅ 95% done | Toutes les routes, auth, Stripe |
| Base de données | ✅ 100% done | 13 tables + seed data |
| CSS design system | ✅ 100% done | 843 lignes dans main.css |
| Contextes auth | ✅ Done | AuthContext, AdminContext |
| API client lib | ✅ Done | 44 méthodes dans api/client.js |
| App.jsx + routing | ❌ À faire | Fichier manquant |
| Pages publiques | ❌ À faire | Aucune page créée |
| Composants UI | ❌ À faire | Navbar, Footer, etc. |
| Pages espace client | ❌ À faire | |
| Pages admin | ❌ À faire | |

---

## Build Order (suggested)

1. `App.jsx` + React Router structure (toutes les routes déclarées)
2. Composants partagés : `Navbar`, `Footer`
3. Page d'accueil (Home)
4. À propos
5. Podcast
6. FAQ
7. Boutique + page produit + checkout
8. Connexion client + magic link flow
9. Dashboard client + Ressources + Workbook + Achats
10. Admin login + toutes les pages admin
