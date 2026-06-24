import { Routes, Route } from "react-router-dom";
import { AuthProvider, RequireAuth } from "./lib/auth.jsx";
import { AdminLayout } from "./AdminLayout.jsx";
import { LoginPage } from "./LoginPage.jsx";
import { Dashboard } from "./Dashboard.jsx";
import { NewsList } from "./NewsList.jsx";
import { NewsEditor } from "./NewsEditor.jsx";
import "./admin.css";

export function AdminApp() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="login" element={<LoginPage />} />
        <Route element={<RequireAuth><AdminLayout /></RequireAuth>}>
          <Route index element={<Dashboard />} />
          <Route path="news" element={<NewsList />} />
          <Route path="news/new" element={<NewsEditor />} />
          <Route path="news/:id" element={<NewsEditor />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}
