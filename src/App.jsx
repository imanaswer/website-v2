import { useState } from "react";
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
import { ContactPage } from "./pages/ContactPage";

const PAGES = {
  home:       HomePage,
  about:      HeritagePage,
  academics:  AcademicsPage,
  faculty:    FacultyPage,
  admissions: AdmissionsPage,
  gallery:    GalleryPage,
  alumni:     AlumniPage,
  contact:    ContactPage,
};

export default function App() {
  const [page, setPage] = useState("home");

  const navigate = (id) => {
    setPage(id);
    window.scrollTo({ top: 0, behavior: "auto" });
  };

  const Current = PAGES[page] || HomePage;

  return (
    <div style={{ background: "var(--surface-page)" }}>
      <SiteHeader current={page} onNavigate={navigate} />
      <main>
        <Current onNavigate={navigate} />
      </main>
      <SiteFooter onNavigate={navigate} />
      <QuickActions onNavigate={navigate} />
    </div>
  );
}
