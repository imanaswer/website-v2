import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Icon } from "../components/Icon";
import { Button } from "../components/Button";
import { api } from "./lib/api.js";
import { Notice } from "./ui/Notice.jsx";

export function NewsList() {
  const navigate = useNavigate();
  const [items, setItems] = useState(null);
  const [notice, setNotice] = useState(null);

  const load = useCallback(async () => {
    try {
      setItems(await api("/news?all=1"));
    } catch (err) {
      setNotice({ type: "error", message: err.message, code: err.code, detail: err.detail });
      setItems([]);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const remove = async (item) => {
    if (!window.confirm(`Delete "${item.title}"? This can't be undone.`)) return;
    try {
      await api(`/news/${item.id}`, { method: "DELETE" });
      setNotice({ type: "success", message: `"${item.title}" was deleted.` });
      load();
    } catch (err) {
      setNotice({ type: "error", message: err.message, code: err.code, detail: err.detail });
    }
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "1rem", flexWrap: "wrap", marginBottom: "1.6rem" }}>
        <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 400, fontSize: "clamp(1.7rem,1.3rem + 1.4vw,2.4rem)" }}>News &amp; Events</h1>
        <Button onClick={() => navigate("/admin/news/new")} iconLeft={<Icon name="plus" size={16} />}>New item</Button>
      </div>

      <Notice notice={notice} onClose={() => setNotice(null)} />

      {items == null ? (
        <p style={{ fontFamily: "var(--font-sans)", color: "var(--text-muted)" }}>Loading…</p>
      ) : items.length === 0 ? (
        <div className="admin-card" style={{ textAlign: "center", padding: "3rem 1rem" }}>
          <p style={{ fontFamily: "var(--font-sans)", color: "var(--text-secondary)", marginBottom: "1.2rem" }}>No news items yet.</p>
          <Button onClick={() => navigate("/admin/news/new")} iconLeft={<Icon name="plus" size={16} />}>Add the first one</Button>
        </div>
      ) : (
        <div className="admin-card" style={{ padding: "0 1.4rem" }}>
          {items.map((item) => (
            <div key={item.id} className="admin-row">
              <div style={{ display: "flex", alignItems: "center", gap: "1rem", minWidth: 0 }}>
                <span style={{
                  fontFamily: "var(--font-mono)", fontSize: "0.7rem", letterSpacing: "0.06em",
                  padding: "0.2rem 0.5rem", borderRadius: "var(--radius-xs)",
                  background: item.published ? "var(--green-100)" : "var(--cream-200)",
                  color: item.published ? "var(--green-600)" : "var(--text-muted)", flex: "none",
                }}>
                  {item.published ? "LIVE" : "DRAFT"}
                </span>
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontFamily: "var(--font-serif)", fontSize: "1.15rem", color: "var(--text-primary)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{item.title}</div>
                  <div style={{ fontFamily: "var(--font-sans)", fontSize: "0.82rem", color: "var(--text-muted)" }}>
                    {item.category ? `${item.category} · ` : ""}{item.date}
                  </div>
                </div>
              </div>
              <div style={{ display: "flex", gap: "0.4rem" }}>
                <Button variant="ghost" size="sm" onClick={() => navigate(`/admin/news/${item.id}`)} iconLeft={<Icon name="pencil-simple" size={15} />}>Edit</Button>
                <Button variant="ghost" size="sm" onClick={() => remove(item)} iconLeft={<Icon name="trash" size={15} />} style={{ color: "var(--red-600)" }}>Delete</Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
