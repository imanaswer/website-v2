import { test } from "node:test";
import assert from "node:assert/strict";
import { resolveMetadata, metaConfig } from "./resolvers.js";

const job = {
  id: 12,
  role: "Maths Teacher",
  department: "Mathematics",
  type: "Full-time",
  location: "Kozhikode",
  description: "A long description ".repeat(40),
  created_at: "2026-06-01T00:00:00.000Z",
  closes_on: "2999-01-01",
  published: true,
};

test("resolves job meta with canonical slug-id URL", () => {
  const meta = resolveMetadata("jobs", job, { origin: "https://x.com" });
  assert.equal(meta.title, "Maths Teacher — Sri Gujarati Vidyalaya");
  assert.equal(meta.url, "https://x.com/careers/maths-teacher-12");
  assert.equal(meta.canonical, meta.url);
  assert.equal(meta.robots, "index,follow");
  assert.ok(meta.description.length <= 201);
  assert.equal(meta.jsonLd["@type"], "JobPosting");
});

test("uses per-job og_image when present (no width/height)", () => {
  const meta = resolveMetadata("jobs", { ...job, og_image: "https://cdn.com/j.jpg" }, { origin: "https://x.com" });
  assert.equal(meta.image, "https://cdn.com/j.jpg");
  assert.equal(meta.imageWidth, undefined);
});

test("falls back to default OG image with dimensions", () => {
  const meta = resolveMetadata("jobs", job, { origin: "https://x.com" });
  assert.match(meta.image, /\/assets\/careers-og\.jpg$/);
  assert.equal(meta.imageWidth, 1200);
});

test("description falls back to Dept • Type • Location when no body", () => {
  const meta = resolveMetadata("jobs", { ...job, description: "" }, { origin: "https://x.com" });
  assert.equal(meta.description, "Mathematics • Full-time • Kozhikode");
});

test("unknown type or missing entity returns null", () => {
  assert.equal(resolveMetadata("widgets", job, {}), null);
  assert.equal(resolveMetadata("jobs", null, {}), null);
});

test("metaConfig exposes table + filter for the server", () => {
  const cfg = metaConfig("jobs");
  assert.equal(cfg.table, "jobs");
  assert.equal(cfg.publicFilter, "published");
  assert.equal(cfg.lookupField, "id");
});

test("faculty resolver builds titled OG + canonical", () => {
  const meta = resolveMetadata(
    "faculty",
    { id: 7, name: "Anjali Nair", designation: "Senior Mathematics Teacher", bio: "Loves calculus.", photo_url: "/p.jpg" },
    { origin: "https://x.test" }
  );
  assert.equal(meta.title, "Anjali Nair — Senior Mathematics Teacher — Sri Gujarati Vidyalaya");
  assert.equal(meta.canonical, "https://x.test/faculty/anjali-nair-7");
});

test("management resolver falls back to position when no bio", () => {
  const meta = resolveMetadata(
    "management",
    { id: 3, name: "Harshad Shah", position: "President" },
    { origin: "https://x.test" }
  );
  assert.equal(meta.canonical, "https://x.test/management/harshad-shah-3");
  assert.ok(meta.description.length > 0);
});
