export function Kicker({ children, tone }) {
  return (
    <span
      className="eyebrow"
      style={tone === "inverse" ? { color: "var(--gold-400)" } : undefined}
    >
      <span style={{ width: 22, height: 1.5, background: "currentColor", display: "inline-block" }} />
      {children}
    </span>
  );
}
