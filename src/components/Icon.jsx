export function Icon({ name, weight = "regular", size = 20, style, className }) {
  const cls = weight === "fill" ? "ph-fill" : weight === "bold" ? "ph-bold" : "ph";
  return (
    <i
      className={`${cls} ph-${name}${className ? " " + className : ""}`}
      style={{ fontSize: size, lineHeight: 1, ...style }}
      aria-hidden="true"
    />
  );
}
