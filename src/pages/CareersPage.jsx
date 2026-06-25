import { Icon } from "../components/Icon";
import { Reveal } from "../components/Reveal";
import { PageHero } from "../components/PageHero";
import { TextLink, Label } from "../components/Ed";
import { useApi } from "../lib/useApi";
import { slugify } from "../../shared/meta/index.js";

const HERO = "https://www.srigujaratividhyalaya.com/wp-content/themes/gujarati/images/Faculty_.jpg";

/* Vacancies are managed in the admin panel (/admin/jobs) — published roles
 * appear here; when there are none, the "no current openings" state shows. */
function fmtDate(d) {
  if (!d) return "";
  const date = new Date(d);
  return Number.isNaN(date.getTime()) ? "" : date.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric", timeZone: "UTC" });
}

function Why() {
  const reasons = [
    { icon: "buildings",  t: "A heritage institution", d: "Teach at a school that has educated Kozhikode since 1869 — backed by a long-standing charitable Association." },
    { icon: "tree",       t: "A serene campus",        d: "An eco-friendly campus near Mananchira, with laboratories, library, sport and the open air." },
    { icon: "users-three", t: "A school that knows its children", d: "Small enough to know every child, with a culture of warmth, rigour and humility." },
  ];
  return (
    <section className="section">
      <div className="container container--wide">
        <div className="ed-split" style={{ display: "grid", gridTemplateColumns: "3fr 8fr", gap: "var(--space-16)" }}>
          <aside className="ed-aside" style={{ position: "sticky", top: 110, alignSelf: "start" }}>
            <Reveal>
              <Label>Why Teach Here</Label>
              <div className="rule--gold" style={{ margin: "1.1rem 0" }} />
            </Reveal>
          </aside>
          <div>
            <Reveal>
              <p className="dropcap measure" style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.3rem,1.05rem + 1vw,1.75rem)", lineHeight: 1.5, color: "var(--text-primary)" }}>
                We are always glad to hear from good teachers. To join Sri Gujarati Vidyalaya is to
                step into a 150-year tradition of learning — and to help carry it forward.
              </p>
            </Reveal>
            <div className="index-list" style={{ marginTop: "var(--space-12)" }}>
              {reasons.map((r, i) => (
                <Reveal key={r.t} delay={i * 70}>
                  <div className="index-row ed-index-row" style={{ display: "grid", gridTemplateColumns: "auto 4fr 6fr", gap: "1.5rem", padding: "clamp(1.5rem,2.5vw,2.1rem) 0", alignItems: "baseline" }}>
                    <Icon name={r.icon} size={24} style={{ color: "var(--gold-600)" }} />
                    <h3 style={{ fontSize: "clamp(1.3rem,1.1rem + 0.8vw,1.8rem)", fontWeight: 400 }}>{r.t}</h3>
                    <p className="ed-index-desc" style={{ fontFamily: "var(--font-sans)", fontSize: "1.12rem", lineHeight: 1.7, color: "var(--text-secondary)", maxWidth: "44ch" }}>{r.d}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Openings({ onNavigate }) {
  const { data } = useApi("jobs");
  const vacancies = Array.isArray(data) ? data : [];
  return (
    <section className="section" style={{ background: "var(--surface-raised)" }}>
      <div className="container container--wide">
        <Reveal>
          <div style={{ display: "flex", alignItems: "baseline", gap: "1.2rem", marginBottom: "var(--space-10)" }}>
            <Label>Open Positions</Label>
            <span className="rule" style={{ flex: 1 }} />
          </div>
        </Reveal>

        {vacancies.length === 0 ? (
          <Reveal>
            <div style={{ padding: "clamp(2rem,4vw,3.5rem) 0", maxWidth: "52ch" }}>
              <h2 style={{ fontSize: "clamp(1.6rem,1.2rem + 1.4vw,2.4rem)", fontWeight: 400, marginBottom: "1rem" }}>
                No current openings.
              </h2>
              <p style={{ fontFamily: "var(--font-sans)", fontSize: "1.18rem", lineHeight: 1.7, color: "var(--text-secondary)", marginBottom: "1.8rem" }}>
                We don't have a vacancy listed right now — but we always welcome applications from
                dedicated teachers. Do get in touch and we'll keep your details on file.
              </p>
              <TextLink onClick={() => onNavigate("contact")}>Send us your CV</TextLink>
            </div>
          </Reveal>
        ) : (
          <div className="index-list">
            {vacancies.map((v) => {
              const to = `/careers/${slugify(v.role)}-${v.id}`;
              return (
              <Reveal key={v.id} delay={0}>
                <div
                  onClick={() => onNavigate(to)}
                  onMouseEnter={(e) => { e.currentTarget.querySelector(".ed-role").style.color = "var(--maroon-800)"; }}
                  onMouseLeave={(e) => { e.currentTarget.querySelector(".ed-role").style.color = "var(--text-primary)"; }}
                  className="index-row ed-index-row"
                  style={{ cursor: "pointer", display: "grid", gridTemplateColumns: "6fr 4fr auto", gap: "clamp(1rem,3vw,2.4rem)", padding: "clamp(1.6rem,2.8vw,2.4rem) 0", alignItems: "center" }}
                >
                  <div>
                    <h3 className="ed-role" style={{ fontSize: "clamp(1.4rem,1.1rem + 1vw,2rem)", fontWeight: 400, transition: "color var(--dur)" }}>{v.role}</h3>
                    <div className="label" style={{ marginTop: "0.55rem", color: "var(--gold-700)" }}>{v.department}</div>
                  </div>
                  <div className="ed-index-desc" style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                    <span style={{ fontFamily: "var(--font-sans)", fontSize: "1.05rem", color: "var(--text-secondary)" }}>{[v.type, v.location].filter(Boolean).join(" · ")}</span>
                    {fmtDate(v.closes_on) && <span className="label" style={{ color: "var(--text-muted)" }}>Closes {fmtDate(v.closes_on)}</span>}
                  </div>
                  <TextLink onClick={(e) => { e.stopPropagation(); onNavigate(to); }}>View role</TextLink>
                </div>
              </Reveal>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

function Apply({ onNavigate }) {
  return (
    <section className="section">
      <div className="container container--wide">
        <Reveal>
          <div className="ed-2col" style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: "var(--space-12)", alignItems: "center", borderTop: "1px solid var(--border-strong)", borderBottom: "1px solid var(--border-strong)", padding: "clamp(2.5rem,5vw,4.5rem) 0" }}>
            <div>
              <Label>How to Apply</Label>
              <h2 style={{ fontSize: "clamp(1.8rem,1.3rem + 2vw,3rem)", fontWeight: 400, margin: "1rem 0 0", maxWidth: "20ch", lineHeight: 1.1 }}>
                Send us your CV and a short covering letter.
              </h2>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "1.1rem", alignItems: "flex-start" }}>
              <TextLink onClick={() => onNavigate("contact")}>Get in touch</TextLink>
              <a href="tel:04952365215" style={{ display: "inline-flex", alignItems: "center", gap: "0.6rem", fontFamily: "var(--font-mono)", fontSize: "1rem", color: "var(--text-secondary)", letterSpacing: "0.02em" }}>
                <Icon name="phone" size={16} style={{ color: "var(--maroon-700)" }} /> 0495 236 5215
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function CareersPage({ onNavigate }) {
  return (
    <div>
      <PageHero onNavigate={onNavigate} crumb="Careers" eyebrow="Careers"
        title="Teach where learning is a celebration"
        lead="Join the faculty of a 150-year-old institution in the heart of Kozhikode — and help shape the next generation of learners."
        image={HERO} />
      <Why />
      <Openings onNavigate={onNavigate} />
      <Apply onNavigate={onNavigate} />
    </div>
  );
}
