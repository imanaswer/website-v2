import { test } from "node:test";
import assert from "node:assert/strict";
import { absoluteUrl, SITE_ORIGIN, DEFAULT_OG_IMAGE } from "./site.js";

test("absoluteUrl joins origin + root-relative path", () => {
  assert.equal(absoluteUrl("https://x.com", "/careers/a-1"), "https://x.com/careers/a-1");
  assert.equal(absoluteUrl("https://x.com/", "assets/og.jpg"), "https://x.com/assets/og.jpg");
});

test("absoluteUrl passes through already-absolute URLs", () => {
  assert.equal(absoluteUrl("https://x.com", "https://cdn.com/a.jpg"), "https://cdn.com/a.jpg");
});

test("absoluteUrl falls back to SITE_ORIGIN when origin missing", () => {
  assert.equal(absoluteUrl(undefined, "/x"), SITE_ORIGIN + "/x");
});

test("default OG image is 1200x627", () => {
  assert.equal(DEFAULT_OG_IMAGE.width, 1200);
  assert.equal(DEFAULT_OG_IMAGE.height, 627);
});
