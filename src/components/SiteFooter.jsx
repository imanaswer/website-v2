import { Icon } from "./Icon";

export function SiteFooter({ onNavigate }) {
  const col = (title, links) => (
    <div>
      <h4 style={{ fontFamily: "var(--font-sans)", fontSize: "0.78rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--gold-400)", fontWeight: 700, marginBottom: "1rem" }}>{title}</h4>
      <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "0.6rem" }}>
        {links.map((l) => (
          <li key={l.label}>
            <a onClick={() => l.to && onNavigate(l.to)} style={{ color: "var(--maroon-100)", fontFamily: "var(--font-sans)", fontSize: "0.9rem", cursor: l.to ? "pointer" : "default", opacity: 0.85 }}>
              {l.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <footer style={{ background: "var(--maroon-950)", color: "var(--cream-100)", paddingTop: "var(--space-20)" }}>
      <div className="container container--wide ft-grid" style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr 1fr 1fr", gap: "var(--space-12)", paddingBottom: "var(--space-16)" }}>
        <div>
          <img src="/assets/logo-lockup-cream.png" alt="SGV" style={{ height: 46, marginBottom: "1.2rem" }} />
          <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.92rem", lineHeight: 1.7, color: "var(--maroon-100)", maxWidth: "34ch", opacity: 0.85 }}>
            A Kerala Government recognised, English-medium co-educational school nurturing the total development of every child since 1869.
          </p>
          <div style={{ display: "flex", gap: "0.6rem", marginTop: "1.4rem" }}>
            {["facebook-logo", "instagram-logo", "youtube-logo"].map((s) => (
              <a key={s} href="#" style={{ width: 38, height: 38, borderRadius: "50%", border: "1px solid var(--border-on-dark)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--cream-100)" }}>
                <Icon name={s} size={18} />
              </a>
            ))}
          </div>
        </div>
        {col("Explore", [
          { label: "Heritage",        to: "about" },
          { label: "Academics",       to: "academics" },
          { label: "Faculty",         to: "faculty" },
          { label: "Campus & Gallery",to: "gallery" },
          { label: "Alumni",          to: "alumni" },
        ])}
        {col("Admissions", [
          { label: "Apply Now",   to: "admissions" },
          { label: "Fees",        to: "admissions" },
          { label: "Affiliation", to: "about" },
          { label: "Careers",     to: "careers" },
        ])}
        {col("Contact", [
          { label: "0495 236 5215" },
          { label: "Beach Rd, Mananchira" },
          { label: "Kozhikode, Kerala 673032" },
        ])}
      </div>
      <div style={{ borderTop: "1px solid var(--border-on-dark)" }}>
        <div className="container container--wide" style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "0.5rem", padding: "1.4rem 0", fontFamily: "var(--font-sans)", fontSize: "0.8rem", color: "var(--maroon-200)" }}>
          <span>© 2026 Sri Gujarati Vidyalaya Higher Secondary School</span>
          <span style={{ fontStyle: "italic", fontFamily: "var(--font-serif)", color: "var(--gold-300)" }}>विद्या विनयेन शोभते</span>
        </div>
      </div>
    </footer>
  );
}
