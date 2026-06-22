/* ============================================================
   Shared site chrome for the SGV website UI kit.
   Header, footer, sticky quick-actions, image helper, icons.
   Exposes everything on window for sibling babel scripts.
   ============================================================ */
const { useState, useEffect, useRef } = React;
const DS = window.SriGujaratiVidyalayaDesignSystem_89aa2a;
const { Button, Badge } = DS;

const NAV = [
  { id: "home", label: "Home" },
  { id: "about", label: "Heritage" },
  { id: "academics", label: "Academics" },
  { id: "admissions", label: "Admissions" },
  { id: "gallery", label: "Campus" },
  { id: "contact", label: "Contact" },
];

/* Real school photography (hotlinked from the live site; Img falls back gracefully) */
const IMG = {
  campus:  "https://www.srigujaratividhyalaya.com/wp-content/themes/gujarati/images/gujarati-school.jpg",
  a1:      "https://www.srigujaratividhyalaya.com/wp-content/themes/gujarati/images/progrm.jpg",
  a2:      "https://www.srigujaratividhyalaya.com/wp-content/uploads/2023/07/4-13-555x472.jpg",
  faculty: "https://www.srigujaratividhyalaya.com/wp-content/themes/gujarati/images/Faculty_.jpg",
  program: "https://www.srigujaratividhyalaya.com/wp-content/themes/gujarati/images/progrm.jpg",
  principal: "https://www.srigujaratividhyalaya.com/wp-content/uploads/2023/05/vimala-jayaraj.jpg",
  n1: "https://www.srigujaratividhyalaya.com/wp-content/uploads/2023/05/n1.jpg",
  n2: "https://www.srigujaratividhyalaya.com/wp-content/uploads/2023/05/n2.jpg",
  news_plusone: "https://www.srigujaratividhyalaya.com/wp-content/uploads/2024/06/plusone-555x555.jpeg",
  news1: "https://www.srigujaratividhyalaya.com/wp-content/uploads/2023/05/news1-555x472.jpg",
  news_mla: "https://www.srigujaratividhyalaya.com/wp-content/uploads/2023/07/1-31-555x472.jpg",
  news_yoga: "https://www.srigujaratividhyalaya.com/wp-content/uploads/2023/07/4-13-555x472.jpg",
  news_ocean: "https://www.srigujaratividhyalaya.com/wp-content/uploads/2023/07/3-18-555x472.jpg",
  news_env: "https://www.srigujaratividhyalaya.com/wp-content/uploads/2023/07/2-21-555x472.jpg",
};

/* ---- Resilient image with graceful maroon fallback ---- */
function Img({ src, alt = "", style, className, overlay }) {
  const [err, setErr] = useState(false);
  if (err || !src) {
    return (
      <div className={className} style={{
        ...style,
        background: "linear-gradient(135deg, var(--maroon-600), var(--maroon-900))",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <img src="../../assets/crest-cream.png" alt="" style={{ height: "44%", opacity: 0.32 }} />
      </div>
    );
  }
  return (
    <div className={className} style={{ position: "relative", overflow: "hidden", ...style }}>
      <img src={src} alt={alt} onError={() => setErr(true)}
        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
      {overlay && <div style={{ position: "absolute", inset: 0, background: overlay }} />}
    </div>
  );
}

function Icon({ name, weight = "regular", size = 20, style }) {
  const cls = weight === "fill" ? "ph-fill" : weight === "bold" ? "ph-bold" : "ph";
  return <i className={`${cls} ph-${name}`} style={{ fontSize: size, lineHeight: 1, ...style }} aria-hidden="true" />;
}

/* ---- Sticky top utility + main navigation ---- */
function SiteHeader({ current, onNavigate }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const top = window.scrollY || document.documentElement.scrollTop || 0;
      setScrolled(top > 20);
      const max = (document.documentElement.scrollHeight || document.body.scrollHeight) - window.innerHeight;
      setProgress(max > 0 ? Math.min(top / max, 1) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header style={{ position: "sticky", top: 0, zIndex: 200 }}>
      {/* utility bar */}
      <div style={{ background: "var(--maroon-900)", color: "var(--cream-100)" }}>
        <div className="container container--wide" style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          height: 38, fontFamily: "var(--font-sans)", fontSize: "0.78rem",
        }}>
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
      {/* main nav */}
      <div style={{
        background: scrolled ? "rgba(252,249,243,0.92)" : "var(--surface-card)",
        backdropFilter: scrolled ? "saturate(160%) blur(10px)" : "none",
        borderBottom: "1px solid var(--border-subtle)",
        boxShadow: scrolled ? "var(--shadow-sm)" : "none",
        transition: "box-shadow var(--dur), background var(--dur)",
      }}>
        <div className="container container--wide" style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          height: scrolled ? 64 : 76, transition: "height var(--dur)",
        }}>
          <a onClick={() => onNavigate("home")} style={{ cursor: "pointer", display: "flex", alignItems: "center" }}>
            <img src="../../assets/logo-lockup.png" alt="Sri Gujarati Vidyalaya" style={{ height: scrolled ? 34 : 40, transition: "height var(--dur)" }} />
          </a>
          <nav className="desk-nav" style={{ display: "flex", alignItems: "center", gap: "0.2rem" }}>
            {NAV.map((n) => (
              <a key={n.id} onClick={() => onNavigate(n.id)}
                style={{
                  position: "relative", cursor: "pointer", padding: "0.5rem 0.9rem",
                  fontFamily: "var(--font-sans)", fontSize: "0.9rem", fontWeight: 600,
                  color: current === n.id ? "var(--maroon-800)" : "var(--ink-700)",
                }}
                onMouseEnter={(e) => { if (current !== n.id) e.currentTarget.style.color = "var(--maroon-700)"; }}
                onMouseLeave={(e) => { if (current !== n.id) e.currentTarget.style.color = "var(--ink-700)"; }}>
                {n.label}
                <span style={{
                  position: "absolute", left: "0.9rem", right: "0.9rem", bottom: "0.15rem", height: 2,
                  borderRadius: 2, background: "var(--gold-500)",
                  transform: current === n.id ? "scaleX(1)" : "scaleX(0)",
                  transformOrigin: "left",
                }} />
              </a>
            ))}
          </nav>
          <div className="desk-nav" style={{ display: "flex", gap: "0.6rem", alignItems: "center" }}>
            <Button size="sm" onClick={() => onNavigate("admissions")}>Apply Now</Button>
          </div>
          <button className="burger" onClick={() => setOpen((o) => !o)} aria-label="Menu"
            style={{ display: "none", border: "none", background: "transparent", cursor: "pointer", color: "var(--maroon-800)" }}>
            <Icon name={open ? "x" : "list"} size={28} />
          </button>
        </div>
        {open && (
          <div className="mobile-nav" style={{ borderTop: "1px solid var(--border-subtle)", padding: "0.5rem var(--gutter) 1rem", background: "var(--surface-card)" }}>
            {NAV.map((n) => (
              <a key={n.id} onClick={() => { onNavigate(n.id); setOpen(false); }}
                style={{ display: "block", padding: "0.85rem 0.5rem", borderBottom: "1px solid var(--border-subtle)", fontFamily: "var(--font-sans)", fontWeight: 600, color: current === n.id ? "var(--maroon-700)" : "var(--ink-800)", cursor: "pointer" }}>{n.label}</a>
            ))}
            <div style={{ marginTop: "1rem" }}><Button fullWidth onClick={() => { onNavigate("admissions"); setOpen(false); }}>Apply Now</Button></div>
          </div>
        )}
        {/* scroll progress */}
        <div style={{ height: 2, background: "transparent", position: "relative" }}>
          <div style={{ position: "absolute", left: 0, top: 0, height: "100%", width: `${progress * 100}%`, background: "linear-gradient(90deg, var(--maroon-600), var(--gold-500))", transition: "width 80ms linear" }} />
        </div>
      </div>
    </header>
  );
}

/* ---- Floating quick actions (Apply / Enquire / WhatsApp / Top) ---- */
function QuickActions({ onNavigate }) {
  const [showTop, setShowTop] = useState(false);
  useEffect(() => {
    const onScroll = () => setShowTop((window.scrollY || 0) > 700);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const toTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  return (
    <div style={{ position: "fixed", right: "clamp(14px, 2vw, 28px)", bottom: "clamp(16px, 3vw, 32px)", zIndex: 700, display: "flex", flexDirection: "column", gap: "0.7rem", alignItems: "flex-end" }}>
      <button onClick={toTop} aria-label="Back to top" title="Back to top"
        style={{ width: 44, height: 44, borderRadius: "50%", border: "1px solid var(--border-strong)", background: "var(--surface-card)", color: "var(--maroon-800)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "var(--shadow-md)",
          opacity: showTop ? 1 : 0, transform: showTop ? "translateY(0)" : "translateY(12px)", pointerEvents: showTop ? "auto" : "none",
          transition: "opacity var(--dur) var(--ease-out), transform var(--dur) var(--ease-out)" }}>
        <Icon name="arrow-up" size={20} />
      </button>
      <a href="https://wa.me/914952365215" target="_blank" rel="noopener" title="WhatsApp"
        style={{ width: 54, height: 54, borderRadius: "50%", background: "#25D366", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "var(--shadow-lg)" }}>
        <Icon name="whatsapp-logo" weight="fill" size={28} />
      </a>
      <button onClick={() => onNavigate("admissions")} title="Admission Enquiry"
        style={{ border: "none", cursor: "pointer", padding: "0.7rem 1.1rem", borderRadius: "var(--radius-pill)", background: "var(--brand)", color: "var(--cream-50)", fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: "0.85rem", boxShadow: "var(--shadow-brand)", display: "inline-flex", gap: "0.45rem", alignItems: "center" }}>
        <Icon name="paper-plane-tilt" size={16} /> Enquire
      </button>
    </div>
  );
}

/* ---- Footer ---- */
function SiteFooter({ onNavigate }) {
  const col = (title, links) => (
    <div>
      <h4 style={{ fontFamily: "var(--font-sans)", fontSize: "0.78rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--gold-400)", fontWeight: 700, marginBottom: "1rem" }}>{title}</h4>
      <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "0.6rem" }}>
        {links.map((l) => (
          <li key={l.label}><a onClick={() => l.to && onNavigate(l.to)} style={{ color: "var(--maroon-100)", fontFamily: "var(--font-sans)", fontSize: "0.9rem", cursor: "pointer", opacity: 0.85 }}>{l.label}</a></li>
        ))}
      </ul>
    </div>
  );
  return (
    <footer style={{ background: "var(--maroon-950)", color: "var(--cream-100)", paddingTop: "var(--space-20)" }}>
      <div className="container container--wide ft-grid" style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr 1fr 1fr", gap: "var(--space-12)", paddingBottom: "var(--space-16)" }}>
        <div>
          <img src="../../assets/logo-lockup-cream.png" alt="SGV" style={{ height: 46, marginBottom: "1.2rem" }} />
          <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.92rem", lineHeight: 1.7, color: "var(--maroon-100)", maxWidth: "34ch", opacity: 0.85 }}>
            A Kerala Government recognised, English-medium co-educational school nurturing the total development of every child since 1869.
          </p>
          <div style={{ display: "flex", gap: "0.6rem", marginTop: "1.4rem" }}>
            {["facebook-logo", "instagram-logo", "youtube-logo"].map((s) => (
              <a key={s} href="#" style={{ width: 38, height: 38, borderRadius: "50%", border: "1px solid var(--border-on-dark)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--cream-100)" }}><Icon name={s} size={18} /></a>
            ))}
          </div>
        </div>
        {col("Explore", [{ label: "Heritage", to: "about" }, { label: "Academics", to: "academics" }, { label: "Facilities", to: "academics" }, { label: "Campus & Gallery", to: "gallery" }])}
        {col("Admissions", [{ label: "Apply Now", to: "admissions" }, { label: "Fees", to: "admissions" }, { label: "Affiliation", to: "about" }, { label: "Careers", to: "contact" }])}
        {col("Contact", [{ label: "0495 236 5215" }, { label: "Beach Rd, Mananchira" }, { label: "Kozhikode, Kerala 673032" }])}
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

/* ---- Reveal on scroll (fade + rise) ---- */
function Reveal({ children, delay = 0, y = 24, style, as = "div" }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    let done = false;
    const reveal = () => { if (!done) { done = true; setShown(true); } };
    const inView = () => {
      const r = node.getBoundingClientRect();
      return r.height > 0 && r.top < (window.innerHeight || 0) - 40 && r.bottom > 0;
    };
    // Poll briefly after mount so above-the-fold content reveals even if the
    // first layout frame was transient (and never triggers a scroll event).
    let tries = 0;
    const poll = setInterval(() => {
      tries += 1;
      if (inView()) { reveal(); clearInterval(poll); }
      if (tries > 12) clearInterval(poll);
    }, 110);
    // Observer handles below-the-fold content as it scrolls into view.
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { reveal(); io.disconnect(); } });
    }, { threshold: 0.12 });
    io.observe(node);
    return () => { io.disconnect(); clearInterval(poll); };
  }, []);
  const Tag = as;
  // Opacity stays 1 at all times — the entrance is transform-only so content
  // is never hidden if the document timeline is paused/throttled. The fade-like
  // rise plays in normal browsers; a stalled tab just shows content in place.
  return (
    <Tag ref={ref} style={shown ? {
      transform: "translateY(0)",
      animation: `revealUp 0.7s var(--ease-out) ${delay}ms both`,
      ...style,
    } : {
      transform: `translateY(${y}px)`,
      ...style,
    }}>{children}</Tag>
  );
}

/* ---- Section heading with gold rule (local, dark-aware) ---- */
function Kicker({ children, tone }) {
  return (
    <span className="eyebrow" style={tone === "inverse" ? { color: "var(--gold-400)" } : undefined}>
      <span style={{ width: 22, height: 1.5, background: "currentColor", display: "inline-block" }} />
      {children}
    </span>
  );
}

/* ---- Standard inner-page hero ---- */
function PageHero({ eyebrow, title, lead, image, onNavigate, crumb }) {
  return (
    <section style={{ position: "relative", overflow: "hidden", background: "var(--maroon-900)" }}>
      {image && <Img src={image} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.28 }} />}
      <img src="../../assets/crest-cream.png" alt="" style={{ position: "absolute", right: "-30px", bottom: "-40px", height: "150%", opacity: 0.06 }} />
      <div className="container container--wide" style={{ position: "relative", paddingTop: "var(--space-16)", paddingBottom: "var(--space-12)" }}>
        <div style={{ display: "flex", gap: "0.5rem", alignItems: "center", fontFamily: "var(--font-sans)", fontSize: "0.82rem", color: "var(--maroon-200)", marginBottom: "1.2rem" }}>
          <a onClick={() => onNavigate && onNavigate("home")} style={{ color: "var(--maroon-200)", cursor: "pointer" }}>Home</a>
          <Icon name="caret-right" size={12} />
          <span style={{ color: "var(--gold-300)" }}>{crumb || title}</span>
        </div>
        <Kicker tone="inverse">{eyebrow}</Kicker>
        <h1 style={{ color: "var(--cream-50)", fontWeight: 500, fontSize: "clamp(2.2rem, 1.5rem + 3vw, 3.6rem)", lineHeight: 1.05, margin: "1rem 0 0", maxWidth: "18ch", letterSpacing: "-0.02em" }}>{title}</h1>
        {lead && <p style={{ color: "var(--cream-100)", fontFamily: "var(--font-sans)", fontSize: "var(--text-lead)", marginTop: "1.2rem", maxWidth: "52ch", lineHeight: 1.6, opacity: 0.92 }}>{lead}</p>}
      </div>
    </section>
  );
}

Object.assign(window, { Img, Icon, Reveal, Kicker, PageHero, SiteHeader, SiteFooter, QuickActions, NAV, IMG });
