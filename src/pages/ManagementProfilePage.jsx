import { useParams } from "react-router-dom";
import { ProfileLayout } from "../components/ProfileLayout";
import { TextLink, Label } from "../components/Ed";
import { useApi } from "../lib/useApi";
import { useDocumentMeta } from "../lib/useDocumentMeta";
import { lines } from "../lib/lists";
import { parseTrailingId, slugify, SITE_NAME } from "../../shared/meta/index.js";

export function ManagementProfilePage({ onNavigate }) {
  const { slug } = useParams();
  const id = parseTrailingId(slug);
  const { data: m, loading, error } = useApi(id ? `management/${id}` : "management/0");
  const notFound = !loading && (error || !m);
  const canonical = m ? `${window.location.origin}/management/${slugify(m.name)}-${m.id}` : undefined;

  useDocumentMeta({
    title: m ? [m.name, m.position, SITE_NAME].filter(Boolean).join(" — ") : `School Management — ${SITE_NAME}`,
    canonical,
    robots: notFound ? "noindex,follow" : undefined,
  });

  if (loading) return <div className="section"><div className="container container--wide">Loading…</div></div>;

  if (notFound) {
    return (
      <div className="section">
        <div className="container container--wide" style={{ maxWidth: "52ch" }}>
          <Label>School Management</Label>
          <h1 style={{ fontSize: "clamp(1.8rem,1.3rem + 2vw,3rem)", fontWeight: 400, margin: "1rem 0" }}>This profile isn’t available.</h1>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: "1.12rem", lineHeight: 1.7, color: "var(--text-secondary)", marginBottom: "1.6rem" }}>
            See our full leadership team.
          </p>
          <TextLink onClick={() => onNavigate("management")}>View School Management</TextLink>
        </div>
      </div>
    );
  }

  const facts = [
    { label: "Years of service", value: m.years_of_service },
    { label: "Email", value: m.email ? <a href={`mailto:${m.email}`}>{m.email}</a> : "" },
  ];

  const details = [
    { title: "Education", items: lines(m.education) },
    { title: "Responsibilities", items: lines(m.responsibilities) },
    { title: "Achievements", items: lines(m.achievements) },
  ];

  return (
    <ProfileLayout
      crumb="School Management"
      name={m.name}
      role={m.position}
      photo={m.photo_url}
      facts={facts}
      lead={m.bio}
      highlight={m.message}
      details={details}
      backLabel="School Management"
      onBack={() => onNavigate("management")}
    />
  );
}
