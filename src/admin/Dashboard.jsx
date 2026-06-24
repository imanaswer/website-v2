import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Icon } from "../components/Icon";
import { Button } from "../components/Button";
import { api } from "./lib/api.js";
import { useAuth } from "./lib/auth.jsx";
import { Notice } from "./ui/Notice.jsx";
import { RESOURCES } from "./lib/resources.js";

export function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [counts, setCounts] = useState({});
  const [notice, setNotice] = useState(null);

  useEffect(() => {
    let active = true;
    Promise.all(
      RESOURCES.map((r) =>
        api(`/${r.path}?all=1`)
          .then((rows) => [r.path, Array.isArray(rows) ? rows.length : 0])
          .catch(() => [r.path, "—"])
      )
    ).then((pairs) => {
      if (!active) return;
      setCounts(Object.fromEntries(pairs));
      if (pairs.some(([, v]) => v === "—")) {
        setNotice({ type: "error", message: "We couldn't reach the database right now. Add your Supabase DATABASE_URL, then refresh.", code: "db_unavailable" });
      }
    });
    return () => { active = false; };
  }, []);

  return (
    <div>
      <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 400, fontSize: "clamp(1.8rem,1.4rem + 1.5vw,2.6rem)", marginBottom: "0.4rem" }}>
        Welcome{user ? `, ${user.username}` : ""}
      </h1>
      <p style={{ fontFamily: "var(--font-sans)", color: "var(--text-secondary)", fontSize: "1.05rem", marginBottom: "2rem" }}>
        Manage the website's content from here.
      </p>

      <Notice notice={notice} onClose={() => setNotice(null)} />

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1.2rem" }}>
        {RESOURCES.map((r) => {
          const count = counts[r.path];
          return (
            <button key={r.path} onClick={() => navigate(`/admin/${r.path}`)}
              className="admin-card"
              style={{ textAlign: "left", cursor: "pointer", display: "flex", alignItems: "center", gap: "1rem", border: "1px solid var(--border-subtle)" }}>
              <span style={{ width: 48, height: 48, borderRadius: "var(--radius-md)", background: "var(--maroon-50)", color: "var(--maroon-700)", display: "flex", alignItems: "center", justifyContent: "center", flex: "none" }}>
                <Icon name={r.icon} size={24} />
              </span>
              <span style={{ flex: 1, minWidth: 0 }}>
                <span style={{ display: "block", fontFamily: "var(--font-display)", fontSize: "1.2rem" }}>{r.label}</span>
                <span style={{ display: "block", fontFamily: "var(--font-sans)", fontSize: "0.88rem", color: "var(--text-muted)" }}>
                  {count == null ? "Loading…" : typeof count !== "number" ? "Unavailable" : `${count} item${count === 1 ? "" : "s"}`}
                </span>
              </span>
              <Icon name="arrow-right" size={18} style={{ color: "var(--maroon-600)" }} />
            </button>
          );
        })}
      </div>
    </div>
  );
}
