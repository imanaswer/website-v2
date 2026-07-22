import { Img } from "../components/Img";
import { Reveal } from "../components/Reveal";
import { PageHero } from "../components/PageHero";
import { TextLink, Label } from "../components/Ed";

const IMG = {
  campus: "/assets/photos/campus-grounds.jpg",
  a1:     "/assets/photos/school-gate.jpg",
};

function Story({ onNavigate }) {
  return (
    <section className="section">
      <div className="container container--wide">
        <div className="ed-split" style={{ display: "grid", gridTemplateColumns: "3fr 8fr", gap: "var(--space-16)" }}>
          <aside className="ed-aside" style={{ position: "sticky", top: 110, alignSelf: "start" }}>
            <Reveal>
              <Label>The Story</Label>
              <div className="rule--gold" style={{ margin: "1.1rem 0" }} />
              <p style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: "1.2rem", lineHeight: 1.5, color: "var(--maroon-800)" }}>
                Quality and learning, brought together since 1869.
              </p>
            </Reveal>
          </aside>
          <div>
            <Reveal>
              <p className="dropcap measure" style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.3rem,1.05rem + 1vw,1.75rem)", lineHeight: 1.5, color: "var(--text-primary)" }}>
                Sri Gujarati Vidyalaya was established in 1869 to bring quality education to the
                children of Kozhikode. It is managed by the Sri Gujarati Vidyalaya Association — a
                charitable welfare society registered under the Societies Act, 1860.
              </p>
            </Reveal>
            <Reveal delay={90}>
              <p className="measure" style={{ fontFamily: "var(--font-sans)", fontSize: "1.18rem", lineHeight: 1.75, color: "var(--text-secondary)", marginTop: "1.8rem" }}>
                Today it remains a Kerala Government-recognised, unaided, English-medium and
                co-educational school — standing among the institutions that bring quality and
                learning together, with dedicated faculty and facilities set in a serene,
                eco-friendly campus near Mananchira.
              </p>
            </Reveal>
            <Reveal delay={140}>
              <div className="photo photo-frame" style={{ marginTop: "2.6rem" }}>
                <Img src={IMG.campus} alt="The heritage campus of Sri Gujarati Vidyalaya" style={{ aspectRatio: "16/9" }} />
              </div>
            </Reveal>
            <Reveal delay={180}>
              <div style={{ marginTop: "2rem" }}>
                <TextLink onClick={() => onNavigate("academics")}>Explore our academics</TextLink>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

function Values() {
  const items = [
    { k: "Vision",     d: "To provide quality leadership along with all-round development and academic growth — grooming students to face tomorrow with confidence, as leaders from a very young age." },
    { k: "Mission",    d: "To provide a disciplined, nurturing environment that encourages every child to bring out the best in themselves." },
    { k: "Philosophy", d: "Every child is born with infinite potential. We follow a child-centred approach in a serene, eco-friendly environment, attending to each child as a unique individual." },
  ];
  return (
    <section className="section" style={{ background: "var(--surface-raised)" }}>
      <div className="container container--wide">
        <Reveal style={{ marginBottom: "var(--space-10)" }}>
          <Label>What we stand for</Label>
        </Reveal>
        <div className="index-list">
          {items.map((it, i) => (
            <Reveal key={it.k} delay={i * 80}>
              <div className="index-row ed-index-row" style={{ display: "grid", gridTemplateColumns: "4fr 8fr", gap: "var(--space-12)", padding: "clamp(1.8rem,3vw,2.8rem) 0", alignItems: "baseline" }}>
                <h3 style={{ fontSize: "clamp(1.6rem,1.2rem + 1.2vw,2.4rem)", fontWeight: 400 }}>{it.k}</h3>
                <p className="ed-index-desc" style={{ fontFamily: "var(--font-sans)", fontSize: "1.2rem", lineHeight: 1.7, color: "var(--text-secondary)", maxWidth: "56ch" }}>{it.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Timeline() {
  const ms = [
    { year: "1869",        t: "The school is founded",   d: "The Gujarati community establishes the school to educate the children of Kozhikode." },
    { year: "1860s–1900s", t: "Roots take hold",         d: "Registered under the Societies Act, 1860, the Association builds a lasting institution." },
    { year: "Mid-1900s",   t: "Government recognition",  d: "Becomes a Kerala Government-recognised, English-medium school." },
    { year: "1990s",       t: "A serene new campus",     d: "Grows into an eco-friendly campus near Mananchira, balancing heritage with modern facilities." },
    { year: "Today",       t: "Higher Secondary",        d: "Science and Commerce streams, modern laboratories and a living legacy of over a century and a half." },
  ];
  return (
    <section className="section">
      <div className="container container--wide">
        <div className="ed-split" style={{ display: "grid", gridTemplateColumns: "3fr 9fr", gap: "var(--space-16)" }}>
          <aside className="ed-aside" style={{ position: "sticky", top: 110, alignSelf: "start" }}>
            <Reveal>
              <Label>Our Journey</Label>
              <h2 style={{ fontSize: "var(--text-section)", fontWeight: 400, marginTop: "1rem", maxWidth: "10ch" }}>A living timeline</h2>
            </Reveal>
          </aside>
          <div className="index-list">
            {ms.map((m, i) => (
              <Reveal key={m.year} delay={i * 60}>
                <div className="index-row ed-index-row" style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: "var(--space-10)", padding: "clamp(1.5rem,2.5vw,2.2rem) 0", alignItems: "baseline" }}>
                  <span className="numeral" style={{ fontSize: "clamp(1.6rem,1.2rem + 1vw,2.2rem)", color: "var(--gold-600)", minWidth: "5.5ch" }}>{m.year}</span>
                  <div>
                    <h3 style={{ fontSize: "clamp(1.3rem,1.1rem + 0.6vw,1.7rem)", fontWeight: 400, marginBottom: "0.5rem" }}>{m.t}</h3>
                    <p className="ed-index-desc" style={{ fontFamily: "var(--font-sans)", fontSize: "1.1rem", lineHeight: 1.7, color: "var(--text-secondary)", maxWidth: "52ch" }}>{m.d}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Recognition() {
  const facts = [
    { k: "Established",  v: "1869" },
    { k: "Management",   v: "Sri Gujarati Vidyalaya Association" },
    { k: "Recognition",  v: "Kerala Government" },
    { k: "Type",         v: "Unaided · English-medium · Co-educational" },
    { k: "Registration", v: "Societies Act, 1860" },
  ];
  return (
    <section style={{ background: "var(--maroon-950)", color: "var(--cream-50)", position: "relative", overflow: "hidden" }}>
      <img src="/assets/crest-cream.png" alt="" aria-hidden style={{ position: "absolute", left: "-4%", top: "50%", transform: "translateY(-50%)", height: "150%", opacity: 0.05 }} />
      <div className="container container--wide" style={{ position: "relative", paddingBlock: "var(--section-y)" }}>
        <div className="ed-split" style={{ display: "grid", gridTemplateColumns: "5fr 7fr", gap: "var(--space-16)", alignItems: "center" }}>
          <Reveal>
            <div>
              <Label onDark>Recognition &amp; Governance</Label>
              <h2 style={{ color: "var(--cream-50)", fontWeight: 400, fontSize: "var(--text-section)", margin: "1.2rem 0 0", maxWidth: "14ch" }}>
                Recognised, trusted, accountable
              </h2>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <dl className="index-list" style={{ margin: 0 }}>
              {facts.map((f) => (
                <div key={f.k} className="index-row" style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "1.5rem", padding: "1.2rem 0", borderColor: "var(--border-on-dark)" }}>
                  <dt className="label label--on-dark" style={{ color: "var(--maroon-200)" }}>{f.k}</dt>
                  <dd style={{ margin: 0, fontFamily: "var(--font-serif)", fontSize: "1.25rem", color: "var(--cream-50)", lineHeight: 1.3 }}>{f.v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function HeritagePage({ onNavigate }) {
  return (
    <div>
      <PageHero onNavigate={onNavigate} crumb="Heritage" eyebrow="Since 1869"
        title="A prestigious heritage, a modern education"
        lead="For over a century and a half, Sri Gujarati Vidyalaya has shaped generations of learners in Kozhikode — rooted in humility, reaching for excellence."
        image={IMG.a1} />
      <Story onNavigate={onNavigate} />
      <Values />
      <Timeline />
      <Recognition />
    </div>
  );
}
