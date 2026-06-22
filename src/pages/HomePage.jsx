import { useState, useEffect } from "react";
import { Img } from "../components/Img";
import { Icon } from "../components/Icon";
import { Reveal } from "../components/Reveal";
import { Kicker } from "../components/Kicker";
import { Button } from "../components/Button";
import { Badge } from "../components/Badge";
import { Stat } from "../components/Stat";
import { Avatar } from "../components/Avatar";

const IMG = {
  campus:    "https://www.srigujaratividhyalaya.com/wp-content/themes/gujarati/images/gujarati-school.jpg",
  a1:        "https://www.srigujaratividhyalaya.com/wp-content/themes/gujarati/images/progrm.jpg",
  a2:        "https://www.srigujaratividhyalaya.com/wp-content/uploads/2023/07/4-13-555x472.jpg",
  faculty:   "https://www.srigujaratividhyalaya.com/wp-content/themes/gujarati/images/Faculty_.jpg",
  principal: "https://www.srigujaratividhyalaya.com/wp-content/uploads/2023/05/vimala-jayaraj.jpg",
  news_plusone: "https://www.srigujaratividhyalaya.com/wp-content/uploads/2024/06/plusone-555x555.jpeg",
  news_mla:  "https://www.srigujaratividhyalaya.com/wp-content/uploads/2023/07/1-31-555x472.jpg",
  news_yoga: "https://www.srigujaratividhyalaya.com/wp-content/uploads/2023/07/4-13-555x472.jpg",
  news_ocean:"https://www.srigujaratividhyalaya.com/wp-content/uploads/2023/07/3-18-555x472.jpg",
};

/* ─── Hero ─── */
function Hero({ onNavigate }) {
  return (
    <section style={{ position: "relative", minHeight: "min(92vh,820px)", display: "flex", alignItems: "flex-end", overflow: "hidden" }}>
      <div className="hero-bg" style={{ position: "absolute", inset: 0 }}>
        <Img src={IMG.campus} alt="Sri Gujarati Vidyalaya campus" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} />
      </div>
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,rgba(58,22,7,.58) 0%,rgba(58,22,7,.18) 32%,rgba(58,22,7,.86) 100%)" }} />
      <div className="container container--wide" style={{ position: "relative", paddingBottom: "var(--space-12)", paddingTop: "var(--space-16)", width: "100%" }}>
        <Reveal>
          <Badge tone="gold" dot style={{ marginBottom: "1.4rem", background: "rgba(248,240,220,.16)", color: "var(--gold-300)", backdropFilter: "blur(6px)" }}>Established 1869 · Kozhikode</Badge>
        </Reveal>
        <Reveal delay={80}>
          <h1 style={{ color: "var(--cream-50)", fontWeight: 500, fontSize: "var(--text-hero)", lineHeight: 1.02, maxWidth: "16ch", letterSpacing: "-0.02em" }}>
            A heritage of learning, <span style={{ fontStyle: "italic", color: "var(--gold-300)", fontWeight: 400 }}>for every child.</span>
          </h1>
        </Reveal>
        <Reveal delay={160}>
          <p style={{ color: "var(--cream-100)", fontFamily: "var(--font-sans)", fontSize: "var(--text-lead)", maxWidth: "46ch", marginTop: "1.4rem", lineHeight: 1.6, opacity: 0.95 }}>
            For over 150 years, Sri Gujarati Vidyalaya has nurtured the total development of the child — where wisdom, humility and joy grow together.
          </p>
        </Reveal>
        <Reveal delay={240}>
          <div style={{ display: "flex", gap: "0.85rem", marginTop: "2.2rem", flexWrap: "wrap" }}>
            <Button size="lg" onClick={() => onNavigate("admissions")} iconRight={<Icon name="arrow-right" size={18} />}>Apply for Admission</Button>
            <Button size="lg" variant="inverse" onClick={() => onNavigate("gallery")} iconLeft={<Icon name="play-circle" weight="fill" size={20} />}>Take a Campus Tour</Button>
          </div>
        </Reveal>
        <Reveal delay={340}>
          <div className="hero-strip" style={{ marginTop: "var(--space-12)", display: "grid", gridTemplateColumns: "repeat(3,max-content)", gap: "clamp(1.5rem,4vw,3.5rem)", padding: "1.3rem 1.7rem", borderRadius: "var(--radius-lg)", background: "rgba(36,26,17,.34)", backdropFilter: "blur(14px) saturate(150%)", border: "1px solid rgba(248,240,220,.18)", width: "max-content", maxWidth: "100%" }}>
            {[{ v: "156+", l: "Years of Legacy" }, { v: "2,400+", l: "Students" }, { v: "98%", l: "Board Results" }].map((s) => (
              <div key={s.l}>
                <div style={{ fontFamily: "var(--font-display)", fontWeight: 500, fontSize: "clamp(1.6rem,1.2rem + 1vw,2.1rem)", lineHeight: 1, color: "var(--gold-300)" }}>{s.v}</div>
                <div style={{ fontFamily: "var(--font-sans)", fontSize: "0.78rem", letterSpacing: "0.04em", color: "var(--cream-100)", marginTop: "0.35rem" }}>{s.l}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
      <div style={{ position: "absolute", bottom: "1.4rem", left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: "0.4rem", color: "var(--cream-100)", pointerEvents: "none" }}>
        <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.66rem", letterSpacing: "0.18em", textTransform: "uppercase", opacity: 0.7 }}>Scroll</span>
        <Icon name="caret-down" size={18} className="scroll-cue" />
      </div>
    </section>
  );
}

/* ─── Trust bar ─── */
function TrustBar() {
  const items = [
    { icon: "seal-check",    label: "Kerala Govt. Recognised" },
    { icon: "translate",     label: "English Medium" },
    { icon: "users-three",   label: "Co-Educational" },
    { icon: "tree",          label: "Eco-Friendly Campus" },
  ];
  return (
    <div style={{ background: "var(--surface-card)", borderBottom: "1px solid var(--border-subtle)" }}>
      <div className="container container--wide trust-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "1rem", padding: "1.6rem 0" }}>
        {items.map((it) => (
          <div key={it.label} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.7rem", color: "var(--maroon-700)" }}>
            <Icon name={it.icon} size={26} />
            <span style={{ fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: "0.92rem", color: "var(--ink-800)" }}>{it.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── About ─── */
function About({ onNavigate }) {
  return (
    <section className="section">
      <div className="container container--wide about-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-16)", alignItems: "center" }}>
        <Reveal>
          <Kicker>Welcome to Gujarati Vidyalaya</Kicker>
          <h2 style={{ fontSize: "var(--text-section)", fontWeight: 500, margin: "1rem 0 1.2rem", maxWidth: "18ch" }}>
            Education that develops the <em style={{ color: "var(--maroon-700)" }}>whole</em> child
          </h2>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: "1.05rem", lineHeight: 1.7, color: "var(--text-secondary)", marginBottom: "1rem" }}>
            Sri Gujarati Vidyalaya Higher Secondary School aims at the total development of the child through education — where the child acquires the wisdom of humility and radiates happiness and contentment around.
          </p>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: "1.05rem", lineHeight: 1.7, color: "var(--text-secondary)", marginBottom: "1.8rem" }}>
            A Kerala Government recognised unaided English-medium co-educational school, managed by the Sri Gujarati Vidyalaya Association — a charitable welfare society established to bring quality and learning together.
          </p>
          <Button variant="secondary" onClick={() => onNavigate("about")} iconRight={<Icon name="arrow-right" size={16} />}>Our story since 1869</Button>
        </Reveal>
        <Reveal delay={120}>
          <div style={{ position: "relative" }}>
            <Img src={IMG.a1} alt="Students at Gujarati Vidyalaya" style={{ borderRadius: "var(--radius-xl)", aspectRatio: "4/5", boxShadow: "var(--shadow-lg)" }} />
            <Img src={IMG.a2} alt="Campus life" style={{ position: "absolute", width: "52%", aspectRatio: "1", right: "-6%", bottom: "-10%", borderRadius: "var(--radius-lg)", border: "6px solid var(--surface-page)", boxShadow: "var(--shadow-lg)" }} />
            <div style={{ position: "absolute", top: "-22px", left: "-22px", background: "var(--maroon-900)", color: "var(--cream-50)", borderRadius: "var(--radius-lg)", padding: "1rem 1.2rem", boxShadow: "var(--shadow-brand)", display: "flex", alignItems: "center", gap: "0.8rem" }}>
              <img src="/assets/crest-cream.png" alt="" style={{ height: 44 }} />
              <div>
                <div style={{ fontFamily: "var(--font-display)", fontSize: "1.6rem", lineHeight: 1, color: "var(--gold-300)" }}>156</div>
                <div style={{ fontFamily: "var(--font-sans)", fontSize: "0.72rem", letterSpacing: "0.1em", textTransform: "uppercase" }}>Years</div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ─── At a Glance ─── */
function Glance() {
  const stats = [
    { value: 156, suffix: "+", label: "Years of Legacy" },
    { value: 2400, suffix: "+", label: "Students" },
    { value: 120, suffix: "+", label: "Faculty Members" },
    { value: 98, suffix: "%", label: "Board Results" },
  ];
  return (
    <section style={{ background: "var(--maroon-900)", position: "relative", overflow: "hidden" }}>
      <img src="/assets/crest-cream.png" alt="" style={{ position: "absolute", right: "-60px", top: "50%", transform: "translateY(-50%)", height: "150%", opacity: 0.05 }} />
      <div className="container container--wide" style={{ paddingBlock: "var(--space-16)", position: "relative" }}>
        <Reveal style={{ textAlign: "center", marginBottom: "var(--space-12)" }}>
          <Kicker tone="inverse">School at a glance</Kicker>
          <h2 style={{ color: "var(--cream-50)", fontWeight: 500, fontSize: "var(--text-section)", marginTop: "0.8rem" }}>A legacy you can measure</h2>
        </Reveal>
        <div className="glance-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "var(--space-8)" }}>
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 90}><Stat {...s} tone="inverse" /></Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Academics ─── */
function Academics({ onNavigate }) {
  const stages = [
    { icon: "baby",                t: "Pre-Primary",      d: "Play-based early years where curiosity is the first lesson." },
    { icon: "pencil-simple-line",  t: "Primary",          d: "Strong foundations in language, numeracy and values." },
    { icon: "books",               t: "Secondary",        d: "Rigorous academics balanced with sport, arts and service." },
    { icon: "graduation-cap",      t: "Higher Secondary", d: "Science & Commerce streams that open every future." },
  ];
  return (
    <section className="section">
      <div className="container container--wide">
        <Reveal style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: "1rem", flexWrap: "wrap", marginBottom: "var(--space-12)" }}>
          <div>
            <Kicker>Academics</Kicker>
            <h2 style={{ fontSize: "var(--text-section)", fontWeight: 500, marginTop: "0.8rem", maxWidth: "16ch" }}>A continuous journey, Pre-KG to Plus Two</h2>
          </div>
          <Button variant="ghost" onClick={() => onNavigate("academics")} iconRight={<Icon name="arrow-right" size={16} />}>Explore academics</Button>
        </Reveal>
        <div className="cards-4" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "var(--space-6)" }}>
          {stages.map((s, i) => (
            <Reveal key={s.t} delay={i * 80} style={{ height: "100%" }}>
              <div
                onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.boxShadow = "var(--shadow-lg)"; e.currentTarget.style.borderColor = "var(--maroon-200)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "var(--shadow-sm)"; e.currentTarget.style.borderColor = "var(--border-subtle)"; }}
                style={{ background: "var(--surface-card)", border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-lg)", padding: "1.6rem", height: "100%", boxShadow: "var(--shadow-sm)", transition: "transform var(--dur) var(--ease-out),box-shadow var(--dur) var(--ease-out),border-color var(--dur)" }}>
                <div style={{ width: 52, height: 52, borderRadius: "var(--radius-md)", background: "var(--maroon-50)", color: "var(--maroon-700)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.1rem" }}>
                  <Icon name={s.icon} size={28} />
                </div>
                <h3 style={{ fontSize: "1.25rem", fontWeight: 600, marginBottom: "0.5rem" }}>{s.t}</h3>
                <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.92rem", lineHeight: 1.6, color: "var(--text-secondary)" }}>{s.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Facilities ─── */
function Facilities() {
  const fac = [
    { icon: "desktop",           t: "Computer Lab" }, { icon: "flask",            t: "Science Labs" },
    { icon: "books",             t: "Library" },       { icon: "bus",             t: "Transportation" },
    { icon: "fork-knife",        t: "Canteen" },        { icon: "first-aid-kit",   t: "Medical Care" },
    { icon: "swimming-pool",     t: "Swimming Pools" }, { icon: "basketball",      t: "Play Courts" },
    { icon: "microphone-stage",  t: "Open-Air Auditorium" }, { icon: "tree",       t: "Green Campus" },
  ];
  return (
    <section className="section" style={{ background: "var(--surface-raised)" }}>
      <div className="container container--wide">
        <div className="fac-layout" style={{ display: "grid", gridTemplateColumns: "1fr 1.1fr", gap: "var(--space-16)", alignItems: "center" }}>
          <Reveal>
            <Img src={IMG.faculty} alt="Campus facilities" style={{ borderRadius: "var(--radius-xl)", aspectRatio: "5/4", boxShadow: "var(--shadow-lg)" }} />
          </Reveal>
          <Reveal delay={100}>
            <Kicker>Campus &amp; Facilities</Kicker>
            <h2 style={{ fontSize: "var(--text-section)", fontWeight: 500, margin: "0.8rem 0 1.6rem", maxWidth: "18ch" }}>Everything a young mind needs to flourish</h2>
            <div className="fac-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: "0.8rem" }}>
              {fac.map((f) => (
                <div key={f.t}
                  onMouseEnter={(e) => { e.currentTarget.style.background = "var(--maroon-700)"; e.currentTarget.style.borderColor = "var(--maroon-700)"; e.currentTarget.querySelector(".fac-i").style.color = "var(--gold-300)"; e.currentTarget.querySelector(".fac-t").style.color = "var(--cream-50)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "var(--surface-card)"; e.currentTarget.style.borderColor = "var(--border-subtle)"; e.currentTarget.querySelector(".fac-i").style.color = "var(--gold-700)"; e.currentTarget.querySelector(".fac-t").style.color = "var(--text-primary)"; }}
                  style={{ display: "flex", alignItems: "center", gap: "0.8rem", background: "var(--surface-card)", border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-md)", padding: "0.85rem 1rem", cursor: "default", transition: "background var(--dur),border-color var(--dur)" }}>
                  <Icon name={f.icon} size={22} className="fac-i" style={{ color: "var(--gold-700)", transition: "color var(--dur)" }} />
                  <span className="fac-t" style={{ fontFamily: "var(--font-sans)", fontWeight: 500, fontSize: "0.92rem", color: "var(--text-primary)", transition: "color var(--dur)" }}>{f.t}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ─── Heritage Timeline ─── */
function Timeline() {
  const milestones = [
    { year: "1869",  t: "The school is founded",   d: "Established by the Gujarati community to bring quality education to Kozhikode." },
    { year: "1950s", t: "Recognition & growth",    d: "Becomes a recognised institution, expanding from primary to secondary." },
    { year: "1990s", t: "A serene new campus",     d: "The school grows into its eco-friendly campus near Mananchira." },
    { year: "Today", t: "Higher Secondary excellence", d: "Science & Commerce streams, modern labs and a 150-year living legacy." },
  ];
  const [active, setActive] = useState(0);
  return (
    <section className="section">
      <div className="container container--wide">
        <Reveal style={{ textAlign: "center", marginBottom: "var(--space-12)" }}>
          <Kicker>Since 1869</Kicker>
          <h2 style={{ fontSize: "var(--text-section)", fontWeight: 500, marginTop: "0.8rem" }}>One hundred and fifty years, one purpose</h2>
        </Reveal>
        <Reveal>
          <div style={{ position: "relative", display: "flex", justifyContent: "space-between", margin: "0 auto 2.6rem", maxWidth: 880 }}>
            <div style={{ position: "absolute", top: 13, left: "6%", right: "6%", height: 2, background: "var(--sand-300)" }} />
            <div style={{ position: "absolute", top: 13, left: "6%", width: `${(active / (milestones.length - 1)) * 88}%`, height: 2, background: "var(--gold-500)", transition: "width var(--dur-slow) var(--ease-out)" }} />
            {milestones.map((m, i) => (
              <button key={m.year} onClick={() => setActive(i)} style={{ position: "relative", zIndex: 1, background: "transparent", border: "none", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: "0.6rem", flex: 1 }}>
                <span style={{ width: 26, height: 26, borderRadius: "50%", background: i <= active ? "var(--gold-500)" : "var(--surface-card)", border: `2px solid ${i <= active ? "var(--gold-500)" : "var(--sand-400)"}`, display: "flex", alignItems: "center", justifyContent: "center", transition: "all var(--dur)" }}>
                  {i === active && <span style={{ width: 9, height: 9, borderRadius: "50%", background: "var(--maroon-900)" }} />}
                </span>
                <span style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "1.05rem", color: i === active ? "var(--maroon-800)" : "var(--text-muted)" }}>{m.year}</span>
              </button>
            ))}
          </div>
        </Reveal>
        <Reveal>
          <div style={{ maxWidth: 680, margin: "0 auto", textAlign: "center" }}>
            <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.7rem", fontWeight: 500, marginBottom: "0.7rem" }}>{milestones[active].t}</h3>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: "1.05rem", lineHeight: 1.7, color: "var(--text-secondary)" }}>{milestones[active].d}</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ─── Principal ─── */
function Principal({ onNavigate }) {
  return (
    <section className="section" style={{ background: "var(--maroon-950)", color: "var(--cream-50)" }}>
      <div className="container container--wide principal-grid" style={{ display: "grid", gridTemplateColumns: "0.8fr 1.2fr", gap: "var(--space-16)", alignItems: "center" }}>
        <Reveal>
          <div style={{ position: "relative", maxWidth: 360 }}>
            <Img src={IMG.principal} alt="Vimala Jayaraj, Principal" style={{ borderRadius: "var(--radius-xl)", aspectRatio: "4/5", boxShadow: "var(--shadow-xl)" }} />
            <div style={{ position: "absolute", bottom: "-18px", left: "-18px", background: "var(--gold-500)", color: "var(--ink-900)", borderRadius: "var(--radius-md)", padding: "0.7rem 1rem", fontFamily: "var(--font-display)", boxShadow: "var(--shadow-lg)" }}>
              <div style={{ fontSize: "1.05rem", fontWeight: 600, lineHeight: 1.1 }}>Vimala Jayaraj</div>
              <div style={{ fontFamily: "var(--font-sans)", fontSize: "0.72rem", letterSpacing: "0.1em", textTransform: "uppercase" }}>Principal</div>
            </div>
          </div>
        </Reveal>
        <Reveal delay={120}>
          <Kicker tone="inverse">Principal's Desk</Kicker>
          <Icon name="quotes" weight="fill" size={44} style={{ color: "var(--gold-400)", margin: "1.2rem 0 0.5rem", display: "block" }} />
          <p style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.3rem,1rem + 1.2vw,1.85rem)", lineHeight: 1.5, fontWeight: 400, fontStyle: "italic", color: "var(--cream-50)", marginBottom: "1.6rem", maxWidth: "34ch" }}>
            I am honoured to lead an institution that has been a beacon of education for over 153 years — nurturing the total development of each child in a serene, eco-friendly home of learning.
          </p>
          <Button variant="inverse" onClick={() => onNavigate("about")} iconRight={<Icon name="arrow-right" size={16} />}>Read the full message</Button>
        </Reveal>
      </div>
    </section>
  );
}

/* ─── Testimonials ─── */
function Testimonials() {
  const quotes = [
    { q: "The teachers know my daughter as an individual. She has grown in confidence and kindness in equal measure.", n: "Meera Nair",  r: "Parent, Class VI" },
    { q: "Gujarati gave me roots and wings — discipline, friendships and the curiosity that carried me to medical college.", n: "Arjun Menon", r: "Alumnus, 2016" },
    { q: "A green, calm campus where my son actually looks forward to going to school every morning.", n: "Priya Shah",   r: "Parent, Class III" },
  ];
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((p) => (p + 1) % quotes.length), 6000);
    return () => clearInterval(t);
  }, []);
  return (
    <section className="section">
      <div className="container container--narrow" style={{ textAlign: "center" }}>
        <Reveal>
          <Kicker>In their words</Kicker>
          <div style={{ position: "relative", marginTop: "2rem", minHeight: 200 }}>
            <p style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.4rem,1.1rem + 1.4vw,2.1rem)", lineHeight: 1.45, color: "var(--text-primary)", fontStyle: "italic", marginBottom: "1.8rem" }}>
              &ldquo;{quotes[i].q}&rdquo;
            </p>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.8rem" }}>
              <Avatar name={quotes[i].n} size="md" ring />
              <div style={{ textAlign: "left" }}>
                <div style={{ fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: "0.95rem" }}>{quotes[i].n}</div>
                <div style={{ fontFamily: "var(--font-sans)", fontSize: "0.82rem", color: "var(--text-muted)" }}>{quotes[i].r}</div>
              </div>
            </div>
          </div>
          <div style={{ display: "flex", gap: "0.5rem", justifyContent: "center", marginTop: "2rem" }}>
            {quotes.map((_, k) => (
              <button key={k} onClick={() => setI(k)} aria-label={`Quote ${k + 1}`} style={{ width: k === i ? 28 : 10, height: 10, borderRadius: "var(--radius-pill)", border: "none", cursor: "pointer", background: k === i ? "var(--maroon-700)" : "var(--sand-400)", transition: "all var(--dur)" }} />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ─── News & Events ─── */
function News({ onNavigate }) {
  const items = [
    { img: IMG.news_plusone, d: "27", m: "Jun", t: "Plus One Admission 2024-25",  c: "Admissions" },
    { img: IMG.news_mla,     d: "03", m: "Jul", t: "MLA's Excellence Award 2023", c: "Achievement" },
    { img: IMG.news_yoga,    d: "21", m: "Jun", t: "International Yoga Day",       c: "Event" },
    { img: IMG.news_ocean,   d: "08", m: "Jun", t: "World Ocean Day",              c: "Event" },
  ];
  return (
    <section className="section" style={{ background: "var(--surface-raised)" }}>
      <div className="container container--wide">
        <Reveal style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: "1rem", flexWrap: "wrap", marginBottom: "var(--space-12)" }}>
          <div>
            <Kicker>Latest happenings</Kicker>
            <h2 style={{ fontSize: "var(--text-section)", fontWeight: 500, marginTop: "0.8rem" }}>News &amp; Events</h2>
          </div>
          <Button variant="ghost" onClick={() => onNavigate("gallery")} iconRight={<Icon name="arrow-right" size={16} />}>View all news</Button>
        </Reveal>
        <div className="cards-4" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "var(--space-6)" }}>
          {items.map((n, i) => (
            <Reveal key={n.t} delay={i * 80} style={{ height: "100%" }}>
              <article
                onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.boxShadow = "var(--shadow-lg)"; const im = e.currentTarget.querySelector("img"); if (im) im.style.transform = "scale(1.06)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "var(--shadow-md)"; const im = e.currentTarget.querySelector("img"); if (im) im.style.transform = "scale(1)"; }}
                style={{ background: "var(--surface-card)", borderRadius: "var(--radius-lg)", overflow: "hidden", boxShadow: "var(--shadow-md)", height: "100%", display: "flex", flexDirection: "column", transition: "transform var(--dur) var(--ease-out),box-shadow var(--dur) var(--ease-out)" }}>
                <div style={{ position: "relative", overflow: "hidden" }}>
                  <Img src={n.img} alt={n.t} style={{ height: 170 }} />
                  <div style={{ position: "absolute", top: 12, left: 12, background: "var(--surface-card)", borderRadius: "var(--radius-sm)", padding: "0.35rem 0.6rem", textAlign: "center", boxShadow: "var(--shadow-sm)" }}>
                    <div style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "1.15rem", lineHeight: 1, color: "var(--maroon-800)" }}>{n.d}</div>
                    <div style={{ fontFamily: "var(--font-sans)", fontSize: "0.62rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-muted)" }}>{n.m}</div>
                  </div>
                </div>
                <div style={{ padding: "1.1rem 1.2rem 1.3rem", display: "flex", flexDirection: "column", gap: "0.6rem", flex: 1 }}>
                  <Badge tone="neutral" style={{ alignSelf: "flex-start" }}>{n.c}</Badge>
                  <h3 style={{ fontSize: "1.05rem", fontWeight: 600, lineHeight: 1.3 }}>{n.t}</h3>
                  <a style={{ marginTop: "auto", fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: "0.85rem", color: "var(--maroon-700)", cursor: "pointer", display: "inline-flex", gap: "0.3rem", alignItems: "center" }}>Read more <Icon name="arrow-right" size={14} /></a>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Admissions CTA ─── */
function AdmissionsCTA({ onNavigate }) {
  return (
    <section style={{ padding: "var(--section-y) 0" }}>
      <div className="container container--wide">
        <Reveal>
          <div style={{ position: "relative", overflow: "hidden", borderRadius: "var(--radius-2xl)", background: "linear-gradient(120deg,var(--maroon-800),var(--maroon-950))", padding: "clamp(2.5rem,5vw,4.5rem)", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "var(--space-12)", flexWrap: "wrap" }}>
            <img src="/assets/crest-cream.png" alt="" style={{ position: "absolute", right: "-40px", bottom: "-60px", height: "150%", opacity: 0.06 }} />
            <div style={{ position: "relative", maxWidth: "32ch" }}>
              <Badge tone="gold" dot style={{ background: "rgba(248,240,220,.16)", color: "var(--gold-300)", marginBottom: "1.2rem" }}>Admissions Open 2026-27</Badge>
              <h2 style={{ color: "var(--cream-50)", fontWeight: 500, fontSize: "clamp(1.9rem,1.3rem + 2.4vw,3rem)", lineHeight: 1.08 }}>Begin your child's journey with us</h2>
              <p style={{ fontFamily: "var(--font-sans)", color: "var(--maroon-100)", fontSize: "1.05rem", marginTop: "1rem", lineHeight: 1.6 }}>A warm, guided admissions experience — enquire today and book a visit to our campus.</p>
            </div>
            <div style={{ position: "relative", display: "flex", flexDirection: "column", gap: "0.85rem", minWidth: 240 }}>
              <Button size="lg" variant="accent" fullWidth onClick={() => onNavigate("admissions")} iconRight={<Icon name="arrow-right" size={18} />}>Apply Now</Button>
              <Button size="lg" variant="inverse" fullWidth onClick={() => onNavigate("contact")} iconLeft={<Icon name="calendar-check" size={18} />}>Book a Campus Visit</Button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ─── Page composition ─── */
export function HomePage({ onNavigate }) {
  return (
    <div>
      <Hero onNavigate={onNavigate} />
      <TrustBar />
      <About onNavigate={onNavigate} />
      <Glance />
      <Academics onNavigate={onNavigate} />
      <Facilities />
      <Timeline />
      <Principal onNavigate={onNavigate} />
      <Testimonials />
      <News onNavigate={onNavigate} />
      <AdmissionsCTA onNavigate={onNavigate} />
    </div>
  );
}
