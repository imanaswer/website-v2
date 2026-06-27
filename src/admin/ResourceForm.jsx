import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Input } from "../components/Input";
import { Checkbox } from "../components/Checkbox";
import { Button } from "../components/Button";
import { Icon } from "../components/Icon";
import { Img } from "../components/Img";
import { api, uploadFile } from "./lib/api.js";
import { Notice } from "./ui/Notice.jsx";
import { Label } from "../components/Ed";

const lbl = { fontFamily: "var(--font-sans)", fontSize: "0.8125rem", fontWeight: 600, color: "var(--text-primary)" };
const hintStyle = { fontFamily: "var(--font-sans)", fontSize: "0.75rem", color: "var(--text-muted)" };
const fieldBox = { background: "var(--surface-card)", border: "1px solid var(--border-strong)", borderRadius: "var(--radius-md)" };

function normalize(resource, row) {
  const base = resource.defaults();
  const out = { ...base };
  for (const k of Object.keys(base)) {
    let v = row[k];
    if (v == null) v = base[k];
    const f = resource.fields.find((ff) => ff.name === k);
    if (f && f.type === "date" && v) v = String(v).slice(0, 10);
    out[k] = v;
  }
  return out;
}

export function ResourceForm({ resource }) {
  const { id } = useParams();
  const isNew = !id;
  const navigate = useNavigate();
  const base = `/admin/${resource.path}`;
  const [form, setForm] = useState(resource.defaults());
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [uploadingField, setUploadingField] = useState(null);
  const [notice, setNotice] = useState(null);

  useEffect(() => {
    if (isNew) { setForm(resource.defaults()); setLoading(false); return; }
    let active = true;
    setLoading(true);
    api(`/${resource.path}/${id}`)
      .then((row) => { if (active) { setForm(normalize(resource, row)); setLoading(false); } })
      .catch((err) => { if (active) { setNotice({ type: "error", message: err.message, code: err.code, detail: err.detail }); setLoading(false); } });
    return () => { active = false; };
  }, [id, isNew, resource]);

  const set = (name, value) => setForm((f) => ({ ...f, [name]: value }));

  async function onUpload(field, file) {
    if (!file) return;
    if (!/^image\/(jpeg|png|webp)$/.test(file.type)) {
      setNotice({ type: "error", message: "That file isn't a supported image. Please choose a JPG, PNG or WebP.", code: "bad_file_type" });
      return;
    }
    if (file.size > 3 * 1024 * 1024) {
      setNotice({ type: "error", message: "That photo is too large — please use one under 3 MB.", code: "file_too_large" });
      return;
    }
    setUploadingField(field.name);
    setNotice(null);
    try {
      const { url } = await uploadFile(file, field.folder || resource.path);
      set(field.name, url);
      setNotice({ type: "success", message: "Photo uploaded." });
    } catch (err) {
      setNotice({ type: "error", message: err?.message || "The photo couldn't be uploaded. Please try again.", code: err?.code || "upload_failed", detail: err?.detail });
    } finally {
      setUploadingField(null);
    }
  }

  async function onSubmit(e) {
    e.preventDefault();
    setNotice(null);
    const missing = resource.fields.find((f) => f.required && !String(form[f.name] || "").trim());
    if (missing) {
      setNotice({ type: "error", message: `Please add ${missing.label.toLowerCase()} before saving.`, code: "missing_field" });
      return;
    }
    setSaving(true);
    try {
      if (isNew) await api(`/${resource.path}`, { method: "POST", body: form });
      else await api(`/${resource.path}/${id}`, { method: "PUT", body: form });
      navigate(base);
    } catch (err) {
      setNotice({ type: "error", message: err.message, code: err.code, detail: err.detail });
      setSaving(false);
    }
  }

  if (loading) return <p style={{ fontFamily: "var(--font-sans)", color: "var(--text-muted)" }}>Loading…</p>;

  const fields = resource.fields.filter((f) => !f.showIf || f.showIf(form));

  return (
    <div style={{ maxWidth: 760 }}>
      <button onClick={() => navigate(base)} className="link-line" style={{ marginBottom: "1.2rem" }}>
        <Icon name="arrow-left" size={15} /> Back to {resource.label}
      </button>
      <Label>{resource.label}</Label>
      <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 400, fontSize: "clamp(1.6rem,1.3rem + 1.2vw,2.2rem)", margin: "0.5rem 0 1.6rem" }}>
        {isNew ? "Add new" : "Edit"}
      </h1>

      <Notice notice={notice} onClose={() => setNotice(null)} />

      <form onSubmit={onSubmit} className="admin-form-grid">
        {fields.map((field) => (
          <div key={field.name} className={field.half ? "" : "full"}>
            <Field
              field={field}
              value={form[field.name]}
              onChange={(v) => set(field.name, v)}
              uploading={uploadingField === field.name}
              onUpload={(file) => onUpload(field, file)}
            />
          </div>
        ))}
        <div className="full" style={{ display: "flex", gap: "0.8rem", marginTop: "0.5rem" }}>
          <Button type="submit" size="lg" disabled={saving || !!uploadingField} iconRight={<Icon name="check" size={18} />}>
            {saving ? "Saving…" : "Save"}
          </Button>
          <Button type="button" variant="secondary" size="lg" onClick={() => navigate(base)}>Cancel</Button>
        </div>
      </form>
    </div>
  );
}

function Field({ field, value, onChange, uploading, onUpload }) {
  if (field.type === "textarea") {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
        <label style={lbl}>{field.label}{field.required && <span style={{ color: "var(--red-600)" }}> *</span>}</label>
        <textarea value={value || ""} onChange={(e) => onChange(e.target.value)} rows={5} placeholder={field.placeholder}
          style={{ ...fieldBox, fontFamily: "var(--font-sans)", fontSize: "0.9375rem", color: "var(--text-primary)", padding: "0.75rem 0.9rem", resize: "vertical" }} />
        {field.help && <span style={hintStyle}>{field.help}</span>}
      </div>
    );
  }

  if (field.type === "checkbox") {
    return <Checkbox label={field.label} description={field.help} checked={!!value} onChange={(e) => onChange(e.target.checked)} />;
  }

  if (field.type === "select") {
    const opts = field.options.map((o) => (typeof o === "string" ? { value: o, label: o } : o));
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
        <label style={lbl}>{field.label}</label>
        <select value={value || ""} onChange={(e) => onChange(e.target.value)}
          style={{ ...fieldBox, fontFamily: "var(--font-sans)", fontSize: "0.9375rem", color: "var(--text-primary)", padding: "0.75rem 0.9rem", cursor: "pointer" }}>
          {opts.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
        {field.help && <span style={hintStyle}>{field.help}</span>}
      </div>
    );
  }

  if (field.type === "image") {
    return <ImageField field={field} value={value} onChange={onChange} uploading={uploading} onUpload={onUpload} />;
  }

  const type = field.type === "number" ? "number" : field.type === "url" ? "url" : field.type === "date" ? "date" : "text";
  return (
    <Input label={field.label} required={field.required} hint={field.help} type={type}
      placeholder={field.placeholder} value={value ?? ""} onChange={(e) => onChange(e.target.value)} />
  );
}

function ImageField({ field, value, onChange, uploading, onUpload }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
      <label style={lbl}>{field.label}</label>
      <div style={{ display: "flex", gap: "1rem", alignItems: "center", flexWrap: "wrap" }}>
        {value ? (
          <div className="photo photo-frame" style={{ width: 120 }}>
            <Img src={value} alt="" style={{ aspectRatio: "4/3" }} />
          </div>
        ) : (
          <div className="photo-frame" style={{ width: 120, aspectRatio: "4/3", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--surface-sunken)", color: "var(--sand-400)" }}>
            <Icon name="image" size={26} />
          </div>
        )}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          <label style={{ display: "inline-flex" }}>
            <input type="file" accept="image/jpeg,image/png,image/webp" onChange={(e) => { const f = e.target.files?.[0]; e.target.value = ""; onUpload(f); }} style={{ display: "none" }} />
            <span className="link-line" style={{ cursor: uploading ? "default" : "pointer" }}>
              <Icon name="upload-simple" size={15} /> {uploading ? "Uploading…" : value ? "Replace photo" : "Upload a photo"}
            </span>
          </label>
          {value && (
            <button type="button" onClick={() => onChange("")} style={{ background: "none", border: "none", padding: 0, cursor: "pointer", color: "var(--text-muted)", fontFamily: "var(--font-sans)", fontSize: "0.82rem", textAlign: "left" }}>
              Remove photo
            </button>
          )}
          <span style={hintStyle}>JPG, PNG or WebP · up to 3 MB</span>
        </div>
      </div>
    </div>
  );
}
