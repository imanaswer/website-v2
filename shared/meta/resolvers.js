import { slugify, truncate } from "./strings.js";
import { buildJsonLd } from "./jsonld.js";
import { SITE_NAME, CAREERS_DESCRIPTION, DEFAULT_OG_IMAGE, absoluteUrl } from "./site.js";

/* OG description priority: explicit SEO field → trimmed body → Dept • Type •
 * Location → site-wide careers default. (seo_description is a future column; the
 * resolver already honors it so adding it later needs only a parse + admin field.) */
function jobDescription(job) {
  if (job.seo_description) return truncate(job.seo_description, 200);
  if (job.description && job.description.trim()) return truncate(job.description, 200);
  const facts = [job.department, job.type, job.location].filter(Boolean).join(" • ");
  return facts || CAREERS_DESCRIPTION;
}

function jobCanonicalPath(job) {
  return `/careers/${slugify(job.role)}-${job.id}`;
}

function jobResolver(job, ctx = {}) {
  const { origin } = ctx;
  const url = absoluteUrl(origin, jobCanonicalPath(job));
  const hasOwnImage = Boolean(job.og_image);
  return {
    title: `${job.role} — ${SITE_NAME}`,
    description: jobDescription(job),
    image: hasOwnImage ? absoluteUrl(origin, job.og_image) : absoluteUrl(origin, DEFAULT_OG_IMAGE.path),
    imageWidth: hasOwnImage ? undefined : DEFAULT_OG_IMAGE.width,
    imageHeight: hasOwnImage ? undefined : DEFAULT_OG_IMAGE.height,
    url,
    canonical: url,
    robots: "index,follow",
    type: "website",
    jsonLd: buildJsonLd("JobPosting", job, ctx),
  };
}

/*
 * Entity-agnostic registry. Each entry: how to turn a DB row into a meta object,
 * its canonical path builder, and the table/lookup config the server uses. Add a
 * shareable type by adding one entry here (+ a vercel.json rewrite + a page).
 */
export const META_RESOLVERS = {
  jobs: {
    resolver: jobResolver,
    canonicalPath: jobCanonicalPath,
    table: "jobs",
    publicFilter: "published",
    lookupField: "id",
  },
};

export function resolveMetadata(type, entity, ctx = {}) {
  const entry = META_RESOLVERS[type];
  if (!entry || !entity) return null;
  return entry.resolver(entity, ctx);
}

export function metaConfig(type) {
  return META_RESOLVERS[type] || null;
}
