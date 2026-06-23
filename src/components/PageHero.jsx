import { Img } from "./Img";
import { Icon } from "./Icon";

/*
 * Editorial page masthead: a calm cream header (breadcrumb · eyebrow · serif
 * title · lead) followed by a full-bleed, art-directed image strip.
 */
export function PageHero({ eyebrow, title, lead, image, onNavigate, crumb }) {
  return (
    <>
      <section style={{ background: "var(--surface-page)", position: "relative", overflow: "hidden" }}>
        <img src="/assets/crest.png" alt="" aria-hidden style={{ position: "absolute", right: "-3%", top: "-30%", height: "150%", opacity: 0.035 }} />
        <div className="container container--wide" style={{ position: "relative", paddingTop: "var(--space-16)", paddingBottom: "var(--space-12)" }}>
          {/* breadcrumb */}
          <div style={{ display: "flex", gap: "0.6rem", alignItems: "center", fontFamily: "var(--font-mono)", fontSize: "0.78rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: "2.2rem" }}>
            <button onClick={() => onNavigate?.("home")} style={{ background: "none", border: 0, padding: 0, color: "var(--text-muted)", cursor: "pointer", font: "inherit", letterSpacing: "inherit", textTransform: "inherit" }}>Home</button>
            <Icon name="caret-right" size={11} />
            <span style={{ color: "var(--maroon-700)" }}>{crumb || title}</span>
          </div>

          <div className="label" style={{ display: "flex", alignItems: "center", gap: "0.8rem", color: "var(--maroon-700)" }}>
            <span style={{ width: 28, height: 1.5, background: "var(--gold-500)", display: "inline-block" }} />
            {eyebrow}
          </div>

          <h1 style={{ fontWeight: 400, fontSize: "clamp(2.4rem,1.5rem + 3.6vw,4.4rem)", lineHeight: 1.04, margin: "1.4rem 0 0", maxWidth: "18ch", letterSpacing: "-0.02em" }}>
            {title}
          </h1>

          {lead && (
            <p className="measure" style={{ fontFamily: "var(--font-serif)", fontSize: "var(--text-lead)", marginTop: "1.6rem", lineHeight: 1.55, color: "var(--text-secondary)" }}>
              {lead}
            </p>
          )}
        </div>
        <div className="rule" />
      </section>

      {image && (
        <div className="photo photo-frame" style={{ position: "relative", height: "clamp(280px,42vh,520px)" }}>
          <Img src={image} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} />
        </div>
      )}
    </>
  );
}
