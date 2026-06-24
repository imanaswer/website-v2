import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { api } from "./api.js";

const AuthCtx = createContext(null);

export function AuthProvider({ children }) {
  const [state, setState] = useState({ loading: true, authenticated: false, user: null });

  const refresh = useCallback(async () => {
    try {
      const me = await api("/auth/me");
      setState({ loading: false, authenticated: !!me.authenticated, user: me.user });
    } catch {
      setState({ loading: false, authenticated: false, user: null });
    }
  }, []);

  useEffect(() => { refresh(); }, [refresh]);

  const login = async (username, password) => {
    await api("/auth/login", { method: "POST", body: { username, password } });
    await refresh();
  };
  const logout = async () => {
    try { await api("/auth/logout", { method: "POST" }); }
    finally { setState({ loading: false, authenticated: false, user: null }); }
  };

  return <AuthCtx.Provider value={{ ...state, login, logout, refresh }}>{children}</AuthCtx.Provider>;
}

export const useAuth = () => useContext(AuthCtx);

export function RequireAuth({ children }) {
  const { loading, authenticated } = useAuth();
  const loc = useLocation();
  if (loading) {
    return <div style={{ padding: "5rem 2rem", fontFamily: "var(--font-sans)", color: "var(--text-muted)" }}>Loading…</div>;
  }
  if (!authenticated) return <Navigate to="/admin/login" replace state={{ from: loc.pathname }} />;
  return children;
}
