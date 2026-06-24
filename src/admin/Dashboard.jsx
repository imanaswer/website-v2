import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Icon } from "../components/Icon";
import { Button } from "../components/Button";
import { api } from "./lib/api.js";
import { useAuth } from "./lib/auth.jsx";
import { Notice } from "./ui/Notice.jsx";

export function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [count, setCount] = useState(null);
  const [notice, setNotice] = useState(null);

  useEffect(() => {
    let active = true;
    api("/news?all=1")
      .then((rows) => active && setCount(Array.isArray(rows) ? rows.length : 0))
      .catch((err) => active && setNotice({ type: "error", message: err.message, code: err.code, detail: err.detail }));
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
      <div className="admin-card" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem", flexWrap: "wrap" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <span style={{ width: 48, height: 48, borderRadius: "var(--radius-md)", background: "var(--maroon-50)", color: "var(--maroon-700)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Icon name="newspaper" size={24} />
          </span>
          <div>
            <div style={{ fontFamily: "var(--font-display)", fontSize: "1.3rem" }}>News &amp; Events</div>
            <div style={{ fontFamily: "var(--font-sans)", fontSize: "0.9rem", color: "var(--text-muted)" }}>
              {count == null ? "Loading…" : `${count} item${count === 1 ? "" : "s"}`}
            </div>
          </div>
        </div>
        <Button onClick={() => navigate("/admin/news")} iconRight={<Icon name="arrow-right" size={16} />}>Manage</Button>
      </div>
      <p style={{ fontFamily: "var(--font-sans)", color: "var(--text-muted)", fontSize: "0.9rem", marginTop: "1.4rem" }}>
        Faculty, Jobs, Alumni and Gallery management are coming next.
      </p>
    </div>
  );
}
