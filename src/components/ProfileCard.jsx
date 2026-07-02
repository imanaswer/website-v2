import { Link } from "react-router-dom";
import { Img } from "./Img";
import { slugify } from "../../shared/meta/index.js";

/* One person card for a listing grid. Clickable (router Link) when the person
 * has an id; otherwise a plain figure (curated fallback rows have no id, so we
 * never render a dead link). `basePath` is e.g. "/faculty" or "/management". */
export function ProfileCard({ person, basePath }) {
  const inner = (
    <figure style={{ margin: 0 }}>
      <div className="photo photo-frame">
        <Img src={person.photo} alt={person.role ? `${person.name}, ${person.role}` : person.name} style={{ aspectRatio: "1/1" }} />
      </div>
      <figcaption style={{ marginTop: "0.9rem" }}>
        <div style={{ fontFamily: "var(--font-serif)", fontSize: "1.2rem", color: "var(--text-primary)", lineHeight: 1.25 }}>{person.name}</div>
        {person.role && <div className="label" style={{ marginTop: "0.35rem", color: "var(--gold-700)" }}>{person.role}</div>}
      </figcaption>
    </figure>
  );

  if (!person.id) return inner;
  return (
    <Link to={`${basePath}/${slugify(person.name)}-${person.id}`} className="profile-card-link" style={{ display: "block", textDecoration: "none", color: "inherit", borderRadius: "var(--radius-md, 8px)" }}>
      {inner}
    </Link>
  );
}
