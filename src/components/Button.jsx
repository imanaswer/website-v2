const SIZES = {
  sm: { fontSize: "0.8125rem", padding: "0.5rem 0.9rem",  height: 38, gap: "0.4rem" },
  md: { fontSize: "0.9375rem", padding: "0.7rem 1.25rem", height: 46, gap: "0.5rem" },
  lg: { fontSize: "1.0625rem", padding: "0.9rem 1.6rem",  height: 56, gap: "0.6rem" },
};

const VARIANTS = {
  primary: {
    background: "var(--brand)", color: "var(--text-on-brand)",
    border: "1px solid var(--brand)", boxShadow: "var(--shadow-sm)",
    hoverBg: "var(--brand-hover)", hoverShadow: "var(--shadow-brand)",
  },
  accent: {
    background: "var(--gold-500)", color: "var(--ink-900)",
    border: "1px solid var(--gold-500)", boxShadow: "var(--shadow-sm)",
    hoverBg: "var(--gold-400)", hoverShadow: "var(--shadow-md)",
  },
  secondary: {
    background: "transparent", color: "var(--text-brand)",
    border: "1px solid var(--border-strong)",
    hoverBg: "var(--maroon-50)", hoverBorder: "var(--maroon-300)",
  },
  ghost: {
    background: "transparent", color: "var(--text-brand)",
    border: "1px solid transparent",
    hoverBg: "var(--maroon-50)",
  },
  inverse: {
    background: "var(--cream-50)", color: "var(--maroon-900)",
    border: "1px solid var(--cream-50)", boxShadow: "var(--shadow-md)",
    hoverBg: "var(--white)", hoverShadow: "var(--shadow-lg)",
  },
};

export function Button({
  children, variant = "primary", size = "md", iconLeft, iconRight,
  fullWidth = false, disabled = false, type = "button", onClick, style, ...rest
}) {
  const s = SIZES[size] || SIZES.md;
  const v = VARIANTS[variant] || VARIANTS.primary;
  const { hoverBg, hoverShadow, hoverBorder, ...vStyle } = v;

  const base = {
    display: fullWidth ? "flex" : "inline-flex",
    width: fullWidth ? "100%" : undefined,
    alignItems: "center", justifyContent: "center", gap: s.gap,
    fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: s.fontSize,
    lineHeight: 1, letterSpacing: "0.01em",
    padding: s.padding, minHeight: s.height,
    borderRadius: "var(--radius-pill)", cursor: disabled ? "not-allowed" : "pointer",
    textDecoration: "none", whiteSpace: "nowrap",
    opacity: disabled ? 0.5 : 1,
    transition: "transform var(--dur-fast) var(--ease-out), background var(--dur) var(--ease-out), box-shadow var(--dur) var(--ease-out)",
    ...vStyle, ...style,
  };

  const enter = (e) => {
    if (disabled) return;
    e.currentTarget.style.transform = "translateY(-2px)";
    if (hoverBg) e.currentTarget.style.background = hoverBg;
    if (hoverShadow) e.currentTarget.style.boxShadow = hoverShadow;
    if (hoverBorder) e.currentTarget.style.borderColor = hoverBorder;
  };
  const reset = (e) => {
    e.currentTarget.style.transform = "translateY(0)";
    e.currentTarget.style.background = vStyle.background;
    if (vStyle.boxShadow) e.currentTarget.style.boxShadow = vStyle.boxShadow;
    e.currentTarget.style.borderColor = "";
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      style={base}
      onMouseEnter={enter}
      onMouseDown={(e) => { if (!disabled) e.currentTarget.style.transform = "translateY(1px)"; }}
      onMouseUp={enter}
      onMouseLeave={reset}
      {...rest}
    >
      {iconLeft}
      {children}
      {iconRight}
    </button>
  );
}
