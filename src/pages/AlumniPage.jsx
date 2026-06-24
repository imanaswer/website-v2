import { Icon } from "../components/Icon";
import { Img } from "../components/Img";
import { Reveal } from "../components/Reveal";
import { PageHero } from "../components/PageHero";
import { TextLink, Label } from "../components/Ed";
import { useApi } from "../lib/useApi";

const HERO = "https://www.srigujaratividhyalaya.com/wp-content/uploads/2023/07/4-13-555x472.jpg";

function Silhouette() {
  return (
    <div className="photo-frame" style={{ aspectRatio: "1/1", width: "clamp(72px,9vw,96px)", flexShrink: 0, background: "var(--surface-sunken)", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "50%", overflow: "hidden" }}>
      <Icon name="user" size={36} style={{ color: "var(--sand-400)" }} />
    </div>
  );
}

function Intro() {
  return (
    <section className="section">
      <div className="container container--wide">
        <div className="ed-split" style={{ display: "grid", gridTemplateColumns: "3fr 8fr", gap: "var(--space-16)" }}>
          <aside className="ed-aside" style={{ position: "sticky", top: 110, alignSelf: "start" }}>
            <Reveal>
              <Label>Our Alumni</Label>
              <div className="rule--gold" style={{ margin: "1.1rem 0" }} />
            </Reveal>
          </aside>
          <div>
            <Reveal>
              <p className="dropcap measure" style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.3rem,1.05rem + 1vw,1.75rem)", lineHeight: 1.5, color: "var(--text-primary)" }}>
                For over a century and a half, students have left these gates carrying the school's
                values out into the world. This is where their stories will live — the doctors,
                teachers, entrepreneurs and citizens who began here.
              </p>
            </Reveal>
            <Reveal delay={90}>
              <p className="measure" style={{ fontFamily: "var(--font-sans)", fontSize: "1.18rem", lineHeight: 1.75, color: "var(--text-secondary)", marginTop: "1.8rem" }}>
                We are building our alumni network. If you studied at Sri Gujarati Vidyalaya, we would
                love to hear where life has taken you — and to feature your story here.
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

function AlumniGrid() {
  const { data } = useApi("alumni");
  const alumni = Array.isArray(data) ? data : [];
  // Until real alumni are added in the admin, show only the intro + CTA.
  if (alumni.length === 0) return null;
  return (
    <section className="section" style={{ background: "var(--surface-raised)" }}>
      <div className="container container--wide">
        <Reveal>
          <div style={{ display: "flex", alignItems: "baseline", gap: "1.2rem", marginBottom: "var(--space-10)" }}>
            <Label>In Their Words</Label>
            <span className="rule" style={{ flex: 1 }} />
          </div>
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(330px, 1fr))", gap: "clamp(1.6rem,3vw,2.8rem)" }}>
          {alumni.map((a, i) => (
            <Reveal key={a.id ?? i} delay={(i % 3) * 70}>
              <div style={{ display: "flex", flexDirection: "column", gap: "1.2rem", paddingTop: "1.8rem", borderTop: "1px solid var(--border-subtle)", height: "100%" }}>
                {a.quote && (
                  <p style={{ fontFamily: "var(--font-serif)", fontSize: "1.35rem", lineHeight: 1.45, color: "var(--text-primary)", fontStyle: "italic" }}>
                    &ldquo;{a.quote}&rdquo;
                  </p>
                )}
                <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginTop: "auto" }}>
                  {a.photo_url ? (
                    <div className="photo photo-frame" style={{ width: "clamp(72px,9vw,96px)", aspectRatio: "1/1", flexShrink: 0, borderRadius: "50%", overflow: "hidden" }}>
                      <Img src={a.photo_url} alt={a.name} style={{ width: "100%", height: "100%" }} />
                    </div>
                  ) : (
                    <Silhouette />
                  )}
                  <div>
                    <div style={{ fontFamily: "var(--font-serif)", fontSize: "1.15rem", color: "var(--text-primary)" }}>{a.name}</div>
                    <div className="label" style={{ marginTop: "0.3rem" }}>{[a.role, a.batch_year && `Batch ${a.batch_year}`].filter(Boolean).join(" · ")}</div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function AlumniCTA({ onNavigate }) {
  return (
    <section className="section">
      <div className="container container--wide">
        <Reveal>
          <div className="ed-2col" style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: "var(--space-12)", alignItems: "center", borderTop: "1px solid var(--border-strong)", borderBottom: "1px solid var(--border-strong)", padding: "clamp(2.5rem,5vw,4.5rem) 0" }}>
            <div>
              <Label>Join the Network</Label>
              <h2 style={{ fontSize: "clamp(1.8rem,1.3rem + 2vw,3rem)", fontWeight: 400, margin: "1rem 0 0", maxWidth: "18ch", lineHeight: 1.1 }}>
                Are you an alumnus? Get in touch.
              </h2>
            </div>
            <div>
              <TextLink onClick={() => onNavigate("contact")}>Share your story</TextLink>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function AlumniPage({ onNavigate }) {
  return (
    <div>
      <PageHero onNavigate={onNavigate} crumb="Alumni" eyebrow="Alumni"
        title="Where our students go next"
        lead="The Sri Gujarati Vidyalaya community reaches far beyond Mananchira. We are gathering the stories of those who began their journey here."
        image={HERO} />
      <Intro />
      <AlumniGrid />
      <AlumniCTA onNavigate={onNavigate} />
    </div>
  );
}
