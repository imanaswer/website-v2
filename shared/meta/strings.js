/* Pure string helpers for metadata. No DOM, no Node, no side effects. */

export function slugify(text) {
  return (
    String(text || "")
      .toLowerCase()
      .normalize("NFKD")
      .replace(/[̀-ͯ]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 80) || "item"
  );
}

export function truncate(text, max = 180) {
  const s = String(text || "").replace(/\s+/g, " ").trim();
  if (s.length <= max) return s;
  const clipped = s.slice(0, max);
  const lastSpace = clipped.lastIndexOf(" ");
  const base = lastSpace > max * 0.6 ? clipped.slice(0, lastSpace) : clipped;
  return base.replace(/[.,;:!?\-\s]+$/, "") + "…";
}

export function parseTrailingId(slug) {
  const m = String(slug || "").match(/(?:^|-)(\d+)$/);
  return m ? Number(m[1]) : null;
}

export function escapeHtml(value) {
  return String(value == null ? "" : value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
