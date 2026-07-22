import { useParams } from "react-router-dom";
import { Reveal } from "../components/Reveal";
import { PageHero } from "../components/PageHero";
import { TextLink, Label } from "../components/Ed";
import { ShareBar } from "../components/ShareBar";
import { useApi } from "../lib/useApi";
import { useDocumentMeta } from "../lib/useDocumentMeta";
import { parseTrailingId, slugify, SITE_NAME } from "../../shared/meta/index.js";

const FALLBACK_HERO = "/assets/photos/classroom.jpg";

function fmtDate(d) {
  if (!d) return "";
  const date = new Date(d);
  return Number.isNaN(date.getTime())
    ? ""
    : date.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric", timeZone: "UTC" });
}

export function JobDetailPage({ onNavigate }) {
  const { slug } = useParams();
  const id = parseTrailingId(slug);
  const { data: job, loading, error } = useApi(id ? `jobs/${id}` : "jobs/0");

  const notFound = !loading && (error || !job);
  const canonical = job ? `${window.location.origin}/careers/${slugify(job.role)}-${job.id}` : undefined;

  useDocumentMeta({
    title: job ? `${job.role} — ${SITE_NAME}` : `Careers — ${SITE_NAME}`,
    canonical,
    robots: notFound ? "noindex,follow" : undefined,
  });

  if (loading) {
    return (
      <div className="section">
        <div className="container container--wide">Loading…</div>
      </div>
    );
  }

  if (notFound) {
    return (
      <div className="section">
        <div className="container container--wide" style={{ maxWidth: "52ch" }}>
          <Label>Careers</Label>
          <h1 style={{ fontSize: "clamp(1.8rem,1.3rem + 2vw,3rem)", fontWeight: 400, margin: "1rem 0" }}>
            This opening is no longer available.
          </h1>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: "1.12rem", lineHeight: 1.7, color: "var(--text-secondary)", marginBottom: "1.6rem" }}>
            The role you're looking for may have closed or been filled. See our current openings, or send us your CV.
          </p>
          <TextLink onClick={() => onNavigate("careers")}>View current openings</TextLink>
        </div>
      </div>
    );
  }

  const facts = [job.type, job.location].filter(Boolean).join(" · ");
  return (
    <div>
      <PageHero
        onNavigate={onNavigate}
        crumb="Careers"
        eyebrow={job.department || "Careers"}
        title={job.role}
        lead={facts}
        image={job.og_image || FALLBACK_HERO}
      />
      <section className="section">
        <div className="container container--wide">
          <div className="ed-2col" style={{ display: "grid", gridTemplateColumns: "8fr 4fr", gap: "var(--space-12)" }}>
            <div>
              {fmtDate(job.closes_on) && (
                <Reveal>
                  <div className="label" style={{ color: "var(--gold-700)", marginBottom: "1.4rem" }}>
                    Closes {fmtDate(job.closes_on)}
                  </div>
                </Reveal>
              )}
              <Reveal>
                <div className="measure" style={{ fontFamily: "var(--font-sans)", fontSize: "1.12rem", lineHeight: 1.7, color: "var(--text-secondary)", whiteSpace: "pre-wrap" }}>
                  {job.description || "Details for this role are available on request — please get in touch."}
                </div>
              </Reveal>
              <Reveal>
                <div style={{ marginTop: "var(--space-10)" }}>
                  <TextLink onClick={() => onNavigate("contact")}>Apply for this role</TextLink>
                </div>
              </Reveal>
            </div>
            <aside style={{ alignSelf: "start", position: "sticky", top: 110, display: "flex", flexDirection: "column", gap: "var(--space-8)" }}>
              <div>
                <Label>Share</Label>
                <div className="rule--gold" style={{ margin: "1rem 0" }} />
                {canonical && <ShareBar url={canonical} />}
              </div>
              <TextLink onClick={() => onNavigate("careers")}>← All openings</TextLink>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}
