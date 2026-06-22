import { useRef, useEffect, useState } from "react";

export function Reveal({ children, delay = 0, style, as: Tag = "div" }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    let done = false;
    const reveal = () => { if (!done) { done = true; setShown(true); } };
    const inView = () => {
      const r = node.getBoundingClientRect();
      return r.height > 0 && r.top < (window.innerHeight || 0) - 40 && r.bottom > 0;
    };
    let tries = 0;
    const poll = setInterval(() => {
      tries += 1;
      if (inView()) { reveal(); clearInterval(poll); }
      if (tries > 12) clearInterval(poll);
    }, 110);
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { reveal(); io.disconnect(); } });
    }, { threshold: 0.12 });
    io.observe(node);
    return () => { io.disconnect(); clearInterval(poll); };
  }, []);

  return (
    <Tag
      ref={ref}
      className={shown ? "reveal is-visible" : "reveal"}
      style={shown ? { transitionDelay: `${delay}ms`, ...style } : style}
    >
      {children}
    </Tag>
  );
}
