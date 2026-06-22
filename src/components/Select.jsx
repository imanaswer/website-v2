import { useId, useState } from "react";

export function Select({ label, hint, error, id, required = false, options = [], placeholder, style, containerStyle, ...rest }) {
  const autoId = useId();
  const fieldId = id || autoId;
  const [focus, setFocus] = useState(false);
  const borderColor = error ? "var(--red-600)" : focus ? "var(--brand)" : "var(--border-strong)";

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem", ...containerStyle }}>
      {label && (
        <label htmlFor={fieldId} style={{ fontFamily: "var(--font-sans)", fontSize: "0.8125rem", fontWeight: 600, color: "var(--text-primary)" }}>
          {label}{required && <span style={{ color: "var(--red-600)" }}> *</span>}
        </label>
      )}
      <div style={{
        position: "relative", background: "var(--surface-card)",
        border: `1px solid ${borderColor}`, borderRadius: "var(--radius-md)",
        boxShadow: focus ? "0 0 0 3px rgba(122,52,20,.12)" : "none",
        transition: "border-color var(--dur-fast), box-shadow var(--dur-fast)",
      }}>
        <select
          id={fieldId} required={required}
          onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}
          defaultValue=""
          style={{ width: "100%", appearance: "none", border: "none", outline: "none", background: "transparent", fontFamily: "var(--font-sans)", fontSize: "0.9375rem", color: "var(--text-primary)", padding: "0.8rem 2.4rem 0.8rem 0.9rem", cursor: "pointer", ...style }}
          {...rest}
        >
          {placeholder && <option value="" disabled>{placeholder}</option>}
          {options.map((o) => {
            const val = typeof o === "string" ? o : o.value;
            const lab = typeof o === "string" ? o : o.label;
            return <option key={val} value={val}>{lab}</option>;
          })}
        </select>
        <span style={{ position: "absolute", right: "0.9rem", top: "50%", transform: "translateY(-50%)", pointerEvents: "none", color: "var(--text-muted)", fontSize: "0.7rem" }}>▼</span>
      </div>
      {(hint || error) && (
        <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.75rem", color: error ? "var(--red-600)" : "var(--text-muted)" }}>{error || hint}</span>
      )}
    </div>
  );
}
