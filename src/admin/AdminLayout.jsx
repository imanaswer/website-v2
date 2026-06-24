import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { Icon } from "../components/Icon";
import { useAuth } from "./lib/auth.jsx";
import { RESOURCES } from "./lib/resources.js";

const LINKS = [
  { to: "/admin", label: "Dashboard", icon: "squares-four", end: true },
  ...RESOURCES.map((r) => ({ to: `/admin/${r.path}`, label: r.label, icon: r.icon })),
];

export function AdminLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const onLogout = async () => {
    await logout();
    navigate("/admin/login", { replace: true });
  };

  return (
    <div className="admin-shell">
      <aside className="admin-side">
        <div style={{ display: "flex", alignItems: "center", gap: "0.7rem" }}>
          <img src="/assets/crest-cream.png" alt="" style={{ height: 34 }} />
          <div style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", color: "var(--cream-50)", lineHeight: 1.1 }}>
            Admin
          </div>
        </div>
        <nav style={{ display: "flex", flexDirection: "column", gap: "0.3rem", flex: 1 }}>
          {LINKS.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.end}
              className={({ isActive }) => "admin-navlink" + (isActive ? " active" : "")}>
              <Icon name={l.icon} size={18} /> {l.label}
            </NavLink>
          ))}
        </nav>
        <div style={{ borderTop: "1px solid var(--border-on-dark)", paddingTop: "1rem", display: "flex", flexDirection: "column", gap: "0.6rem" }}>
          <a href="/" className="admin-navlink" style={{ padding: "0.5rem 0.9rem" }}>
            <Icon name="arrow-square-out" size={18} /> View site
          </a>
          <button onClick={onLogout} className="admin-navlink" style={{ border: "none", background: "none", width: "100%", textAlign: "left" }}>
            <Icon name="sign-out" size={18} /> Sign out{user ? ` (${user.username})` : ""}
          </button>
        </div>
      </aside>
      <main className="admin-main">
        <Outlet />
      </main>
    </div>
  );
}
