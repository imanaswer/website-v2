import { useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { SiteHeader } from "./components/SiteHeader";
import { SiteFooter } from "./components/SiteFooter";
import { QuickActions } from "./components/QuickActions";
import { HomePage } from "./pages/HomePage";
import { HeritagePage } from "./pages/HeritagePage";
import { AcademicsPage } from "./pages/AcademicsPage";
import { FacultyPage } from "./pages/FacultyPage";
import { AdmissionsPage } from "./pages/AdmissionsPage";
import { GalleryPage } from "./pages/GalleryPage";
import { AlumniPage } from "./pages/AlumniPage";
import { CareersPage } from "./pages/CareersPage";
import { JobDetailPage } from "./pages/JobDetailPage";
import { ContactPage } from "./pages/ContactPage";
import { AdminApp } from "./admin/AdminApp.jsx";

/* The pages were built around onNavigate(id); we keep that API and back it with
 * the router, so each navigation item maps to a real URL. */
const ID_TO_PATH = {
  home: "/", about: "/heritage", academics: "/academics", faculty: "/faculty",
  admissions: "/admissions", gallery: "/campus", alumni: "/alumni",
  careers: "/careers", contact: "/contact",
};
const PATH_TO_ID = Object.fromEntries(Object.entries(ID_TO_PATH).map(([id, p]) => [p, id]));

function PublicSite() {
  const navigate = useNavigate();
  const location = useLocation();
  const current = PATH_TO_ID[location.pathname] || (location.pathname.startsWith("/careers") ? "careers" : "home");

  const onNavigate = (id) => navigate(typeof id === "string" && id.startsWith("/") ? id : ID_TO_PATH[id] || "/");

  useEffect(() => { window.scrollTo({ top: 0, behavior: "auto" }); }, [location.pathname]);

  return (
    <div style={{ background: "var(--surface-page)" }}>
      <SiteHeader current={current} onNavigate={onNavigate} />
      <main>
        <Routes>
          <Route path="/" element={<HomePage onNavigate={onNavigate} />} />
          <Route path="/heritage" element={<HeritagePage onNavigate={onNavigate} />} />
          <Route path="/academics" element={<AcademicsPage onNavigate={onNavigate} />} />
          <Route path="/faculty" element={<FacultyPage onNavigate={onNavigate} />} />
          <Route path="/admissions" element={<AdmissionsPage onNavigate={onNavigate} />} />
          <Route path="/campus" element={<GalleryPage onNavigate={onNavigate} />} />
          <Route path="/alumni" element={<AlumniPage onNavigate={onNavigate} />} />
          <Route path="/careers" element={<CareersPage onNavigate={onNavigate} />} />
          <Route path="/careers/:slug" element={<JobDetailPage onNavigate={onNavigate} />} />
          <Route path="/contact" element={<ContactPage onNavigate={onNavigate} />} />
          <Route path="*" element={<HomePage onNavigate={onNavigate} />} />
        </Routes>
      </main>
      <SiteFooter onNavigate={onNavigate} />
      <QuickActions />
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/admin/*" element={<AdminApp />} />
      <Route path="/*" element={<PublicSite />} />
    </Routes>
  );
}
