import { test } from "node:test";
import assert from "node:assert/strict";
import { slugify, truncate, parseTrailingId, escapeHtml } from "./strings.js";

test("slugify lowercases, strips punctuation, hyphenates", () => {
  assert.equal(slugify("Physics Teacher (PGT)!"), "physics-teacher-pgt");
  assert.equal(slugify("  Maths & Science  "), "maths-science");
});

test("slugify falls back to 'item' when empty", () => {
  assert.equal(slugify(""), "item");
  assert.equal(slugify("!!!"), "item");
});

test("truncate keeps short strings and cuts on a word boundary with ellipsis", () => {
  assert.equal(truncate("short text", 50), "short text");
  const long = "We are seeking an experienced and dedicated teacher to join our faculty";
  const out = truncate(long, 30);
  assert.ok(out.length <= 31, "respects max + ellipsis");
  assert.ok(out.endsWith("…"));
  assert.ok(!out.includes("  "));
});

test("parseTrailingId extracts the numeric suffix", () => {
  assert.equal(parseTrailingId("physics-teacher-123"), 123);
  assert.equal(parseTrailingId("42"), 42);
  assert.equal(parseTrailingId("no-number"), null);
  assert.equal(parseTrailingId(""), null);
});

test("escapeHtml escapes the five entities", () => {
  assert.equal(escapeHtml(`<a href="x">'&'</a>`), "&lt;a href=&quot;x&quot;&gt;&#39;&amp;&#39;&lt;/a&gt;");
});
