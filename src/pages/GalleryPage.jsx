import { useState, useRef } from "react";
import { Img } from "../components/Img";
import { Icon } from "../components/Icon";
import { Reveal } from "../components/Reveal";
import { PageHero } from "../components/PageHero";
import { useApi } from "../lib/useApi";

const IMG = {
  campus:    "/assets/photos/campus-entrance.jpg",
  grounds:   "/assets/photos/campus-grounds.jpg",
  classroom: "/assets/photos/classroom.jpg",
  smartboard:"/assets/photos/smartboard.jpg",
  science:   "/assets/photos/science-lab.jpg",
  computer:  "/assets/photos/computer-lab.jpg",
  library1:  "/assets/photos/library-girls.jpg",
  library2:  "/assets/photos/library-boys.jpg",
  walking:   "/assets/photos/students-walking.jpg",
  gate:      "/assets/photos/school-gate.jpg",
  football:  "/assets/photos/football.jpg",
  news_plusone: "https://www.srigujaratividhyalaya.com/wp-content/uploads/2024/06/plusone.jpeg",
  news_mla:  "https://www.srigujaratividhyalaya.com/wp-content/uploads/2023/07/1-31.jpg",
  news_yoga: "https://www.srigujaratividhyalaya.com/wp-content/uploads/2023/07/4-13.jpg",
  news_ocean:"https://www.srigujaratividhyalaya.com/wp-content/uploads/2023/07/3-18.jpg",
  news_env:  "https://www.srigujaratividhyalaya.com/wp-content/uploads/2023/07/2-21.jpg",
};

/* Curated fallback used until the gallery is populated in the admin. */
const FALLBACK = [
  { src: IMG.campus,       cat: "Campus",       t: "The main campus" },
  { src: IMG.news_yoga,    cat: "Celebrations", t: "International Yoga Day" },
  { src: IMG.classroom,    cat: "Academics",    t: "In the classroom" },
  { src: IMG.news_ocean,   cat: "Arts",         t: "World Ocean Day" },
  { src: IMG.smartboard,   cat: "Academics",    t: "Our teachers" },
  { src: IMG.news_env,     cat: "Celebrations", t: "World Environment Day" },
  { src: IMG.library1,     cat: "Academics",    t: "Learning together" },
  { src: IMG.news_mla,     cat: "Sports",       t: "Excellence Award" },
  { src: IMG.science,      cat: "Academics",    t: "In the science lab" },
  { src: IMG.football,     cat: "Sports",       t: "On the field" },
  { src: IMG.news_plusone, cat: "Academics",    t: "Plus One" },
  { src: IMG.gate,         cat: "Campus",       t: "A new school day" },
  { src: IMG.computer,     cat: "Academics",    t: "The computer lab" },
  { src: IMG.library2,     cat: "Academics",    t: "In the library" },
  { src: IMG.walking,      cat: "Campus",       t: "Off to class" },
  { src: IMG.grounds,      cat: "Campus",       t: "The school grounds" },
].map((p) => ({ ...p, kind: "photo" }));

function mapGallery(rows) {
  return rows.map((r) => ({
    id: r.id,
    kind: r.kind === "video" ? "video" : "photo",
    src: r.image_url,
    video: r.video_url,
    cat: r.category || "Campus",
    t: r.title || "",
  }));
}

export function GalleryPage({ onNavigate }) {
  const { data } = useApi("gallery");
  const items = Array.isArray(data) && data.length ? mapGallery(data) : FALLBACK;
  const cats = ["All", ...Array.from(new Set(items.map((i) => i.cat).filter(Boolean)))];

  const [cat, setCat] = useState("All");
  const [box, setBox] = useState(null);
  const shown = cat === "All" ? items : items.filter((p) => p.cat === cat);

  return (
    <div>
      <PageHero onNavigate={onNavigate} crumb="Campus" eyebrow="Campus Life"
        title="Moments from our campus"
        lead="A glimpse of everyday life at Sri Gujarati Vidyalaya — classrooms, celebrations, sport and the green campus our students call home."
        image={IMG.classroom} />

      <section className="section">
        <div className="container container--wide">
          <Reveal>
            <div 
              className="utility-bar" 
              style={{ display: "flex", gap: "clamp(1rem,2.5vw,2.4rem)", borderBottom: "1px solid var(--border-subtle)", paddingBottom: "1.1rem", marginBottom: "var(--space-12)" }}
            >
              {cats.map((c) => (
                <button key={c} onClick={() => setCat(c)} style={{
                  position: "relative", background: "none", border: 0, cursor: "pointer", padding: "0 0 0.4rem",
                  fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: "1rem", flexShrink: 0,
                  color: cat === c ? "var(--maroon-800)" : "var(--text-muted)", transition: "color var(--dur)",
                }}>
                  {c}
                  {cat === c && <span style={{ position: "absolute", left: 0, right: 0, bottom: "-1.15rem", height: 2, background: "var(--gold-500)" }} />}
                </button>
              ))}
            </div>
          </Reveal>

          <div className="masonry">
            {shown.map((p, i) => (
              <Reveal key={(p.id ?? p.t) + "-" + i} delay={(i % 6) * 50} style={{ breakInside: "avoid", marginBottom: "var(--space-8)" }}>
                <figure style={{ margin: 0 }}>
                  {p.kind === "video" ? (
                    <button onClick={() => p.video && window.open(p.video, "_blank", "noopener")}
                      className="photo-frame"
                      style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", aspectRatio: "16/9", padding: 0, border: 0, cursor: "pointer", background: "var(--maroon-900)", position: "relative" }}>
                      <Icon name="play-circle" weight="fill" size={54} style={{ color: "var(--gold-300)" }} />
                    </button>
                  ) : (
                    <button onClick={() => setBox(p)}
                      onMouseEnter={(e) => { const im = e.currentTarget.querySelector("img"); if (im) im.style.transform = "scale(1.04)"; }}
                      onMouseLeave={(e) => { const im = e.currentTarget.querySelector("img"); if (im) im.style.transform = "scale(1)"; }}
                      className="photo photo-frame"
                      style={{ display: "block", width: "100%", padding: 0, border: 0, cursor: "pointer", overflow: "hidden", position: "relative" }}>
                      <Img src={p.src} alt={p.t} style={{ width: "100%", aspectRatio: i % 3 === 0 ? "3/4" : i % 3 === 1 ? "4/3" : "1/1" }} />
                    </button>
                  )}
                  <figcaption style={{ display: "flex", alignItems: "baseline", gap: "0.9rem", marginTop: "0.8rem" }}>
                    <span className="label" style={{ color: "var(--gold-700)" }}>{p.kind === "video" ? "Video" : p.cat}</span>
                    {p.t && <span style={{ fontFamily: "var(--font-serif)", fontSize: "1.15rem", color: "var(--text-primary)" }}>{p.t}</span>}
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {box && (
        <div onClick={() => setBox(null)} style={{ position: "fixed", inset: 0, zIndex: 900, background: "rgba(22,15,9,.90)", display: "flex", alignItems: "center", justifyContent: "center", padding: "var(--gutter)", backdropFilter: "blur(4px)" }}>
          <button onClick={() => setBox(null)} aria-label="Close" style={{ position: "absolute", top: 24, right: 24, width: 48, height: 48, borderRadius: "50%", border: "1px solid var(--border-on-dark)", background: "rgba(252,249,243,.08)", color: "var(--cream-50)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Icon name="x" size={24} />
          </button>
          <figure onClick={(e) => e.stopPropagation()} style={{ margin: 0, maxWidth: 980, width: "100%" }}>
            <div className="photo">
              <Img src={box.src} alt={box.t} style={{ width: "100%", maxHeight: "76vh", boxShadow: "var(--shadow-xl)" }} />
            </div>
            <figcaption style={{ marginTop: "1.1rem", display: "flex", gap: "1rem", alignItems: "baseline", color: "var(--cream-50)" }}>
              <span className="label label--on-dark">{box.cat}</span>
              {box.t && <span style={{ fontFamily: "var(--font-serif)", fontSize: "1.3rem", fontStyle: "italic" }}>{box.t}</span>}
            </figcaption>
          </figure>
        </div>
      )}
    </div>
  );
}
