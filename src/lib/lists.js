/* Split a newline-separated textarea value into a clean list of items.
 * Used to render qualification / subjects / achievements etc. from a single
 * text column (the admin form has no array widget). */
export function lines(value) {
  return String(value || "")
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);
}
