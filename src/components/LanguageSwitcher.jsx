import { useEffect, useRef, useState } from "react";
import { Icon } from "./Icon";
import { LANGS, getCurrentLang, setLang, bootGoogleTranslate } from "../lib/translate";

// Self-contained language picker. Boots the Google Translate widget on first mount,
// shows the current language, and switches via cookie + reload (see lib/translate).
// `variant="bar"` styles it for the maroon utility bar; "menu" for the mobile drawer.
export function LanguageSwitcher({ variant = "bar" }) {
  const [open, setOpen] = useState(false);
  const [lang, setLangState] = useState("en");
  const ref = useRef(null);

  useEffect(() => {
    bootGoogleTranslate();
    setLangState(getCurrentLang());
  }, []);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open]);

  const active = LANGS.find((l) => l.code === lang) || LANGS[0];
  const choose = (code) => {
    if (code === lang) return setOpen(false);
    setLang(code); // triggers reload
  };

  // The translate widget would otherwise translate our own labels; keep them as-is.
  const noTranslate = { className: "notranslate", translate: "no" };

  if (variant === "menu") {
    return (
      <div {...noTranslate} style={{ marginTop: "0.5rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", padding: "0.5rem", color: "var(--ink-600)", fontFamily: "var(--font-sans)", fontSize: "0.82rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em" }}>
          <Icon name="globe" size={15} /> Language
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", padding: "0 0.5rem" }}>
          {LANGS.map((l) => (
            <button key={l.code} onClick={() => choose(l.code)}
              style={{
                cursor: "pointer", border: "1px solid var(--border-subtle)", borderRadius: 999,
                padding: "0.45rem 0.9rem", fontFamily: "var(--font-sans)", fontSize: "0.95rem", fontWeight: 600,
                background: l.code === lang ? "var(--maroon-700)" : "transparent",
                color: l.code === lang ? "var(--cream-100)" : "var(--ink-800)",
              }}>
              {l.native}
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div {...noTranslate} ref={ref} style={{ position: "relative" }}>
      <button onClick={() => setOpen((o) => !o)} aria-haspopup="listbox" aria-expanded={open}
        style={{
          display: "inline-flex", alignItems: "center", gap: "0.4rem", cursor: "pointer",
          background: "transparent", border: "none", color: "var(--cream-100)",
          fontFamily: "var(--font-sans)", fontSize: "0.86rem", fontWeight: 600, padding: 0,
        }}>
        <Icon name="globe" size={14} />
        {active.native}
        <Icon name="caret-down" size={11} style={{ opacity: 0.8 }} />
      </button>

      {open && (
        <ul role="listbox" style={{
          position: "absolute", right: 0, top: "calc(100% + 8px)", zIndex: 300, listStyle: "none",
          margin: 0, padding: "0.35rem", minWidth: 168, background: "var(--surface-card)",
          border: "1px solid var(--border-subtle)", borderRadius: 10, boxShadow: "var(--shadow-md, 0 12px 30px rgba(0,0,0,0.18))",
        }}>
          {LANGS.map((l) => (
            <li key={l.code} role="option" aria-selected={l.code === lang}>
              <button onClick={() => choose(l.code)}
                style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%",
                  cursor: "pointer", background: "transparent", border: "none", borderRadius: 7,
                  padding: "0.55rem 0.7rem", fontFamily: "var(--font-sans)", fontSize: "0.95rem",
                  color: "var(--ink-800)", fontWeight: l.code === lang ? 700 : 500,
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "var(--cream-100, #f6f1e7)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}>
                <span>{l.native}</span>
                {l.code === lang && <Icon name="check" size={14} style={{ color: "var(--maroon-700)" }} />}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
