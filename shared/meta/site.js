/* School-wide metadata constants. Pure data; no platform deps. */

// Production origin, used for static fallbacks (index.html) and when a request
// origin is unavailable. Change this single constant if the deploy domain moves.
export const SITE_ORIGIN = "https://www.srigujaratividhyalaya.com";
export const SITE_NAME = "Sri Gujarati Vidyalaya";

export const ORGANIZATION = {
  name: "Sri Gujarati Vidyalaya Higher Secondary School",
  logoPath: "/assets/logo-lockup.png",
  address: { locality: "Kozhikode", region: "Kerala", country: "IN" },
};

// A dedicated 1200x627 branded Careers OG image must be placed at this path
// (public/assets/careers-og.jpg) before deploy. See the plan's deploy steps.
export const DEFAULT_OG_IMAGE = { path: "/assets/careers-og.jpg", width: 1200, height: 627 };

export const CAREERS_DESCRIPTION =
  "Join the faculty of Sri Gujarati Vidyalaya — a 150-year-old English-medium, Government-recognised school in the heart of Kozhikode.";

/* Build an absolute URL from an origin + a root-relative path. */
export function absoluteUrl(origin, path) {
  const base = (origin || SITE_ORIGIN).replace(/\/$/, "");
  if (!path) return base;
  if (/^https?:\/\//.test(path)) return path;
  return base + (path.startsWith("/") ? path : "/" + path);
}
