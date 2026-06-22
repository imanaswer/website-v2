import { useState } from "react";

export function Img({ src, alt = "", style, className, overlay }) {
  const [err, setErr] = useState(false);

  if (err || !src) {
    return (
      <div
        className={className}
        style={{
          ...style,
          background: "linear-gradient(135deg,var(--maroon-600),var(--maroon-900))",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img src="/assets/crest-cream.png" alt="" style={{ height: "44%", opacity: 0.32 }} />
      </div>
    );
  }

  return (
    <div className={className} style={{ position: "relative", overflow: "hidden", ...style }}>
      <img
        src={src}
        alt={alt}
        onError={() => setErr(true)}
        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
      />
      {overlay && <div style={{ position: "absolute", inset: 0, background: overlay }} />}
    </div>
  );
}
