import { ORGANIZATION, absoluteUrl } from "./site.js";

/* Maps the admin's Type select options to schema.org's employmentType enum. */
const EMPLOYMENT_TYPE = {
  "Full-time": "FULL_TIME",
  "Part-time": "PART_TIME",
  Contract: "CONTRACTOR",
  Temporary: "TEMPORARY",
};

/* Reusable Organization node — also usable as a standalone schema later. */
export function organizationNode(origin) {
  return {
    "@type": "Organization",
    name: ORGANIZATION.name,
    sameAs: absoluteUrl(origin, "/"),
    logo: absoluteUrl(origin, ORGANIZATION.logoPath),
  };
}

/* true = future, false = past, null = absent/invalid (compared date-only, UTC). */
function dateIsFuture(dateStr) {
  if (!dateStr) return null;
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return null;
  const now = new Date();
  const todayUtc = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
  return d.getTime() >= todayUtc;
}

/*
 * JobPosting builder. Returns null when required fields are missing or the
 * posting has already closed (a past validThrough makes Google drop it).
 */
function jobPosting(job, { origin } = {}) {
  const title = job.role;
  const description = (job.description || "").trim();
  const datePosted = job.created_at;
  if (!title || !description || !datePosted) return null;

  const future = dateIsFuture(job.closes_on);
  if (job.closes_on && future === false) return null;

  const node = {
    "@context": "https://schema.org/",
    "@type": "JobPosting",
    title,
    description,
    datePosted: new Date(datePosted).toISOString(),
    hiringOrganization: organizationNode(origin),
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        streetAddress: job.location || undefined,
        addressLocality: ORGANIZATION.address.locality,
        addressRegion: ORGANIZATION.address.region,
        addressCountry: ORGANIZATION.address.country,
      },
    },
    identifier: { "@type": "PropertyValue", name: ORGANIZATION.name, value: String(job.id) },
  };

  if (job.closes_on && future) node.validThrough = new Date(job.closes_on).toISOString();
  const emp = EMPLOYMENT_TYPE[job.type];
  if (emp) node.employmentType = emp;
  return node;
}

/* Registry of schema.org builders. Add Article/Event/Person here later. */
export const JSONLD_BUILDERS = { JobPosting: jobPosting };

/* Entity-agnostic JSON-LD entry point. Unknown type or null result → null. */
export function buildJsonLd(schemaType, entity, ctx = {}) {
  const builder = JSONLD_BUILDERS[schemaType];
  return builder ? builder(entity, ctx) : null;
}
