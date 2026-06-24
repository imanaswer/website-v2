/*
 * Consistent JSON responses + friendly error handling for every endpoint.
 *   success → { data: ... }            (HTTP 200/201)
 *   failure → { error: { message, code, detail? } }
 * `message` is always plain language a non-technical admin can understand;
 * technical detail is logged server-side, never shown raw.
 */

export class ApiError extends Error {
  constructor(status, code, message, detail) {
    super(message);
    this.status = status;
    this.code = code;
    this.detail = detail;
  }
}

// Reusable friendly errors.
export const Err = {
  badMethod: () => new ApiError(405, "method_not_allowed", "That action isn't allowed here."),
  unauthorized: () => new ApiError(401, "unauthorized", "Your session has expired. Please log in again."),
  notConfigured: (what) => new ApiError(500, "not_configured", `${what} isn't set up yet. Please check the configuration.`),
  notFound: (what = "That item") => new ApiError(404, "not_found", `${what} could not be found. It may have been deleted.`),
  missing: (field) => new ApiError(400, "missing_field", `Please add ${field} before saving.`),
  invalid: (message) => new ApiError(400, "invalid_input", message),
  badCredentials: () => new ApiError(401, "bad_credentials", "That username or password is incorrect."),
};

// Wrap a handler so any thrown error becomes a friendly JSON response.
export function withErrors(handler) {
  return async (req, res) => {
    try {
      await handler(req, res);
    } catch (e) {
      sendError(res, e);
    }
  };
}

export function sendData(res, data, status = 200) {
  return res.status(status).json({ data });
}

export function sendError(res, err) {
  if (err instanceof ApiError) {
    return res.status(err.status).json({ error: { message: err.message, code: err.code, detail: err.detail } });
  }
  const raw = String(err?.message || err);
  if (/DATABASE_URL|connect|ECONNREFUSED|ENOTFOUND|fetch failed|timeout/i.test(raw)) {
    console.error("DB/connection error:", err);
    return res.status(503).json({
      error: { message: "We couldn't reach the database right now. Please try again in a moment.", code: "db_unavailable" },
    });
  }
  console.error("Unexpected error:", err);
  return res.status(500).json({
    error: { message: "Something went wrong on our side. Please try again in a moment.", code: "internal_error" },
  });
}
