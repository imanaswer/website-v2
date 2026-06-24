import { useState } from "react";
import { Icon } from "../../components/Icon";

/*
 * Plain-language feedback banner for the admin. Pass a notice object:
 *   { type: 'error' | 'success', message, code?, detail? }
 * Shows the friendly message, with an optional "Show details" expander that
 * reveals the technical code for support. Announced to screen readers.
 */
export function Notice({ notice, onClose }) {
  const [open, setOpen] = useState(false);
  if (!notice) return null;

  const isError = notice.type === "error";
  const accent = isError ? "var(--red-600)" : "var(--green-600)";
  const tint = isError ? "var(--red-100)" : "var(--green-100)";
  const hasDetail = notice.detail || notice.code;

  return (
    <div
      role={isError ? "alert" : "status"}
      aria-live={isError ? "assertive" : "polite"}
      style={{
        display: "flex", gap: "0.8rem", alignItems: "flex-start",
        background: tint, border: `1px solid ${accent}`, borderRadius: "var(--radius-md)",
        padding: "0.9rem 1rem", marginBottom: "1.4rem", fontFamily: "var(--font-sans)",
      }}
    >
      <Icon name={isError ? "warning-circle" : "check-circle"} weight="fill" size={20} style={{ color: accent, flex: "none", marginTop: 1 }} />
      <div style={{ flex: 1, fontSize: "0.95rem", color: "var(--ink-900)" }}>
        <div>{notice.message}</div>
        {hasDetail && (
          <>
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              style={{ background: "none", border: "none", padding: "0.3rem 0 0", cursor: "pointer", color: accent, fontFamily: "var(--font-sans)", fontSize: "0.8rem", fontWeight: 600 }}
            >
              {open ? "Hide details" : "Show details"}
            </button>
            {open && (
              <div style={{ marginTop: "0.4rem", fontFamily: "var(--font-mono)", fontSize: "0.78rem", color: "var(--text-muted)" }}>
                {notice.code}{notice.detail ? ` — ${notice.detail}` : ""}
              </div>
            )}
          </>
        )}
      </div>
      {onClose && (
        <button type="button" onClick={onClose} aria-label="Dismiss" style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)", display: "flex" }}>
          <Icon name="x" size={16} />
        </button>
      )}
    </div>
  );
}
