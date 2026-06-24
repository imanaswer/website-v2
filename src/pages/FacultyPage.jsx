import { Img } from "../components/Img";
import { Reveal } from "../components/Reveal";
import { PageHero } from "../components/PageHero";
import { TextLink, Label } from "../components/Ed";

const BASE = "https://www.srigujaratividhyalaya.com/wp-content/uploads/2023/07/";
const HERO = "https://www.srigujaratividhyalaya.com/wp-content/themes/gujarati/images/Faculty_.jpg";
const PRINCIPAL = "https://www.srigujaratividhyalaya.com/wp-content/uploads/2023/05/vimala-jayaraj.jpg";

/* Real faculty — names, subjects and photos published on the school's site. */
const DEPARTMENTS = [
  {
    name: "Languages",
    people: [
      { n: "Poonam S Desai", s: "English",   img: "POONAM-S-DESAI.jpg" },
      { n: "Gayathri K S",   s: "English",   img: "GAYATHRI-K-S.jpg" },
      { n: "Prizy George",   s: "Malayalam", img: "PRIZY-GEORGE-1.jpg" },
      { n: "Bijina I K",     s: "Hindi",     img: "BIJINA-I-K.jpg" },
      { n: "Adita D Shah",   s: "Gujarathi", img: "ADITA-D-SHAH.jpg" },
    ],
  },
  {
    name: "Mathematics & Sciences",
    people: [
      { n: "Jasna P",      s: "Mathematics",    img: "JASNA-P.jpg" },
      { n: "Jissy Joseph", s: "Physics",        img: "JISSY-JOSEPH.jpg" },
      { n: "Shimna K",     s: "Biology",        img: "SHIMNA-K.jpg" },
      { n: "Nisha C",      s: "Social Science", img: "NISHA-C.jpg" },
    ],
  },
  {
    name: "Commerce",
    people: [
      { n: "Roshni Shalet D Mello", s: "Economics",       img: "ROSHNI-SHALET-D.jpg" },
      { n: "Namitha A K",           s: "Accountancy",     img: "NAMITHA-A-K.jpg" },
      { n: "P V Neethu",            s: "Business Studies", img: "P-V-NEETHU.jpg" },
    ],
  },
  {
    name: "Computer Science",
    people: [
      { n: "Sunitha Kumari TK", s: "Computer", img: "SUNITHA-KUMARI-T.jpg" },
      { n: "Supriya M",         s: "Computer", img: "SUPRIYA-M.jpg" },
      { n: "Megha K",           s: "Computer", img: "MEGHA-K.jpg" },
    ],
  },
  {
    name: "Early Years & Arts",
    people: [
      { n: "Vishnupriya K", s: "Montessori", img: "VISHNUPRIYA-K.jpg" },
      { n: "Mary Tom",      s: "Montessori", img: "MARY-TOM.jpg" },
      { n: "Dhanya C",      s: "Drawing",    img: "DHANYA-C.jpg" },
    ],
  },
];

function PersonCard({ p }) {
  return (
    <figure style={{ margin: 0 }}>
      <div className="photo photo-frame">
        <Img src={BASE + p.img} alt={`${p.n}, ${p.s}`} style={{ aspectRatio: "1/1" }} />
      </div>
      <figcaption style={{ marginTop: "0.9rem" }}>
        <div style={{ fontFamily: "var(--font-serif)", fontSize: "1.2rem", color: "var(--text-primary)", lineHeight: 1.25 }}>{p.n}</div>
        <div className="label" style={{ marginTop: "0.35rem", color: "var(--gold-700)" }}>{p.s}</div>
      </figcaption>
    </figure>
  );
}

function PrincipalFeature() {
  return (
    <section className="section">
      <div className="container container--narrow">
        <Reveal>
          <div className="ed-2col" style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: "var(--space-12)", alignItems: "center" }}>
            <div style={{ width: "clamp(130px,18vw,200px)" }}>
              <div className="photo photo-frame">
                <Img src={PRINCIPAL} alt="Vimala Jayaraj, Principal" style={{ aspectRatio: "4/5" }} />
              </div>
            </div>
            <div>
              <Label>Leadership</Label>
              <h2 style={{ fontSize: "clamp(1.8rem,1.3rem + 1.8vw,2.8rem)", fontWeight: 400, margin: "1rem 0 0.4rem" }}>Vimala Jayaraj</h2>
              <div className="label" style={{ color: "var(--gold-700)" }}>Principal</div>
              <p style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.25rem,1.05rem + 0.9vw,1.7rem)", lineHeight: 1.5, color: "var(--text-secondary)", marginTop: "1.4rem", maxWidth: "44ch" }}>
                A faculty that knows every child as an individual — teaching with the patience and
                care that a 150-year-old institution expects.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Department({ dept, index }) {
  return (
    <section className="section" style={index % 2 === 1 ? { background: "var(--surface-raised)" } : undefined}>
      <div className="container container--wide">
        <Reveal>
          <div style={{ display: "flex", alignItems: "baseline", gap: "1.2rem", marginBottom: "var(--space-10)" }}>
            <Label>{dept.name}</Label>
            <span className="rule" style={{ flex: 1 }} />
          </div>
        </Reveal>
        <Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(168px, 1fr))", gap: "clamp(1.4rem,2.5vw,2.4rem)" }}>
            {dept.people.map((p) => <PersonCard key={p.n} p={p} />)}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function FacultyCTA({ onNavigate }) {
  return (
    <section className="section">
      <div className="container container--wide">
        <Reveal>
          <div className="ed-2col" style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: "var(--space-12)", alignItems: "center", borderTop: "1px solid var(--border-strong)", borderBottom: "1px solid var(--border-strong)", padding: "clamp(2.5rem,5vw,4.5rem) 0" }}>
            <h2 style={{ fontSize: "clamp(1.8rem,1.3rem + 2vw,3rem)", fontWeight: 400, maxWidth: "18ch", lineHeight: 1.1 }}>
              Teaching that shapes a lifetime.
            </h2>
            <div>
              <TextLink onClick={() => onNavigate("admissions")}>Enquire about admissions</TextLink>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function FacultyPage({ onNavigate }) {
  return (
    <div>
      <PageHero onNavigate={onNavigate} crumb="Faculty" eyebrow="Our Faculty"
        title="The teachers behind every child"
        lead="A dedicated faculty across languages, the sciences, commerce, computing and the arts — guided by our Principal, Vimala Jayaraj."
        image={HERO} />
      <PrincipalFeature />
      {DEPARTMENTS.map((dept, i) => <Department key={dept.name} dept={dept} index={i} />)}
      <FacultyCTA onNavigate={onNavigate} />
    </div>
  );
}
