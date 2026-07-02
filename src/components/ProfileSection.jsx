import { Reveal } from "./Reveal";
import { Label } from "./Ed";

/* A titled profile block. Renders nothing when it has no content, so profile
 * pages never show empty headers. `items` renders as a list; `text` as a
 * paragraph (both optional). */
export function ProfileSection({ title, text, items }) {
  const list = Array.isArray(items) ? items.filter(Boolean) : [];
  const hasText = Boolean(text && String(text).trim());
  if (!hasText && list.length === 0) return null;
  return (
    <Reveal>
      <section style={{ marginTop: "var(--space-10)" }}>
        <Label>{title}</Label>
        <div className="rule--gold" style={{ margin: "1rem 0" }} />
        {hasText && (
          <p style={{ fontFamily: "var(--font-sans)", fontSize: "1.12rem", lineHeight: 1.7, color: "var(--text-secondary)", whiteSpace: "pre-wrap", maxWidth: "60ch" }}>
            {text}
          </p>
        )}
        {list.length > 0 && (
          <ul style={{ margin: hasText ? "1rem 0 0" : 0, paddingLeft: "1.2rem", fontFamily: "var(--font-sans)", fontSize: "1.08rem", lineHeight: 1.8, color: "var(--text-secondary)" }}>
            {list.map((it, i) => <li key={i}>{it}</li>)}
          </ul>
        )}
      </section>
    </Reveal>
  );
}
