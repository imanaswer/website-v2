import { sql } from "./_lib/db.js";
import { injectMeta, fetchIndexHtml, originFromReq } from "./_lib/render-meta.js";
import { resolveMetadata, metaConfig, parseTrailingId } from "../shared/meta/index.js";

/*
 * Generic, entity-agnostic metadata endpoint. A vercel.json rewrite maps each
 * public detail URL (e.g. /careers/:slug) here with ?type=...&slug=.... We fetch
 * the row, inject per-entity OG + JSON-LD into index.html for crawlers, and serve
 * HTML that also boots the SPA for humans. Never 5xx: on any problem we serve the
 * unmodified shell so the page still works.
 */
export default async function handler(req, res) {
  const origin = originFromReq(req);
  const html = await fetchIndexHtml(origin);

  // Could not fetch our own shell (broken deploy) — last-resort redirect home.
  if (!html) {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.setHeader("Cache-Control", "no-store");
    return res.end('<!doctype html><meta http-equiv="refresh" content="0; url=/"><title>Loading…</title>');
  }

  const serveFallback = () => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.setHeader("Cache-Control", "no-store"); // never pin a generic card onto a real URL
    res.end(html);
  };

  try {
    const type = String(req.query.type || "");
    const slug = String(req.query.slug || "");
    const config = metaConfig(type);
    const id = parseTrailingId(slug);
    if (!config || !id) return serveFallback();

    const rows = config.publicFilter
      ? await sql`select * from ${sql(config.table)} where ${sql(config.lookupField)} = ${id} and ${sql(config.publicFilter)} = true`
      : await sql`select * from ${sql(config.table)} where ${sql(config.lookupField)} = ${id}`;
    const row = rows[0];
    if (!row) return serveFallback();

    const out = injectMeta(html, resolveMetadata(type, row, { origin }));
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.setHeader("Cache-Control", "public, s-maxage=300, stale-while-revalidate=600");
    res.end(out);
  } catch (e) {
    console.error("[api/meta]", e);
    serveFallback();
  }
}
