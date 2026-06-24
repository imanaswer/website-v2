/*
 * Tiny fetch wrapper that always surfaces a human-readable message.
 * Throws FriendlyError { message, code, detail } that admin screens display.
 */
export class FriendlyError extends Error {
  constructor(message, code, detail) {
    super(message);
    this.code = code;
    this.detail = detail;
  }
}

export async function api(path, { method = "GET", body, signal } = {}) {
  let res;
  try {
    res = await fetch(`/api${path}`, {
      method,
      headers: body != null ? { "Content-Type": "application/json" } : undefined,
      body: body != null ? JSON.stringify(body) : undefined,
      credentials: "same-origin",
      signal,
    });
  } catch {
    throw new FriendlyError(
      "We couldn't reach the server. Please check your internet connection and try again.",
      "network"
    );
  }

  const text = await res.text();
  let data = null;
  if (text) {
    try { data = JSON.parse(text); } catch { /* non-JSON response */ }
  }

  if (!res.ok) {
    const e = data && data.error;
    throw new FriendlyError(
      (e && e.message) || "Something went wrong. Please try again.",
      (e && e.code) || `http_${res.status}`,
      e && e.detail
    );
  }
  // Endpoints respond with { data: ... }; unwrap it for callers.
  return data && Object.prototype.hasOwnProperty.call(data, "data") ? data.data : data;
}

/* Read a File as base64 (without the data: prefix). */
function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result).split(",")[1] || "");
    reader.onerror = () => reject(new FriendlyError("That file couldn't be read. Please choose another.", "read_failed"));
    reader.readAsDataURL(file);
  });
}

/*
 * Upload an image/document through our backend to Supabase Storage.
 * Returns { url, path }. Throws FriendlyError on failure.
 */
export async function uploadFile(file, folder = "uploads") {
  const dataBase64 = await fileToBase64(file);
  return api("/uploads", {
    method: "POST",
    body: { filename: file.name, contentType: file.type, folder, dataBase64 },
  });
}
