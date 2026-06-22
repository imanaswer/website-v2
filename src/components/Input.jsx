import { useId, useState } from "react";

export function Input({ label, hint, error, id, required = false, icon, type = "text", style, containerStyle, ...rest }) {
  const autoId = useId();
  const fieldId = id || autoId;
  const [focus, setFocus] = useState(false);
  const borderColor = error ? "var(--red-600)" : focus ? "var(--brand)" : "var(--border-strong)";

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem", ...containerStyle }}>
      {label && (
        <label htmlFor={fieldId} style={{
          fontFamily: "var(--font-sans)", fontSize: "0.8125rem", fontWeight: 600,
          color: "var(--text-primary)", letterSpacing: "0.01em",
        }}>
          {label}{required && <span style={{ color: "var(--red-600)" }}> *</span>}
        </label>
      )}
      <div style={{
        display: "flex", alignItems: "center", gap: "0.6rem",
        background: "var(--surface-card)", border: `1px solid ${borderColor}`,
        borderRadius: "var(--radius-md)", padding: "0 0.9rem",
        boxShadow: focus ? "0 0 0 3px rgba(122,52,20,.12)" : "none",
        transition: "border-color var(--dur-fast), box-shadow var(--dur-fast)",
      }}>
        {icon && <span style={{ color: "var(--text-muted)", display: "flex" }}>{icon}</span>}
        <input
          id={fieldId} type={type} required={required}
          onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}
          style={{
            flex: 1, border: "none", outline: "none", background: "transparent",
            fontFamily: "var(--font-sans)", fontSize: "0.9375rem", color: "var(--text-primary)",
            padding: "0.75rem 0", minWidth: 0, ...style,
          }}
          {...rest}
        />
      </div>
      {(hint || error) && (
        <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.75rem", color: error ? "var(--red-600)" : "var(--text-muted)" }}>
          {error || hint}
        </span>
      )}
    </div>
  );
}
