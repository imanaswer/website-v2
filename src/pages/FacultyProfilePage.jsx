import { useParams } from "react-router-dom";
import { ProfileLayout } from "../components/ProfileLayout";
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
  const languages = lines(f.languages);

  const facts = [
    { label: "Department", value: f.department },
    { label: "Experience", value: f.experience },
    { label: "Languages", value: languages.join(" · ") },
    { label: "Office hours", value: f.office_hours },
    { label: "Email", value: f.email ? <a href={`mailto:${f.email}`}>{f.email}</a> : "" },
  ];

  const details = [
    { title: "Qualification", items: lines(f.qualification) },
    { title: "Subjects", items: subjectItems },
    { title: "Areas of Expertise", items: lines(f.expertise) },
    { title: "Achievements", items: lines(f.achievements) },
    { title: "Certifications", items: lines(f.certifications) },
  ];

  return (
    <ProfileLayout
      crumb="Faculty"
      name={f.name}
      role={role}
      photo={f.photo_url}
      facts={facts}
      lead={f.bio}
      details={details}
      backLabel="All faculty"
      onBack={() => onNavigate("faculty")}
    />
  );
}
