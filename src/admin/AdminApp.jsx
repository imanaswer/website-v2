import { Routes, Route } from "react-router-dom";
import { AuthProvider, RequireAuth } from "./lib/auth.jsx";
import { AdminLayout } from "./AdminLayout.jsx";
import { LoginPage } from "./LoginPage.jsx";
import { Dashboard } from "./Dashboard.jsx";
import { ResourceList } from "./ResourceList.jsx";
import { ResourceForm } from "./ResourceForm.jsx";
import { RESOURCES } from "./lib/resources.js";
import "./admin.css";

export function AdminApp() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="login" element={<LoginPage />} />
        <Route element={<RequireAuth><AdminLayout /></RequireAuth>}>
          <Route index element={<Dashboard />} />
          {RESOURCES.map((r) => [
            <Route key={r.path} path={r.path} element={<ResourceList resource={r} />} />,
            <Route key={`${r.path}-new`} path={`${r.path}/new`} element={<ResourceForm resource={r} />} />,
            <Route key={`${r.path}-id`} path={`${r.path}/:id`} element={<ResourceForm resource={r} />} />,
          ])}
        </Route>
      </Routes>
    </AuthProvider>
  );
}
