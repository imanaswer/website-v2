import { tagsFromMeta } from "../../shared/meta/index.js";

/*
 * Inject metadata <head> tags into an HTML document string. First strips any
 * existing managed tags (so a generic fallback in index.html can't duplicate the
 * per-entity values), then inserts our tags just before </head>. Pure transform.
 */
export function injectMeta(html, meta) {
  if (!meta) return html;

  const doc = html
    .replace(/\s*<meta[^>]+property="og:[^"]*"[^>]*>/gi, "")
    .replace(/\s*<meta[^>]+name="twitter:[^"]*"[^>]*>/gi, "")
    .replace(/\s*<meta[^>]+name="robots"[^>]*>/gi, "")
    .replace(/\s*<link[^>]+rel="canonical"[^>]*>/gi, "")
    .replace(/\s*<script[^>]+type="application\/ld\+json"[^>]*>[\s\S]*?<\/script>/gi, "");

  const block = tagsFromMeta(meta).map((t) => "    " + t).join("\n");
  if (!block) return doc;
  const idx = doc.indexOf("</head>");
  if (idx === -1) return doc;
  return doc.slice(0, idx) + block + "\n  " + doc.slice(idx);
}

/* The deployment's own index.html, fetched so Vite's hashed asset refs stay
 * intact. Returns null on any failure (caller falls back). */
export async function fetchIndexHtml(origin) {
  try {
    const res = await fetch(`${origin}/index.html`, { headers: { "user-agent": "sgv-meta-injector" } });
    if (!res.ok) return null;
    return await res.text();
  } catch {
    return null;
  }
}

/* Reconstruct the public origin from proxy headers. */
export function originFromReq(req) {
  const proto = req.headers["x-forwarded-proto"] || "https";
  const host = req.headers["x-forwarded-host"] || req.headers.host;
  return `${proto}://${host}`;
}
