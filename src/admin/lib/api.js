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
  return data;
}
