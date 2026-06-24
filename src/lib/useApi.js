import { useEffect, useState } from "react";

/*
 * Read a public API resource (e.g. "news", "faculty"). No auth needed.
 * Returns { data, loading, error }. On failure (e.g. the database isn't
 * connected yet) `data` is null and callers fall back to curated content,
 * so the public site never looks broken.
 */
export function useApi(path) {
  const [state, setState] = useState({ data: null, loading: true, error: false });

  useEffect(() => {
    let active = true;
    setState({ data: null, loading: true, error: false });
    fetch(`/api/${path}`)
      .then(async (r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        const body = await r.json();
        return body && body.data;
      })
      .then((data) => active && setState({ data, loading: false, error: false }))
      .catch(() => active && setState({ data: null, loading: false, error: true }));
    return () => { active = false; };
  }, [path]);

  return state;
}

/* Use API rows when present, otherwise the curated fallback. */
export function withFallback(data, fallback) {
  return Array.isArray(data) && data.length > 0 ? data : fallback;
}
