import { Img } from "../components/Img";
import { Icon } from "../components/Icon";
import { Reveal } from "../components/Reveal";
import { Button } from "../components/Button";

const IMG = {
  campus:    "https://www.srigujaratividhyalaya.com/wp-content/themes/gujarati/images/gujarati-school.jpg",
  students:  "https://www.srigujaratividhyalaya.com/wp-content/themes/gujarati/images/progrm.jpg",
  life:      "https://www.srigujaratividhyalaya.com/wp-content/uploads/2023/07/4-13-555x472.jpg",
  faculty:   "https://www.srigujaratividhyalaya.com/wp-content/themes/gujarati/images/Faculty_.jpg",
  principal: "https://www.srigujaratividhyalaya.com/wp-content/uploads/2023/05/vimala-jayaraj.jpg",
  news_plusone: "https://www.srigujaratividhyalaya.com/wp-content/uploads/2024/06/plusone-555x555.jpeg",
  news_mla:  "https://www.srigujaratividhyalaya.com/wp-content/uploads/2023/07/1-31-555x472.jpg",
  news_yoga: "https://www.srigujaratividhyalaya.com/wp-content/uploads/2023/07/4-13-555x472.jpg",
  news_ocean:"https://www.srigujaratividhyalaya.com/wp-content/uploads/2023/07/3-18-555x472.jpg",
};

/* A small inline text link that animates its arrow + underline. */
function TextLink({ children, onClick, onDark }) {
  return (
    <button className={"link-line" + (onDark ? " link-line--on-dark" : "")} onClick={onClick}>
      {children}<Icon name="arrow-right" size={15} />
    </button>
  );
}

/* ─────────────────────────  Hero  ───────────────────────── */
function Hero({ onNavigate }) {
  const facts = ["Est. 1869", "English Medium", "Co-educational", "Govt. Recognised"];
  return (
    <section style={{ position: "relative", minHeight: "min(94vh,880px)", display: "flex", flexDirection: "column", justifyContent: "flex-end", overflow: "hidden", background: "var(--maroon-950)" }}>
      <div className="hero-bg photo" style={{ position: "absolute", inset: 0 }}>
        <Img src={IMG.campus} alt="The Sri Gujarati Vidyalaya campus at Mananchira, Kozhikode" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} />
      </div>
      {/* refined, restrained gradient — readable but not muddy */}
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,rgba(36,16,6,.42) 0%,rgba(36,16,6,.08) 38%,rgba(36,16,6,.55) 78%,rgba(26,11,4,.86) 100%)" }} />

      <div className="container container--wide" style={{ position: "relative", width: "100%", paddingTop: "var(--space-20)", paddingBottom: "var(--space-10)" }}>
        <Reveal>
          <div className="label label--on-dark" style={{ display: "flex", alignItems: "center", gap: "0.8rem" }}>
            <span style={{ width: 28, height: 1.5, background: "var(--gold-400)", display: "inline-block" }} />
            Established 1869 · Mananchira, Kozhikode
          </div>
        </Reveal>
        <Reveal delay={90}>
          <h1 style={{ color: "var(--cream-50)", fontWeight: 400, fontSize: "clamp(2.9rem,1.4rem + 6vw,6rem)", lineHeight: 1.0, maxWidth: "15ch", letterSpacing: "-0.025em", marginTop: "1.4rem" }}>
            Knowledge, adorned&nbsp;by{" "}
            <span style={{ fontStyle: "italic", fontWeight: 300, color: "var(--gold-300)" }}>humility.</span>
          </h1>
        </Reveal>
        <Reveal delay={170}>
          <p className="measure-narrow" style={{ color: "var(--cream-100)", fontFamily: "var(--font-serif)", fontSize: "var(--text-lead)", marginTop: "1.6rem", lineHeight: 1.6, opacity: 0.94 }}>
            For over a hundred and fifty years, Sri Gujarati Vidyalaya has educated the children of
            Kozhikode — a Kerala Government-recognised, English-medium school devoted to the total
            development of every child.
          </p>
        </Reveal>
        <Reveal delay={250}>
          <div style={{ display: "flex", gap: "1.4rem", marginTop: "2.4rem", flexWrap: "wrap", alignItems: "center" }}>
            <Button size="lg" onClick={() => onNavigate("admissions")} iconRight={<Icon name="arrow-right" size={18} />}>
              Admissions 2026–27
            </Button>
            <TextLink onDark onClick={() => onNavigate("about")}>Discover our heritage</TextLink>
          </div>
        </Reveal>
      </div>

      {/* hairline fact band — replaces the gamified stat counters */}
      <Reveal delay={320} style={{ position: "relative", width: "100%" }}>
        <div style={{ borderTop: "1px solid var(--border-on-dark)" }}>
          <div className="container container--wide ed-hero-facts" style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem 2.6rem", padding: "1.15rem 0", alignItems: "center" }}>
            {facts.map((f, i) => (
              <span key={f} style={{ display: "inline-flex", alignItems: "center", gap: "2.6rem" }}>
                <span className="label label--on-dark" style={{ color: "var(--cream-100)", letterSpacing: "0.12em" }}>{f}</span>
                {i < facts.length - 1 && <span aria-hidden style={{ width: 1, height: 12, background: "var(--border-on-dark)" }} />}
              </span>
            ))}
            <span style={{ marginLeft: "auto", fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: "0.95rem", color: "var(--gold-300)" }}>
              विद्या विनयेन शोभते
            </span>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

/* ───────────────────  The School (letter / intro)  ─────────────────── */
function Intro({ onNavigate }) {
  return (
    <section className="section">
      <div className="container container--wide">
        <div className="ed-split" style={{ display: "grid", gridTemplateColumns: "3fr 8fr", gap: "var(--space-16)" }}>
          <aside className="ed-aside" style={{ position: "sticky", top: 110, alignSelf: "start" }}>
            <Reveal>
              <div className="label">The School</div>
              <div className="rule--gold" style={{ margin: "1.1rem 0 1.4rem" }} />
              <p style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: "1.3rem", lineHeight: 1.5, color: "var(--maroon-800)" }}>
                विद्या विनयेन शोभते
              </p>
              <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.98rem", color: "var(--text-muted)", marginTop: "0.5rem", lineHeight: 1.5 }}>
                “Knowledge is adorned by humility.”
              </p>
            </Reveal>
          </aside>

          <div>
            <Reveal>
              <p className="dropcap measure" style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.35rem,1.05rem + 1.1vw,1.85rem)", lineHeight: 1.5, color: "var(--text-primary)", fontWeight: 400 }}>
                The school aims at the total development of the child through education — where the
                child acquires the wisdom of humility, and radiates happiness and contentment around.
              </p>
            </Reveal>
            <Reveal delay={90}>
              <p className="measure" style={{ fontFamily: "var(--font-sans)", fontSize: "1.2rem", lineHeight: 1.75, color: "var(--text-secondary)", marginTop: "1.8rem" }}>
                Founded in 1869 and managed by the Sri Gujarati Vidyalaya Association, ours is a
                Kerala Government-recognised, unaided, English-medium and co-educational school. For
                generation after generation of Kozhikode families, it has been a place where rigour
                and warmth sit side by side.
              </p>
            </Reveal>
            <Reveal delay={150}>
              <div style={{ marginTop: "2.2rem" }}>
                <TextLink onClick={() => onNavigate("about")}>Our story since 1869</TextLink>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────  Heritage band (full-bleed, restrained)  ───────────────── */
function HeritageBand() {
  const facts = [
    { k: "Founded",     v: "1869" },
    { k: "Location",    v: "Mananchira, Kozhikode" },
    { k: "Recognition", v: "Kerala Government" },
    { k: "Medium",      v: "English · Co-educational" },
  ];
  return (
    <section style={{ background: "var(--maroon-950)", color: "var(--cream-50)", position: "relative", overflow: "hidden" }}>
      <img src="/assets/crest-cream.png" alt="" aria-hidden style={{ position: "absolute", right: "-4%", top: "50%", transform: "translateY(-50%)", height: "150%", opacity: 0.05 }} />
      <div className="container container--wide" style={{ position: "relative", paddingBlock: "var(--section-y)" }}>
        <div className="ed-split" style={{ display: "grid", gridTemplateColumns: "5fr 7fr", gap: "var(--space-16)", alignItems: "center" }}>
          <Reveal>
            <div>
              <div className="label label--on-dark">Since 1869</div>
              <div className="numeral" style={{ fontSize: "clamp(5rem,3rem + 12vw,11rem)", color: "var(--gold-300)", marginTop: "0.6rem" }}>1869</div>
              <p className="measure-narrow" style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.3rem,1.05rem + 1vw,1.7rem)", lineHeight: 1.45, color: "var(--cream-50)", marginTop: "1.4rem", fontWeight: 400 }}>
                One hundred and fifty years of learning, in the heart of Kozhikode.
              </p>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <dl className="index-list" style={{ margin: 0 }}>
              {facts.map((f) => (
                <div key={f.k} className="index-row" style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "1.5rem", padding: "1.25rem 0", borderColor: "var(--border-on-dark)" }}>
                  <dt className="label label--on-dark" style={{ color: "var(--maroon-200)" }}>{f.k}</dt>
                  <dd style={{ margin: 0, fontFamily: "var(--font-serif)", fontSize: "1.35rem", color: "var(--cream-50)", lineHeight: 1.2 }}>{f.v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────  Programs (editorial index)  ───────────────────── */
function Programs({ onNavigate }) {
  const stages = [
    { n: "01", t: "Pre-Primary",       range: "Pre-KG – UKG",        d: "Play-based early years, where curiosity is the first lesson and confidence takes root." },
    { n: "02", t: "Primary",           range: "Classes I – V",       d: "Strong foundations in language, numeracy and character, taught with patience and care." },
    { n: "03", t: "Secondary",         range: "Classes VI – X",      d: "Academic rigour balanced with sport, the arts and a real culture of service." },
    { n: "04", t: "Higher Secondary",  range: "Plus One – Plus Two", d: "Science and Commerce streams that prepare students for university and what follows." },
  ];
  return (
    <section className="section">
      <div className="container container--wide">
        <Reveal>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: "1.5rem", flexWrap: "wrap" }}>
            <div>
              <div className="label">Academics</div>
              <h2 style={{ fontSize: "var(--text-section)", fontWeight: 400, marginTop: "1rem", maxWidth: "16ch" }}>
                A continuous education, Pre-KG to Plus Two
              </h2>
            </div>
            <TextLink onClick={() => onNavigate("academics")}>Explore academics</TextLink>
          </div>
        </Reveal>

        <div className="index-list" style={{ marginTop: "var(--space-12)" }}>
          {stages.map((s, i) => (
            <Reveal key={s.t} delay={i * 70}>
              <div
                className="index-row ed-index-row"
                onMouseEnter={(e) => { e.currentTarget.querySelector(".ed-num").style.color = "var(--maroon-700)"; e.currentTarget.querySelector(".ed-title").style.color = "var(--maroon-800)"; }}
                onMouseLeave={(e) => { e.currentTarget.querySelector(".ed-num").style.color = "var(--sand-400)"; e.currentTarget.querySelector(".ed-title").style.color = "var(--text-primary)"; }}
                style={{ display: "grid", gridTemplateColumns: "auto 4fr 6fr", alignItems: "baseline", gap: "1.5rem", padding: "clamp(1.4rem,2.5vw,2.2rem) 0", transition: "background var(--dur)" }}
              >
                <span className="ed-num numeral" style={{ fontSize: "1.6rem", color: "var(--sand-400)", transition: "color var(--dur)", minWidth: "2.2ch" }}>{s.n}</span>
                <div>
                  <h3 className="ed-title" style={{ fontSize: "clamp(1.5rem,1.2rem + 1vw,2.1rem)", fontWeight: 400, transition: "color var(--dur)" }}>{s.t}</h3>
                  <div className="label" style={{ marginTop: "0.6rem", color: "var(--text-muted)" }}>{s.range}</div>
                </div>
                <p className="ed-index-desc" style={{ fontFamily: "var(--font-sans)", fontSize: "1.15rem", lineHeight: 1.7, color: "var(--text-secondary)", maxWidth: "42ch" }}>{s.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────────────  Campus & facilities (image + list)  ─────────────────── */
function Campus({ onNavigate }) {
  const fac = [
    "Science & Computer Laboratories", "Library & Reading Room",
    "Swimming Pools", "Indoor & Outdoor Play Courts",
    "Open-Air Auditorium", "Medical Care",
    "School Transportation", "Canteen",
  ];
  return (
    <section className="section" style={{ background: "var(--surface-raised)" }}>
      <div className="container container--wide">
        <div className="ed-2col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-16)", alignItems: "center" }}>
          <Reveal>
            <div className="photo photo-frame" style={{ borderRadius: "2px" }}>
              <Img src={IMG.faculty} alt="Students and teachers on the Sri Gujarati Vidyalaya campus" style={{ aspectRatio: "5/4" }} />
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div>
              <div className="label">The Campus</div>
              <h2 style={{ fontSize: "var(--text-section)", fontWeight: 400, margin: "1rem 0 1.4rem", maxWidth: "18ch" }}>
                A green, calm campus near Mananchira
              </h2>
              <p className="measure" style={{ fontFamily: "var(--font-sans)", fontSize: "1.18rem", lineHeight: 1.7, color: "var(--text-secondary)", marginBottom: "2rem" }}>
                Everything a young mind needs to flourish — laboratories, library, sport and the open
                air — set within an eco-friendly campus in the heart of the city.
              </p>
              <ul className="index-list" style={{ listStyle: "none", margin: 0, padding: 0 }}>
                {fac.map((f) => (
                  <li key={f} className="index-row" style={{ display: "flex", alignItems: "center", gap: "0.9rem", padding: "0.85rem 0" }}>
                    <Icon name="circle" weight="fill" size={6} style={{ color: "var(--gold-600)" }} />
                    <span style={{ fontFamily: "var(--font-sans)", fontSize: "1.1rem", color: "var(--ink-800)" }}>{f}</span>
                  </li>
                ))}
              </ul>
              <div style={{ marginTop: "2rem" }}>
                <TextLink onClick={() => onNavigate("gallery")}>See the campus</TextLink>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────  Principal's note (signed letter)  ───────────────────── */
function Principal({ onNavigate }) {
  return (
    <section className="section">
      <div className="container container--narrow">
        <Reveal>
          <div className="ed-2col" style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: "var(--space-12)", alignItems: "start" }}>
            <div style={{ width: "clamp(120px,18vw,180px)" }}>
              <div className="photo photo-frame">
                <Img src={IMG.principal} alt="Vimala Jayaraj, Principal" style={{ aspectRatio: "4/5" }} />
              </div>
            </div>
            <div>
              <div className="label">From the Principal</div>
              <p style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.4rem,1.05rem + 1.5vw,2.05rem)", lineHeight: 1.5, fontWeight: 400, color: "var(--text-primary)", marginTop: "1.4rem" }}>
                I am honoured to lead an institution that has been a beacon of education for over a
                century and a half — nurturing each child in a serene home of learning, where wisdom
                grows alongside kindness.
              </p>
              <div style={{ marginTop: "2rem", display: "flex", alignItems: "center", gap: "1.2rem", flexWrap: "wrap" }}>
                <div>
                  <div style={{ fontFamily: "var(--font-display)", fontSize: "1.3rem", color: "var(--maroon-800)" }}>Vimala Jayaraj</div>
                  <div className="label" style={{ marginTop: "0.2rem" }}>Principal</div>
                </div>
                <span aria-hidden style={{ width: 1, height: 34, background: "var(--border-strong)" }} />
                <TextLink onClick={() => onNavigate("about")}>Read the full message</TextLink>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ────────────────────────  News & events (list)  ──────────────────────── */
function News({ onNavigate }) {
  const items = [
    { img: IMG.news_plusone, d: "27", m: "Jun", y: "2024", t: "Plus One admissions open for 2024–25", c: "Admissions" },
    { img: IMG.news_mla,     d: "03", m: "Jul", y: "2023", t: "School honoured with the MLA's Excellence Award", c: "Achievement" },
    { img: IMG.news_yoga,    d: "21", m: "Jun", y: "2023", t: "International Yoga Day observed on campus", c: "Campus" },
    { img: IMG.news_ocean,   d: "08", m: "Jun", y: "2023", t: "World Ocean Day — a lesson beyond the classroom", c: "Campus" },
  ];
  return (
    <section className="section" style={{ background: "var(--surface-raised)" }}>
      <div className="container container--wide">
        <Reveal>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: "1.5rem", flexWrap: "wrap" }}>
            <div>
              <div className="label">From the School</div>
              <h2 style={{ fontSize: "var(--text-section)", fontWeight: 400, marginTop: "1rem" }}>News &amp; events</h2>
            </div>
            <TextLink onClick={() => onNavigate("gallery")}>View all</TextLink>
          </div>
        </Reveal>

        <div className="index-list" style={{ marginTop: "var(--space-12)" }}>
          {items.map((n, i) => (
            <Reveal key={n.t} delay={i * 70}>
              <article
                onClick={() => onNavigate("gallery")}
                onMouseEnter={(e) => { const im = e.currentTarget.querySelector("img"); if (im) im.style.transform = "scale(1.05)"; e.currentTarget.querySelector(".ed-news-t").style.color = "var(--maroon-800)"; }}
                onMouseLeave={(e) => { const im = e.currentTarget.querySelector("img"); if (im) im.style.transform = "scale(1)"; e.currentTarget.querySelector(".ed-news-t").style.color = "var(--text-primary)"; }}
                className="index-row ed-index-row"
                style={{ display: "grid", gridTemplateColumns: "auto 1fr auto", alignItems: "center", gap: "clamp(1rem,3vw,2.4rem)", padding: "1.4rem 0", cursor: "pointer" }}
              >
                <div className="photo photo-frame" style={{ width: "clamp(84px,12vw,128px)", flexShrink: 0 }}>
                  <Img src={n.img} alt={n.t} style={{ aspectRatio: "4/3" }} />
                </div>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "0.55rem", flexWrap: "wrap" }}>
                    <span className="label" style={{ color: "var(--gold-700)" }}>{n.c}</span>
                    <span aria-hidden style={{ width: 1, height: 11, background: "var(--border-strong)" }} />
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.85rem", color: "var(--text-muted)", letterSpacing: "0.04em" }}>{`${n.d} ${n.m} ${n.y}`}</span>
                  </div>
                  <h3 className="ed-news-t" style={{ fontSize: "clamp(1.15rem,1rem + 0.6vw,1.5rem)", fontWeight: 400, lineHeight: 1.25, transition: "color var(--dur)", maxWidth: "30ch" }}>{n.t}</h3>
                </div>
                <Icon name="arrow-up-right" size={22} style={{ color: "var(--maroon-600)", justifySelf: "end" }} />
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────  Admissions CTA (quiet)  ───────────────────────── */
function AdmissionsCTA({ onNavigate }) {
  return (
    <section className="section">
      <div className="container container--wide">
        <Reveal>
          <div className="ed-2col" style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: "var(--space-12)", alignItems: "center", borderTop: "1px solid var(--border-strong)", borderBottom: "1px solid var(--border-strong)", padding: "clamp(2.5rem,5vw,4.5rem) 0" }}>
            <div>
              <div className="label">Admissions 2026–27</div>
              <h2 style={{ fontSize: "clamp(2rem,1.4rem + 2.6vw,3.4rem)", fontWeight: 400, marginTop: "1rem", maxWidth: "16ch", lineHeight: 1.08 }}>
                Begin your child's journey with us.
              </h2>
              <p className="measure-narrow" style={{ fontFamily: "var(--font-sans)", fontSize: "1.18rem", lineHeight: 1.7, color: "var(--text-secondary)", marginTop: "1.2rem" }}>
                Enquiries for the coming year are open. We warmly welcome families to visit our
                campus at Mananchira.
              </p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "1.1rem", alignItems: "flex-start" }}>
              <Button size="lg" onClick={() => onNavigate("admissions")} iconRight={<Icon name="arrow-right" size={18} />}>Begin an enquiry</Button>
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

/* ───────────────────────────  Composition  ─────────────────────────── */
export function HomePage({ onNavigate }) {
  return (
    <div>
      <Hero onNavigate={onNavigate} />
      <Intro onNavigate={onNavigate} />
      <HeritageBand />
      <Programs onNavigate={onNavigate} />
      <Campus onNavigate={onNavigate} />
      <Principal onNavigate={onNavigate} />
      <News onNavigate={onNavigate} />
      <AdmissionsCTA onNavigate={onNavigate} />
    </div>
  );
}
