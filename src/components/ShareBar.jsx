import { useState } from "react";
import { Icon } from "./Icon";

/*
 * Reusable social-share controls for any detail page. Pass the absolute `url`.
 * LinkedIn's share dialog reads only the URL — the rich card comes from the
 * Open Graph tags our server injects at that URL.
 */
export function ShareBar({ url, label = "Share this role" }) {
  const [copied, setCopied] = useState(false);
  const linkedin = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard blocked — no-op */
    }
  };

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "1.1rem", flexWrap: "wrap" }}>
      {label && <span className="label" style={{ color: "var(--text-muted)" }}>{label}</span>}
      <a
        href={linkedin}
        target="_blank"
        rel="noopener noreferrer"
        style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", fontFamily: "var(--font-mono)", fontSize: "0.95rem", color: "var(--maroon-800)" }}
      >
        <Icon name="linkedin-logo" size={18} /> LinkedIn
      </a>
      <button
        onClick={copy}
        style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", fontFamily: "var(--font-mono)", fontSize: "0.95rem", color: "var(--text-secondary)", background: "none", border: "none", cursor: "pointer", padding: 0 }}
      >
        <Icon name={copied ? "check" : "link"} size={18} /> {copied ? "Copied" : "Copy link"}
      </button>
    </div>
  );
}
