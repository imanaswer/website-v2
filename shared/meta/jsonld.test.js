import { test } from "node:test";
import assert from "node:assert/strict";
import { buildJsonLd, organizationNode } from "./jsonld.js";

const future = "2999-01-01";
const past = "2000-01-01";
const base = {
  id: 7,
  role: "Physics Teacher",
  description: "Teach physics to senior students.",
  type: "Full-time",
  location: "Mananchira",
  created_at: "2026-06-01T00:00:00.000Z",
};

test("organizationNode builds an absolute logo + sameAs", () => {
  const o = organizationNode("https://x.com");
  assert.equal(o["@type"], "Organization");
  assert.equal(o.sameAs, "https://x.com/");
  assert.match(o.logo, /^https:\/\/x\.com\/assets\//);
});

test("JobPosting maps fields and employmentType enum", () => {
  const node = buildJsonLd("JobPosting", { ...base, closes_on: future }, { origin: "https://x.com" });
  assert.equal(node["@type"], "JobPosting");
  assert.equal(node.title, "Physics Teacher");
  assert.equal(node.employmentType, "FULL_TIME");
  assert.equal(node.validThrough, new Date(future).toISOString());
  assert.equal(node.hiringOrganization["@type"], "Organization");
  assert.equal(node.jobLocation.address.addressLocality, "Kozhikode");
  assert.equal(node.identifier.value, "7");
});

test("JobPosting omitted when description missing", () => {
  assert.equal(buildJsonLd("JobPosting", { ...base, description: "" }, {}), null);
});

test("JobPosting omitted when already closed (past closes_on)", () => {
  assert.equal(buildJsonLd("JobPosting", { ...base, closes_on: past }, {}), null);
});

test("JobPosting without closes_on omits validThrough but is still emitted", () => {
  const node = buildJsonLd("JobPosting", { ...base, closes_on: null }, {});
  assert.ok(node);
  assert.equal(node.validThrough, undefined);
});

test("unknown schema type returns null", () => {
  assert.equal(buildJsonLd("Nonsense", base, {}), null);
});
