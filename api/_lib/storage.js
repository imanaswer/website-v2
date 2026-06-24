import { createClient } from "@supabase/supabase-js";
import { ApiError } from "./response.js";

/*
 * Supabase Storage — server-side only. Uses the SERVICE ROLE key, which must
 * NEVER be exposed to the frontend. Uploads go through our /api/uploads
 * endpoint; the frontend only ever receives the resulting public URL.
 *
 * Files arrive base64-encoded in the request body (kept under Vercel's ~4.5 MB
 * body limit by the 3 MB cap below) and are stored in a public bucket.
 */
const BUCKET = process.env.SUPABASE_STORAGE_BUCKET || "media";
const MAX_BYTES = 3 * 1024 * 1024; // 3 MB original file
const ALLOWED = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "application/pdf": "pdf",
};

let _client = null;
function client() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new ApiError(500, "storage_not_configured", "File uploads aren't set up yet. Please add the Supabase storage keys.");
  if (!_client) _client = createClient(url, key, { auth: { persistSession: false } });
  return _client;
}

function safeName(filename, ext) {
  const base = String(filename || "file").replace(/\.[^.]*$/, "").replace(/[^a-zA-Z0-9._-]/g, "-").slice(0, 60) || "file";
  const stamp = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  return `${stamp}-${base}.${ext}`;
}

/*
 * Upload a base64 asset to Supabase Storage and return its public URL + path.
 * Reusable across news images, faculty photos, gallery, PDFs, etc.
 */
export async function uploadAsset({ folder = "uploads", filename, contentType, base64 }) {
  const ext = ALLOWED[contentType];
  if (!ext) throw new ApiError(415, "bad_file_type", "That file type isn't supported. Please upload a JPG, PNG, WebP or PDF.");
  if (!base64) throw new ApiError(400, "missing_file", "No file was received. Please choose a file and try again.");

  const buffer = Buffer.from(base64, "base64");
  if (buffer.length === 0) throw new ApiError(400, "missing_file", "That file appears to be empty. Please choose another.");
  if (buffer.length > MAX_BYTES) throw new ApiError(413, "file_too_large", "That file is too large — please keep it under 3 MB.");

  const path = `${String(folder).replace(/[^a-z0-9/_-]/gi, "")}/${safeName(filename, ext)}`;

  const { error } = await client().storage.from(BUCKET).upload(path, buffer, { contentType, upsert: false });
  if (error) {
    if (/bucket/i.test(error.message)) {
      throw new ApiError(500, "bucket_missing", `The storage bucket "${BUCKET}" doesn't exist yet. Please create it in Supabase.`, error.message);
    }
    throw new ApiError(502, "upload_failed", "The file couldn't be uploaded right now. Please try again in a moment.", error.message);
  }

  const { data } = client().storage.from(BUCKET).getPublicUrl(path);
  return { url: data.publicUrl, path };
}
