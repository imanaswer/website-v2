import { ApiError } from "./response.js";

/*
 * Small input-validation helpers. Each returns a clean value or throws a
 * friendly ApiError, so endpoints stay short and messages stay consistent.
 */

export function str(body, field, { required = false, max = 5000, label } = {}) {
  let v = body?.[field];
  const name = label || field;
  if (v == null || v === "") {
    if (required) throw new ApiError(400, "missing_field", `Please add ${name} before saving.`);
    return null;
  }
  v = String(v).trim();
  if (v.length > max) throw new ApiError(400, "too_long", `${name} is too long (max ${max} characters).`);
  return v;
}

export function bool(body, field, fallback = false) {
  const v = body?.[field];
  if (typeof v === "boolean") return v;
  if (v == null) return fallback;
  return v === "true" || v === 1 || v === "1" || v === true;
}

export function date(body, field, { fallbackToday = false } = {}) {
  const v = body?.[field];
  if (!v) return fallbackToday ? new Date().toISOString().slice(0, 10) : null;
  const s = String(v).slice(0, 10);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(s)) {
    throw new ApiError(400, "invalid_date", "Please use a valid date.");
  }
  return s;
}

export function intId(value) {
  const n = Number(value);
  if (!Number.isInteger(n) || n <= 0) throw new ApiError(404, "not_found", "That item could not be found.");
  return n;
}

export function int(body, field, fallback = 0) {
  const v = body?.[field];
  if (v == null || v === "") return fallback;
  const n = Number(v);
  if (!Number.isFinite(n)) throw new ApiError(400, "invalid_number", `${field} must be a number.`);
  return Math.trunc(n);
}

export function oneOf(body, field, allowed, fallback) {
  const v = body?.[field];
  if (v == null || v === "") return fallback;
  if (!allowed.includes(v)) throw new ApiError(400, "invalid_choice", `${field} must be one of: ${allowed.join(", ")}.`);
  return v;
}
