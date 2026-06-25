import { useEffect } from "react";

/*
 * Apply page metadata for client-side navigation: document.title, the
 * <link rel="canonical">, and optionally <meta name="robots">. Server-side
 * injection (api/meta) owns OG + JSON-LD for crawlers, so this intentionally
 * manages only title/canonical/robots to avoid duplicating server tags.
 *
 * Pass { title, canonical, robots }.
 */
export function useDocumentMeta({ title, canonical, robots } = {}) {
  useEffect(() => {
    if (title) document.title = title;
  }, [title]);

  useEffect(() => {
    if (!canonical) return;
    let link = document.head.querySelector('link[rel="canonical"]');
    const created = !link;
    if (!link) {
      link = document.createElement("link");
      link.setAttribute("rel", "canonical");
      document.head.appendChild(link);
    }
    const prev = link.getAttribute("href");
    link.setAttribute("href", canonical);
    return () => {
      if (created) link.remove();
      else if (prev != null) link.setAttribute("href", prev);
    };
  }, [canonical]);

  useEffect(() => {
    if (!robots) return;
    let tag = document.head.querySelector('meta[name="robots"]');
    const created = !tag;
    if (!tag) {
      tag = document.createElement("meta");
      tag.setAttribute("name", "robots");
      document.head.appendChild(tag);
    }
    const prev = tag.getAttribute("content");
    tag.setAttribute("content", robots);
    return () => {
      if (created) tag.remove();
      else if (prev != null) tag.setAttribute("content", prev);
    };
  }, [robots]);
}
