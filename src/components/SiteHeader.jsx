import { useState, useEffect } from "react";
import { Button } from "./Button";
import { Icon } from "./Icon";

const NAV = [
  { id: "home",       label: "Home" },
  { id: "about",      label: "Heritage" },
  { id: "academics",  label: "Academics" },
  { id: "faculty",    label: "Faculty" },
  { id: "admissions", label: "Admissions" },
  { id: "gallery",    label: "Campus" },
  { id: "alumni",     label: "Alumni" },
  { id: "contact",    label: "Contact" },
];

export function SiteHeader({ current, onNavigate }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const top = window.scrollY || 0;
      setScrolled(top > 20);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(top / max, 1) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const nav = (id) => { onNavigate(id); setOpen(false); };

  return (
    <header style={{ position: "sticky", top: 0, zIndex: 200 }}>
      {/* Utility bar */}
      <div style={{ background: "var(--maroon-900)", color: "var(--cream-100)" }}>
        <div className="container container--wide" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 40, fontFamily: "var(--font-sans)", fontSize: "0.86rem" }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", color: "var(--gold-300)", fontStyle: "italic", fontFamily: "var(--font-serif)" }}>
            विद्या विनयेन शोभते
          </span>
          <div style={{ display: "flex", gap: "1.4rem", alignItems: "center" }}>
            <a href="tel:04952365215" style={{ color: "var(--cream-100)", display: "inline-flex", gap: "0.4rem", alignItems: "center" }}>
              <Icon name="phone" size={14} /> 0495 236 5215
            </a>
            <span style={{ display: "inline-flex", gap: "0.4rem", alignItems: "center", opacity: 0.85 }}>
              <Icon name="map-pin" size={14} /> Mananchira, Kozhikode
            </span>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <div style={{
        background: scrolled ? "rgba(252,249,243,0.92)" : "var(--surface-card)",
        backdropFilter: scrolled ? "saturate(160%) blur(10px)" : "none",
        borderBottom: "1px solid var(--border-subtle)",
        boxShadow: scrolled ? "var(--shadow-sm)" : "none",
        transition: "box-shadow var(--dur), background var(--dur)",
      }}>
        <div className="container container--wide" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: scrolled ? 64 : 76, transition: "height var(--dur)" }}>
          <a onClick={() => nav("home")} style={{ cursor: "pointer", display: "flex", alignItems: "center" }}>
            <img src="/assets/logo-lockup.png" alt="Sri Gujarati Vidyalaya" style={{ height: scrolled ? 34 : 40, transition: "height var(--dur)" }} />
          </a>

          {/* Desktop nav */}
          <nav className="desk-nav" style={{ display: "flex", alignItems: "center", gap: "0.2rem" }}>
            {NAV.map((n) => (
              <a key={n.id} onClick={() => nav(n.id)}
                style={{ position: "relative", cursor: "pointer", padding: "0.5rem 0.95rem", fontFamily: "var(--font-sans)", fontSize: "1rem", fontWeight: 600, color: current === n.id ? "var(--maroon-800)" : "var(--ink-700)" }}
                onMouseEnter={(e) => { if (current !== n.id) e.currentTarget.style.color = "var(--maroon-700)"; }}
                onMouseLeave={(e) => { if (current !== n.id) e.currentTarget.style.color = "var(--ink-700)"; }}
              >
                {n.label}
                <span style={{
                  position: "absolute", left: "0.9rem", right: "0.9rem", bottom: "0.15rem", height: 2,
                  borderRadius: 2, background: "var(--gold-500)",
                  transform: current === n.id ? "scaleX(1)" : "scaleX(0)",
                  transformOrigin: "left", transition: "transform var(--dur) var(--ease-out)",
                }} />
              </a>
            ))}
          </nav>

          <div className="desk-nav" style={{ display: "flex" }}>
            <Button size="md" onClick={() => nav("admissions")}>Apply Now</Button>
          </div>

          <button className="burger" onClick={() => setOpen((o) => !o)} aria-label="Menu"
            style={{ display: "none", border: "none", background: "transparent", cursor: "pointer", color: "var(--maroon-800)", padding: "0.5rem", alignItems: "center", justifyContent: "center" }}>
            <Icon name={open ? "x" : "list"} size={28} />
          </button>
        </div>

        {/* Mobile nav */}
        {open && (
          <div className="mobile-nav" style={{ borderTop: "1px solid var(--border-subtle)", padding: "0.5rem var(--gutter) 1rem", background: "var(--surface-card)" }}>
            {NAV.map((n) => (
              <a key={n.id} onClick={() => nav(n.id)}
                style={{ display: "block", padding: "0.85rem 0.5rem", borderBottom: "1px solid var(--border-subtle)", fontFamily: "var(--font-sans)", fontWeight: 600, color: current === n.id ? "var(--maroon-700)" : "var(--ink-800)", cursor: "pointer" }}>
                {n.label}
              </a>
            ))}
            <div style={{ marginTop: "1rem" }}>
              <Button fullWidth onClick={() => nav("admissions")}>Apply Now</Button>
            </div>
          </div>
        )}

        {/* Scroll progress bar */}
        <div style={{ height: 2, background: "transparent", position: "relative" }}>
          <div style={{ position: "absolute", left: 0, top: 0, height: "100%", width: `${progress * 100}%`, background: "linear-gradient(90deg,var(--maroon-600),var(--gold-500))", transition: "width 80ms linear" }} />
        </div>
      </div>
    </header>
  );
}
