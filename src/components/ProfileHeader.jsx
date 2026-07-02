import { Img } from "./Img";
import { Reveal } from "./Reveal";
import { Label } from "./Ed";

/* Detail-page header: large portrait + name + role. Emits the page's single
 * <h1>. Mirrors the PrincipalFeature layout so it matches the current design. */
export function ProfileHeader({ photo, name, role, crumb }) {
  return (
    <section className="section">
      <div className="container container--narrow">
        <Reveal>
          <div className="ed-2col principal-feature" style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: "var(--space-12)", alignItems: "center" }}>
            <div className="principal-photo-wrapper">
              <div className="photo photo-frame">
                <Img src={photo} alt={role ? `${name}, ${role}` : name} style={{ aspectRatio: "4/5" }} />
              </div>
            </div>
            <div className="principal-text-wrapper">
              {crumb && <Label>{crumb}</Label>}
              <h1 style={{ fontSize: "clamp(1.8rem,1.3rem + 1.8vw,2.8rem)", fontWeight: 400, margin: "1rem 0 0.4rem" }}>{name}</h1>
              {role && <div className="label" style={{ color: "var(--gold-700)" }}>{role}</div>}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
