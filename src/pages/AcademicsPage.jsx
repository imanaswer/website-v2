import { Img } from "../components/Img";
import { Icon } from "../components/Icon";
import { Reveal } from "../components/Reveal";
import { PageHero } from "../components/PageHero";
import { TextLink, Label } from "../components/Ed";

const IMG = {
  principal: "https://www.srigujaratividhyalaya.com/wp-content/uploads/2023/05/vimala-jayaraj.jpg",
  program:   "https://www.srigujaratividhyalaya.com/wp-content/themes/gujarati/images/progrm.jpg",
};

function Approach() {
  return (
    <section className="section">
      <div className="container container--wide">
        <div className="ed-split" style={{ display: "grid", gridTemplateColumns: "3fr 8fr", gap: "var(--space-16)" }}>
          <aside className="ed-aside" style={{ position: "sticky", top: 110, alignSelf: "start" }}>
            <Reveal>
              <Label>Our Approach</Label>
              <div className="rule--gold" style={{ margin: "1.1rem 0" }} />
            </Reveal>
          </aside>
          <div>
            <Reveal>
              <p className="dropcap measure" style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.3rem,1.05rem + 1vw,1.75rem)", lineHeight: 1.5, color: "var(--text-primary)" }}>
                Learning here is a continuous journey, from play-based early years to Higher
                Secondary. At every stage, rigour is held in balance with sport, the arts and a
                genuine culture of service — so that children grow confident, curious and grounded.
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

function Streams() {
  const streams = [
    { n: "Science",  d: "For aspiring doctors, engineers and researchers — a foundation in the sciences and mathematics.", subjects: ["Physics", "Chemistry", "Biology", "Mathematics"] },
    { n: "Commerce", d: "For future leaders in business, finance and enterprise — the language of commerce and the economy.", subjects: ["Accountancy", "Business Studies", "Economics"] },
  ];
  return (
    <section className="section" style={{ background: "var(--surface-raised)" }}>
      <div className="container container--wide">
        <Reveal style={{ marginBottom: "var(--space-12)" }}>
          <Label>Higher Secondary</Label>
          <h2 style={{ fontSize: "var(--text-section)", fontWeight: 400, marginTop: "1rem", maxWidth: "18ch" }}>
            Choose the path that fits the future
          </h2>
        </Reveal>
        <div className="index-list">
          {streams.map((s, i) => (
            <Reveal key={s.n} delay={i * 90}>
              <div className="index-row ed-2col" style={{ display: "grid", gridTemplateColumns: "5fr 7fr", gap: "var(--space-12)", padding: "clamp(2rem,3.5vw,3.2rem) 0", alignItems: "start" }}>
                <div>
                  <h3 style={{ fontSize: "clamp(1.9rem,1.4rem + 1.6vw,2.8rem)", fontWeight: 400 }}>{s.n}</h3>
                  <p style={{ fontFamily: "var(--font-sans)", fontSize: "1.15rem", lineHeight: 1.7, color: "var(--text-secondary)", marginTop: "1rem", maxWidth: "40ch" }}>{s.d}</p>
                </div>
                <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
                  {s.subjects.map((sub, j) => (
                    <li key={sub} style={{ display: "flex", alignItems: "baseline", gap: "1.2rem", padding: "0.85rem 0", borderTop: j === 0 ? "none" : "1px solid var(--border-subtle)" }}>
                      <span className="label" style={{ color: "var(--gold-700)", minWidth: "2.5ch" }}>{String(j + 1).padStart(2, "0")}</span>
                      <span style={{ fontFamily: "var(--font-serif)", fontSize: "1.4rem", color: "var(--text-primary)" }}>{sub}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Beyond() {
  const items = [
    { icon: "soccer-ball",      t: "Sport",   d: "Indoor and outdoor courts, swimming pools and a full calendar of disciplines." },
    { icon: "palette",          t: "The Arts", d: "Music, dance, drama and the visual arts, woven through school life." },
    { icon: "hand-heart",       t: "Service", d: "A culture of responsibility, citizenship and care for the community and environment." },
  ];
  return (
    <section className="section">
      <div className="container container--wide">
        <Reveal style={{ marginBottom: "var(--space-10)" }}>
          <Label>Beyond the Classroom</Label>
          <h2 style={{ fontSize: "var(--text-section)", fontWeight: 400, marginTop: "1rem", maxWidth: "20ch" }}>
            An education that reaches past the timetable
          </h2>
        </Reveal>
        <div className="index-list">
          {items.map((it, i) => (
            <Reveal key={it.t} delay={i * 70}>
              <div className="index-row ed-index-row" style={{ display: "grid", gridTemplateColumns: "auto 4fr 6fr", gap: "1.5rem", padding: "clamp(1.6rem,2.5vw,2.2rem) 0", alignItems: "baseline" }}>
                <Icon name={it.icon} size={26} style={{ color: "var(--gold-600)" }} />
                <h3 style={{ fontSize: "clamp(1.4rem,1.1rem + 0.9vw,1.9rem)", fontWeight: 400 }}>{it.t}</h3>
                <p className="ed-index-desc" style={{ fontFamily: "var(--font-sans)", fontSize: "1.15rem", lineHeight: 1.7, color: "var(--text-secondary)", maxWidth: "44ch" }}>{it.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function FacultyNote({ onNavigate }) {
  return (
    <section className="section" style={{ background: "var(--surface-raised)" }}>
      <div className="container container--narrow">
        <Reveal>
          <div className="ed-2col" style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: "var(--space-12)", alignItems: "center" }}>
            <div style={{ width: "clamp(130px,18vw,190px)" }}>
              <div className="photo photo-frame">
                <Img src={IMG.principal} alt="Vimala Jayaraj, Principal" style={{ aspectRatio: "4/5" }} />
              </div>
            </div>
            <div>
              <Label>Our Teachers</Label>
              <p style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.35rem,1.05rem + 1.3vw,1.95rem)", lineHeight: 1.5, fontWeight: 400, color: "var(--text-primary)", marginTop: "1.2rem" }}>
                Led by our Principal, Vimala Jayaraj, ours is a faculty that knows every child as an
                individual — and teaches with the patience and care that a 150-year-old institution
                expects.
              </p>
              <div style={{ marginTop: "2rem" }}>
                <TextLink onClick={() => onNavigate("faculty")}>Meet our faculty</TextLink>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function AcademicsPage({ onNavigate }) {
  return (
    <div>
      <PageHero onNavigate={onNavigate} crumb="Academics" eyebrow="Academics"
        title="Rigour, balance and joy in learning"
        lead="From play-based early years to Higher Secondary streams, our academics develop confident, curious and grounded young people."
        image={IMG.program} />
      <Approach />
      <Streams />
      <Beyond />
      <FacultyNote onNavigate={onNavigate} />
    </div>
  );
}
