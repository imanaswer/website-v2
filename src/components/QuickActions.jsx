import { useState, useEffect } from "react";
import { Icon } from "./Icon";

export function QuickActions() {
  const [showTop, setShowTop] = useState(false);
  useEffect(() => {
    const onScroll = () => setShowTop((window.scrollY || 0) > 700);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const round = {
    width: 46, height: 46, borderRadius: "50%",
    display: "flex", alignItems: "center", justifyContent: "center",
    cursor: "pointer", transition: "transform var(--dur) var(--ease-out), background var(--dur), color var(--dur)",
  };

  return (
    <div style={{ position: "fixed", right: "clamp(14px,2vw,28px)", bottom: "clamp(16px,3vw,32px)", zIndex: 700, display: "flex", flexDirection: "column", gap: "0.6rem", alignItems: "center" }}>
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Back to top"
        onMouseEnter={(e) => { e.currentTarget.style.background = "var(--maroon-700)"; e.currentTarget.style.color = "var(--cream-50)"; }}
        onMouseLeave={(e) => { e.currentTarget.style.background = "var(--surface-card)"; e.currentTarget.style.color = "var(--maroon-800)"; }}
        style={{
          ...round, border: "1px solid var(--border-strong)",
          background: "var(--surface-card)", color: "var(--maroon-800)",
          boxShadow: "var(--shadow-sm)",
          opacity: showTop ? 1 : 0,
          transform: showTop ? "translateY(0)" : "translateY(12px)",
          pointerEvents: showTop ? "auto" : "none",
        }}
      >
        <Icon name="arrow-up" size={18} />
      </button>
      <a
        href="https://wa.me/914952365215" target="_blank" rel="noopener noreferrer" aria-label="Message us on WhatsApp"
        onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; }}
        onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; }}
        style={{ ...round, background: "var(--maroon-800)", color: "var(--cream-50)", border: "1px solid var(--maroon-800)", boxShadow: "var(--shadow-md)" }}
      >
        <Icon name="whatsapp-logo" weight="fill" size={24} />
      </a>
    </div>
  );
}
