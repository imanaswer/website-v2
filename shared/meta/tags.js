import { escapeHtml } from "./strings.js";

/*
 * Serialize a meta object into an array of <head> tag strings. Single source of
 * truth for how a meta object becomes HTML. Pure: same input → same output.
 *
 * Meta shape:
 *   { title, description, image, imageWidth, imageHeight, url, canonical,
 *     robots, type, jsonLd }
 */
export function tagsFromMeta(meta = {}) {
  const e = escapeHtml;
  const tags = [];

  if (meta.title) tags.push(`<meta property="og:title" content="${e(meta.title)}" />`);
  if (meta.description) tags.push(`<meta property="og:description" content="${e(meta.description)}" />`);
  if (meta.url) tags.push(`<meta property="og:url" content="${e(meta.url)}" />`);
  tags.push(`<meta property="og:type" content="${e(meta.type || "website")}" />`);

  if (meta.image) {
    tags.push(`<meta property="og:image" content="${e(meta.image)}" />`);
    if (meta.imageWidth) tags.push(`<meta property="og:image:width" content="${e(meta.imageWidth)}" />`);
    if (meta.imageHeight) tags.push(`<meta property="og:image:height" content="${e(meta.imageHeight)}" />`);
  }

  tags.push(`<meta name="twitter:card" content="summary_large_image" />`);
  if (meta.title) tags.push(`<meta name="twitter:title" content="${e(meta.title)}" />`);
  if (meta.description) tags.push(`<meta name="twitter:description" content="${e(meta.description)}" />`);
  if (meta.image) tags.push(`<meta name="twitter:image" content="${e(meta.image)}" />`);

  if (meta.canonical) tags.push(`<link rel="canonical" href="${e(meta.canonical)}" />`);
  if (meta.robots) tags.push(`<meta name="robots" content="${e(meta.robots)}" />`);
  if (meta.jsonLd) tags.push(`<script type="application/ld+json">${jsonLdString(meta.jsonLd)}</script>`);

  return tags;
}

/* JSON-LD goes inside a <script> as JSON (not HTML-escaped); only neutralize a
 * literal </script> so a string value can't break out of the element. */
function jsonLdString(obj) {
  return JSON.stringify(obj).replace(/<\/(script)/gi, "<\\/$1");
}
