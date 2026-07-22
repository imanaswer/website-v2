import { PageHero } from "../components/PageHero";
import { Reveal } from "../components/Reveal";
import { Label } from "../components/Ed";
import { ProfileCard } from "../components/ProfileCard";
import { useApi } from "../lib/useApi";
import { useDocumentMeta } from "../lib/useDocumentMeta";
import { SITE_NAME } from "../../shared/meta/index.js";

const HERO = "/assets/photos/classroom.jpg";

export function ManagementPage({ onNavigate }) {
  const { data } = useApi("management");
  const people = (Array.isArray(data) ? data : []).map((m) => ({ id: m.id, name: m.name, photo: m.photo_url || "", role: m.position || "" }));

  useDocumentMeta({
    title: `School Management — ${SITE_NAME}`,
    canonical: `${window.location.origin}/management`,
  });

  return (
    <div>
      <PageHero onNavigate={onNavigate} crumb="School Management" eyebrow="Leadership"
        title="The people who steer the school"
        lead="Our trustees, office-bearers and executive committee — the leadership behind a 150-year-old institution."
        image={HERO} />
      <section className="section">
        <div className="container container--wide">
          {people.length === 0 ? (
            <Reveal><p style={{ color: "var(--text-secondary)" }}>Our leadership team will be published here shortly.</p></Reveal>
          ) : (
            <>
              <Reveal>
                <div style={{ display: "flex", alignItems: "baseline", gap: "1.2rem", marginBottom: "var(--space-10)" }}>
                  <Label>Leadership Team</Label>
                  <span className="rule" style={{ flex: 1 }} />
                </div>
              </Reveal>
              <Reveal>
                <div className="faculty-grid">
                  {people.map((p) => <ProfileCard key={p.id ?? p.name} person={p} basePath="/management" />)}
                </div>
              </Reveal>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
