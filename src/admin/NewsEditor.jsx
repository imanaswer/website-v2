import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { upload } from "@vercel/blob/client";
import { Input } from "../components/Input";
import { Checkbox } from "../components/Checkbox";
import { Button } from "../components/Button";
import { Icon } from "../components/Icon";
import { Img } from "../components/Img";
import { api } from "./lib/api.js";
import { Notice } from "./ui/Notice.jsx";

const EMPTY = { title: "", category: "", date: new Date().toISOString().slice(0, 10), body: "", image_url: "", published: false };

export function NewsEditor() {
  const { id } = useParams();
  const isNew = !id;
  const navigate = useNavigate();
  const [form, setForm] = useState(EMPTY);
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [notice, setNotice] = useState(null);

  useEffect(() => {
    if (isNew) return;
    let active = true;
    api(`/news/${id}`)
      .then((row) => { if (active) { setForm({ ...EMPTY, ...row, date: (row.date || "").slice(0, 10) }); setLoading(false); } })
      .catch((err) => { if (active) { setNotice({ type: "error", message: err.message, code: err.code, detail: err.detail }); setLoading(false); } });
    return () => { active = false; };
  }, [id, isNew]);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const onPickImage = async (e) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    if (!/^image\/(jpeg|png|webp)$/.test(file.type)) {
      setNotice({ type: "error", message: "That file isn't a supported image. Please choose a JPG, PNG or WebP.", code: "bad_file_type" });
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setNotice({ type: "error", message: "That photo is too large — please use one under 5 MB.", code: "file_too_large" });
      return;
    }
    setUploading(true);
    setNotice(null);
    try {
      const blob = await upload(file.name, file, { access: "public", handleUploadUrl: "/api/upload" });
      setForm((f) => ({ ...f, image_url: blob.url }));
      setNotice({ type: "success", message: "Photo uploaded." });
    } catch (err) {
      setNotice({ type: "error", message: err?.message || "The photo couldn't be uploaded. Please try again in a moment.", code: "upload_failed" });
    } finally {
      setUploading(false);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setNotice(null);
    if (!form.title.trim()) {
      setNotice({ type: "error", message: "Please add a title before saving.", code: "missing_title" });
      return;
    }
    setSaving(true);
    try {
      if (isNew) {
        await api("/news", { method: "POST", body: form });
      } else {
        await api(`/news/${id}`, { method: "PUT", body: form });
      }
      navigate("/admin/news");
    } catch (err) {
      setNotice({ type: "error", message: err.message, code: err.code, detail: err.detail });
      setSaving(false);
    }
  };

  if (loading) return <p style={{ fontFamily: "var(--font-sans)", color: "var(--text-muted)" }}>Loading…</p>;

  return (
    <div style={{ maxWidth: 720 }}>
      <button onClick={() => navigate("/admin/news")} className="link-line" style={{ marginBottom: "1.2rem" }}>
        <Icon name="arrow-left" size={15} /> Back to news
      </button>
      <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 400, fontSize: "clamp(1.6rem,1.3rem + 1.2vw,2.2rem)", marginBottom: "1.6rem" }}>
        {isNew ? "New news item" : "Edit news item"}
      </h1>

      <Notice notice={notice} onClose={() => setNotice(null)} />

      <form onSubmit={onSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
        <Input label="Title" required value={form.title} onChange={set("title")} placeholder="e.g. Plus One admissions open" />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.2rem" }}>
          <Input label="Category" value={form.category} onChange={set("category")} placeholder="e.g. Admissions" />
          <Input label="Date" type="date" value={form.date} onChange={set("date")} />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
          <label style={{ fontFamily: "var(--font-sans)", fontSize: "0.8125rem", fontWeight: 600 }}>Body</label>
          <textarea value={form.body} onChange={set("body")} rows={5}
            placeholder="Write the announcement…"
            style={{ fontFamily: "var(--font-sans)", fontSize: "0.9375rem", color: "var(--text-primary)", padding: "0.75rem 0.9rem", border: "1px solid var(--border-strong)", borderRadius: "var(--radius-md)", resize: "vertical", background: "var(--surface-card)" }} />
        </div>

        {/* Image */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          <label style={{ fontFamily: "var(--font-sans)", fontSize: "0.8125rem", fontWeight: 600 }}>Photo</label>
          <div style={{ display: "flex", gap: "1rem", alignItems: "center", flexWrap: "wrap" }}>
            {form.image_url ? (
              <div className="photo photo-frame" style={{ width: 120 }}>
                <Img src={form.image_url} alt="" style={{ aspectRatio: "4/3" }} />
              </div>
            ) : (
              <div className="photo-frame" style={{ width: 120, aspectRatio: "4/3", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--surface-sunken)", color: "var(--sand-400)" }}>
                <Icon name="image" size={26} />
              </div>
            )}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <label style={{ display: "inline-flex" }}>
                <input type="file" accept="image/jpeg,image/png,image/webp" onChange={onPickImage} style={{ display: "none" }} />
                <span className="link-line" style={{ cursor: uploading ? "default" : "pointer" }}>
                  <Icon name="upload-simple" size={15} /> {uploading ? "Uploading…" : form.image_url ? "Replace photo" : "Upload a photo"}
                </span>
              </label>
              {form.image_url && (
                <button type="button" onClick={() => setForm((f) => ({ ...f, image_url: "" }))}
                  style={{ background: "none", border: "none", padding: 0, cursor: "pointer", color: "var(--text-muted)", fontFamily: "var(--font-sans)", fontSize: "0.82rem", textAlign: "left" }}>
                  Remove photo
                </button>
              )}
              <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.75rem", color: "var(--text-muted)" }}>JPG, PNG or WebP · up to 5 MB</span>
            </div>
          </div>
        </div>

        <Checkbox label="Published" description="When on, this appears on the public website." checked={!!form.published}
          onChange={(e) => setForm((f) => ({ ...f, published: e.target.checked }))} />

        <div style={{ display: "flex", gap: "0.8rem", marginTop: "0.5rem" }}>
          <Button type="submit" size="lg" disabled={saving || uploading} iconRight={<Icon name="check" size={18} />}>
            {saving ? "Saving…" : "Save"}
          </Button>
          <Button type="button" variant="secondary" size="lg" onClick={() => navigate("/admin/news")}>Cancel</Button>
        </div>
      </form>
    </div>
  );
}
