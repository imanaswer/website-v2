import { useMemo, useState } from "react";
import { Img } from "../components/Img";
import { Reveal } from "../components/Reveal";
import { PageHero } from "../components/PageHero";
import { TextLink, Label } from "../components/Ed";
import { useApi } from "../lib/useApi";
import { normalizeFaculty, departmentsOf, filterSortGroup } from "../lib/faculty";
import { ProfileCard } from "../components/ProfileCard";

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

/* Curated fallback (with full photo URLs) used until the database is connected. */
const FALLBACK_DEPARTMENTS = DEPARTMENTS.map((d) => ({
  name: d.name,
  people: d.people.map((p) => ({ ...p, img: BASE + p.img })),
}));

/* Flatten the curated fallback into normalizeFaculty's row shape (no ids -> not
 * clickable) so the same pipeline drives both DB and fallback content. */
function fallbackRows() {
  const rows = [];
  for (const d of FALLBACK_DEPARTMENTS) {
    for (const p of d.people) rows.push({ name: p.n, subject: p.s, department: d.name, photo_url: p.img, active: true });
  }
  return rows;
}

function Toolbar({ query, setQuery, department, setDepartment, sort, setSort, departments }) {
  return (
    <div className="faculty-toolbar" style={{ display: "flex", flexWrap: "wrap", gap: "1rem", alignItems: "flex-end" }}>
      <label style={{ flex: "1 1 220px", display: "flex", flexDirection: "column", gap: "0.35rem" }}>
        <span className="label">Search</span>
        <input type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search by name" aria-label="Search faculty by name"
          style={{ padding: "0.7rem 0.9rem", border: "1px solid var(--border-strong)", borderRadius: 8, fontFamily: "var(--font-sans)", fontSize: "1rem", background: "var(--surface-card)" }} />
      </label>
      <label style={{ display: "flex", flexDirection: "column", gap: "0.35rem" }}>
        <span className="label">Department</span>
        <select value={department} onChange={(e) => setDepartment(e.target.value)} aria-label="Filter by department"
          style={{ padding: "0.7rem 0.9rem", border: "1px solid var(--border-strong)", borderRadius: 8, fontFamily: "var(--font-sans)", fontSize: "1rem", background: "var(--surface-card)" }}>
          <option value="">All departments</option>
          {departments.map((d) => <option key={d} value={d}>{d}</option>)}
        </select>
      </label>
      <label style={{ display: "flex", flexDirection: "column", gap: "0.35rem" }}>
        <span className="label">Sort</span>
        <select value={sort} onChange={(e) => setSort(e.target.value)} aria-label="Sort faculty"
          style={{ padding: "0.7rem 0.9rem", border: "1px solid var(--border-strong)", borderRadius: 8, fontFamily: "var(--font-sans)", fontSize: "1rem", background: "var(--surface-card)" }}>
          <option value="default">Default order</option>
          <option value="name-asc">Name A–Z</option>
          <option value="name-desc">Name Z–A</option>
        </select>
      </label>
    </div>
  );
}

function PrincipalFeature() {
  return (
    <section className="section">
      <div className="container container--narrow">
        <Reveal>
          <div className="ed-2col principal-feature" style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: "var(--space-12)", alignItems: "center" }}>
            <div className="principal-photo-wrapper">
              <div className="photo photo-frame">
                <Img src={PRINCIPAL} alt="Vimala Jayaraj, Principal" style={{ aspectRatio: "4/5" }} />
              </div>
            </div>
            <div className="principal-text-wrapper">
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
          <div className="faculty-grid">
            {dept.people.map((p) => (
              <ProfileCard key={p.id ?? p.name} person={{ id: p.id, name: p.name, photo: p.photo, role: p.subject }} basePath="/faculty" />
            ))}
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
  const { data } = useApi("faculty");
  const [query, setQuery] = useState("");
  const [department, setDepartment] = useState("");
  const [sort, setSort] = useState("default");

  const people = useMemo(
    () => normalizeFaculty(Array.isArray(data) && data.length ? data : fallbackRows()),
    [data]
  );
  const departments = useMemo(() => departmentsOf(people), [people]);
  const groups = useMemo(() => filterSortGroup(people, { query, department, sort }), [people, query, department, sort]);

  return (
    <div>
      <PageHero onNavigate={onNavigate} crumb="Faculty" eyebrow="Our Faculty"
        title="The teachers behind every child"
        lead="A dedicated faculty across languages, the sciences, commerce, computing and the arts — guided by our Principal, Vimala Jayaraj."
        image={HERO} />
      <PrincipalFeature />
      <section className="section" style={{ paddingBottom: 0 }}>
        <div className="container container--wide">
          <Toolbar query={query} setQuery={setQuery} department={department} setDepartment={setDepartment}
            sort={sort} setSort={setSort} departments={departments} />
        </div>
      </section>
      {groups.length === 0 ? (
        <section className="section"><div className="container container--wide"><p style={{ color: "var(--text-secondary)" }}>No faculty match your search.</p></div></section>
      ) : (
        groups.map((dept, i) => <Department key={dept.name} dept={dept} index={i} />)
      )}
      <FacultyCTA onNavigate={onNavigate} />
    </div>
  );
}
