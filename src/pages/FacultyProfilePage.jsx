import { useParams } from "react-router-dom";
import { ProfileHeader } from "../components/ProfileHeader";
import { ProfileSection } from "../components/ProfileSection";
import { TextLink, Label } from "../components/Ed";
import { useApi } from "../lib/useApi";
import { useDocumentMeta } from "../lib/useDocumentMeta";
import { lines } from "../lib/lists";
import { parseTrailingId, slugify, SITE_NAME } from "../../shared/meta/index.js";

export function FacultyProfilePage({ onNavigate }) {
  const { slug } = useParams();
  const id = parseTrailingId(slug);
  const { data: f, loading, error } = useApi(id ? `faculty/${id}` : "faculty/0");
  const notFound = !loading && (error || !f);
  const canonical = f ? `${window.location.origin}/faculty/${slugify(f.name)}-${f.id}` : undefined;
  const role = f && (f.designation || f.subject) ? (f.designation || f.subject) : "";

  useDocumentMeta({
    title: f ? [f.name, role, SITE_NAME].filter(Boolean).join(" — ") : `Faculty — ${SITE_NAME}`,
    canonical,
    robots: notFound ? "noindex,follow" : undefined,
  });

  if (loading) return <div className="section"><div className="container container--wide">Loading…</div></div>;

  if (notFound) {
    return (
      <div className="section">
        <div className="container container--wide" style={{ maxWidth: "52ch" }}>
          <Label>Faculty</Label>
          <h1 style={{ fontSize: "clamp(1.8rem,1.3rem + 2vw,3rem)", fontWeight: 400, margin: "1rem 0" }}>This profile isn’t available.</h1>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: "1.12rem", lineHeight: 1.7, color: "var(--text-secondary)", marginBottom: "1.6rem" }}>
            The faculty member you’re looking for may have moved. See our full faculty.
          </p>
          <TextLink onClick={() => onNavigate("faculty")}>View all faculty</TextLink>
        </div>
      </div>
    );
  }

  const subjects = lines(f.subjects);
  const subjectItems = subjects.length ? subjects : (f.subject ? [f.subject] : []);
  return (
    <div>
      <ProfileHeader photo={f.photo_url} name={f.name} role={role} crumb={f.department || "Faculty"} />
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container container--narrow">
          <ProfileSection title="About" text={f.bio} />
          <ProfileSection title="Qualification" items={lines(f.qualification)} />
          <ProfileSection title="Experience" text={f.experience} />
          <ProfileSection title="Subjects" items={subjectItems} />
          <ProfileSection title="Areas of Expertise" items={lines(f.expertise)} />
          <ProfileSection title="Achievements" items={lines(f.achievements)} />
          <ProfileSection title="Certifications" items={lines(f.certifications)} />
          <ProfileSection title="Languages Known" items={lines(f.languages)} />
          {(f.email || f.office_hours) && (
            <ProfileSection title="Contact" items={[f.email, f.office_hours && `Office hours: ${f.office_hours}`].filter(Boolean)} />
          )}
          <div style={{ marginTop: "var(--space-12)" }}>
            <TextLink onClick={() => onNavigate("faculty")}>← All faculty</TextLink>
          </div>
        </div>
      </section>
    </div>
  );
}
