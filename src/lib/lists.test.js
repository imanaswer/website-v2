import { test } from "node:test";
import assert from "node:assert/strict";
import { lines } from "./lists.js";

test("splits newline text into trimmed items", () => {
  assert.deepEqual(lines("M.Sc\nB.Ed\nM.Ed"), ["M.Sc", "B.Ed", "M.Ed"]);
});

test("drops blank lines and trims whitespace", () => {
  assert.deepEqual(lines("  A \n\n  B  \n"), ["A", "B"]);
});

test("empty / nullish input -> empty array", () => {
  assert.deepEqual(lines(""), []);
  assert.deepEqual(lines(null), []);
  assert.deepEqual(lines(undefined), []);
});
