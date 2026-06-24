import { useState } from "react";
import { useNavigate, useLocation, Navigate } from "react-router-dom";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { Icon } from "../components/Icon";
import { useAuth } from "./lib/auth.jsx";
import { Notice } from "./ui/Notice.jsx";

export function LoginPage() {
  const { authenticated, loading, login } = useAuth();
  const navigate = useNavigate();
  const loc = useLocation();
  const [form, setForm] = useState({ username: "", password: "" });
  const [notice, setNotice] = useState(null);
  const [busy, setBusy] = useState(false);

  if (!loading && authenticated) return <Navigate to="/admin" replace />;

  const onSubmit = async (e) => {
    e.preventDefault();
    setNotice(null);
    if (!form.username || !form.password) {
      setNotice({ type: "error", message: "Please enter both your username and password.", code: "missing_fields" });
      return;
    }
    setBusy(true);
    try {
      await login(form.username, form.password);
      navigate(loc.state?.from || "/admin", { replace: true });
    } catch (err) {
      setNotice({ type: "error", message: err.message, code: err.code, detail: err.detail });
    } finally {
      setBusy(false);
    }
  };

  return (
    <div style={{ minHeight: "100dvh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--surface-page)", padding: "var(--gutter)" }}>
      <div className="admin-card" style={{ width: "100%", maxWidth: 420 }}>
        <div style={{ textAlign: "center", marginBottom: "1.8rem" }}>
          <img src="/assets/crest.png" alt="" style={{ height: 48, marginBottom: "0.8rem" }} />
          <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 400, fontSize: "1.8rem" }}>Admin sign-in</h1>
          <p style={{ fontFamily: "var(--font-sans)", color: "var(--text-muted)", fontSize: "0.95rem", marginTop: "0.3rem" }}>
            Sri Gujarati Vidyalaya
          </p>
        </div>
        <Notice notice={notice} onClose={() => setNotice(null)} />
        <form onSubmit={onSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.1rem" }}>
          <Input label="Username" required autoComplete="username" value={form.username}
            icon={<Icon name="user" size={16} />}
            onChange={(e) => setForm((f) => ({ ...f, username: e.target.value }))} />
          <Input label="Password" type="password" required autoComplete="current-password" value={form.password}
            icon={<Icon name="lock-simple" size={16} />}
            onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))} />
          <Button type="submit" size="lg" fullWidth disabled={busy} iconRight={<Icon name="arrow-right" size={18} />}>
            {busy ? "Signing in…" : "Sign in"}
          </Button>
        </form>
      </div>
    </div>
  );
}
