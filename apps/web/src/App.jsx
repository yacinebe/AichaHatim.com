import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext.jsx";
import { AdminProvider, useAdmin } from "./context/AdminContext.jsx";

// Public layout
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";

// Public pages
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Podcast from "./pages/Podcast.jsx";
import FAQ from "./pages/FAQ.jsx";
import Shop from "./pages/Shop.jsx";
import Login from "./pages/Login.jsx";
import MagicLinkVerify from "./pages/MagicLinkVerify.jsx";
import PhotoPicker from "./pages/PhotoPicker.jsx";

// Client area
import ClientDashboard from "./pages/client/Dashboard.jsx";
import ClientResources from "./pages/client/Resources.jsx";
import ClientWorkbook from "./pages/client/Workbook.jsx";
import ClientPurchases from "./pages/client/Purchases.jsx";

// Admin area
import AdminLogin from "./pages/admin/Login.jsx";
import AdminDashboard from "./pages/admin/Dashboard.jsx";
import AdminPages from "./pages/admin/Pages.jsx";
import AdminTestimonials from "./pages/admin/Testimonials.jsx";
import AdminFAQ from "./pages/admin/FAQ.jsx";
import AdminPodcast from "./pages/admin/Podcast.jsx";
import AdminResources from "./pages/admin/Resources.jsx";
import AdminProducts from "./pages/admin/Products.jsx";
import AdminWorkbook from "./pages/admin/Workbook.jsx";
import AdminMedia from "./pages/admin/Media.jsx";
import AdminClients from "./pages/admin/Clients.jsx";
import AdminSubscribers from "./pages/admin/Subscribers.jsx";
import AdminSocialLinks from "./pages/admin/SocialLinks.jsx";

// ── Layouts ──────────────────────────────────────────────────────────────────

function PublicLayout() {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

// ── Guards ────────────────────────────────────────────────────────────────────

function RequireClient() {
  const { client, checked } = useAuth();
  if (!checked) return <div className="loading">Chargement…</div>;
  if (!client) return <Navigate to="/connexion" replace />;
  return <Outlet />;
}

function RequireAdmin() {
  const { isAdmin, checked } = useAdmin();
  if (!checked) return <div className="loading">Chargement…</div>;
  if (!isAdmin) return <Navigate to="/admin" replace />;
  return <Outlet />;
}

// ── App ───────────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <AuthProvider>
      <AdminProvider>
        <Routes>
          {/* Public site */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/a-propos" element={<About />} />
            <Route path="/podcast" element={<Podcast />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/boutique" element={<Shop />} />
            <Route path="/connexion" element={<Login />} />
            <Route path="/auth/verify" element={<MagicLinkVerify />} />
            <Route path="/test-photos" element={<PhotoPicker />} />
          </Route>

          {/* Client area */}
          <Route element={<RequireClient />}>
            <Route path="/espace-client" element={<ClientDashboard />} />
            <Route path="/espace-client/ressources" element={<ClientResources />} />
            <Route path="/espace-client/bilan" element={<ClientWorkbook />} />
            <Route path="/espace-client/achats" element={<ClientPurchases />} />
          </Route>

          {/* Admin area */}
          <Route path="/admin" element={<AdminLogin />} />
          <Route element={<RequireAdmin />}>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/pages" element={<AdminPages />} />
            <Route path="/admin/temoignages" element={<AdminTestimonials />} />
            <Route path="/admin/faq" element={<AdminFAQ />} />
            <Route path="/admin/podcast" element={<AdminPodcast />} />
            <Route path="/admin/ressources" element={<AdminResources />} />
            <Route path="/admin/produits" element={<AdminProducts />} />
            <Route path="/admin/workbook" element={<AdminWorkbook />} />
            <Route path="/admin/medias" element={<AdminMedia />} />
            <Route path="/admin/clients" element={<AdminClients />} />
            <Route path="/admin/abonnes" element={<AdminSubscribers />} />
            <Route path="/admin/liens-sociaux" element={<AdminSocialLinks />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AdminProvider>
    </AuthProvider>
  );
}
