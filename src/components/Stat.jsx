import { useRef, useEffect, useState } from "react";

export function Stat({ value, suffix = "", prefix = "", label, align = "center", tone = "default", animate = true, style }) {
  const ref = useRef(null);
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    if (!animate) return;
    const node = ref.current;
    if (!node) return;
    let raf, done = false;

    const run = () => {
      if (done) return;
      done = true;
      setDisplay(0);
      const start = performance.now();
      const dur = 1400;
      const tick = (now) => {
        const p = Math.min((now - start) / dur, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        setDisplay(Math.round(value * eased));
        if (p < 1) raf = requestAnimationFrame(tick);
        else setDisplay(value);
      };
      raf = requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { run(); io.disconnect(); } });
    }, { threshold: 0.35 });
    io.observe(node);
    if (node.getBoundingClientRect().top < window.innerHeight) { run(); io.disconnect(); }

    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, [value, animate]);

  const onDark = tone === "inverse";
  return (
    <div ref={ref} style={{ textAlign: align, ...style }}>
      <div style={{
        fontFamily: "var(--font-display)", fontWeight: 500,
        fontSize: "clamp(2.25rem,1.4rem + 2.6vw,3.25rem)", lineHeight: 1,
        letterSpacing: "-0.02em",
        color: onDark ? "var(--gold-300)" : "var(--text-brand)",
        display: "flex", alignItems: "baseline",
        justifyContent: align === "center" ? "center" : "flex-start", gap: "0.05em",
      }}>
        {prefix}{display.toLocaleString("en-IN")}{suffix}
      </div>
      <div style={{
        marginTop: "0.5rem", fontFamily: "var(--font-sans)", fontSize: "0.9375rem",
        fontWeight: 500, letterSpacing: "0.02em",
        color: onDark ? "var(--cream-100)" : "var(--text-secondary)",
      }}>{label}</div>
    </div>
  );
}
