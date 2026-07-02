import { Img } from "./Img";
import { TextLink } from "./Ed";

/*
 * Two-column profile layout shared by faculty and management profiles:
 * a sticky identity + facts rail on the left, prose and grouped detail lists
 * on the right. Denser and more designed than a single stacked column.
 *
 *   crumb / name / role  — identity (name is the page's single <h1>)
 *   facts:   [{ label, value }]      short single-value rows for the rail
 *   lead:    main prose paragraph (bio) — reads as the opening statement
 *   highlight: optional pull-quote (e.g. a message from the member)
 *   details: [{ title, items:[] }]   list blocks for the right-hand grid
 *
 * Empty facts/details are dropped so a sparse profile never shows blank rows.
 */
export function ProfileLayout({ crumb, name, role, photo, facts = [], lead, highlight, details = [], backLabel, onBack }) {
  const realFacts = facts.filter((f) => f && f.value);
  const realDetails = details.filter((d) => d && Array.isArray(d.items) && d.items.length);

  return (
    <section className="section profile">
      <div className="container container--wide">
        {backLabel && (
          <div className="profile-top">
            <TextLink onClick={onBack}>← {backLabel}</TextLink>
          </div>
        )}

        <div className="profile-grid">
          <aside className="profile-rail">
            <Img className="profile-photo" src={photo} alt={role ? `${name}, ${role}` : name} style={{ aspectRatio: "4/5" }} />
            <div>
              {crumb && <div className="profile-crumb">{crumb}</div>}
              <h1 className="profile-name">{name}</h1>
              {role && <div className="profile-role">{role}</div>}
            </div>
            {realFacts.length > 0 && (
              <dl className="profile-facts">
                {realFacts.map((f) => (
                  <div className="profile-fact" key={f.label}>
                    <dt>{f.label}</dt>
                    <dd>{f.value}</dd>
                  </div>
                ))}
              </dl>
            )}
          </aside>

          <div className="profile-body">
            {lead && <p className="profile-lead">{lead}</p>}

            {highlight && (
              <figure className="profile-quote">
                <blockquote>{highlight}</blockquote>
              </figure>
            )}

            {realDetails.length > 0 && (
              <div className="profile-details">
                {realDetails.map((d) => (
                  <section className="profile-detail" key={d.title}>
                    <h2 className="profile-detail-title">{d.title}</h2>
                    <ul>
                      {d.items.map((it, i) => <li key={i}>{it}</li>)}
                    </ul>
                  </section>
                ))}
              </div>
            )}

            {backLabel && (
              <div className="profile-back">
                <TextLink onClick={onBack}>← {backLabel}</TextLink>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
