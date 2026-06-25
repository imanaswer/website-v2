import { test } from "node:test";
import assert from "node:assert/strict";
import { injectMeta } from "./render-meta.js";

const HTML = `<!doctype html><html><head>
  <title>SGV</title>
  <meta property="og:title" content="Generic" />
  <link rel="canonical" href="https://x.com/" />
  <script type="application/ld+json">{"@type":"WebSite"}</script>
</head><body><div id="root"></div></body></html>`;

test("injects per-entity tags before </head>", () => {
  const out = injectMeta(HTML, { title: "Job A", canonical: "https://x.com/careers/job-a-1" });
  assert.match(out, /<meta property="og:title" content="Job A" \/>/);
  assert.ok(out.indexOf("</head>") > out.indexOf("Job A"));
});

test("removes pre-existing generic og/canonical/jsonld so there are no duplicates", () => {
  const out = injectMeta(HTML, { title: "Job A", canonical: "https://x.com/careers/job-a-1" });
  assert.ok(!out.includes('content="Generic"'), "old og:title removed");
  assert.equal((out.match(/rel="canonical"/g) || []).length, 1, "single canonical");
  assert.ok(!out.includes('"@type":"WebSite"'), "old jsonld removed");
  assert.ok(out.includes('<div id="root">'), "body untouched");
});

test("returns html unchanged when meta is null", () => {
  assert.equal(injectMeta(HTML, null), HTML);
});
