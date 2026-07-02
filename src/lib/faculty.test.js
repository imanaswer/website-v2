import { test } from "node:test";
import assert from "node:assert/strict";
import { normalizeFaculty, departmentsOf, filterSortGroup } from "./faculty.js";

const rows = [
  { id: 1, name: "Bina", subject: "Hindi", department: "Languages", photo_url: "b.jpg", active: true },
  { id: 2, name: "Asha", subject: "Physics", department: "Sciences", photo_url: "a.jpg", active: true },
  { id: 3, name: "Cara", subject: "English", department: "Languages", photo_url: "c.jpg", active: false },
];

test("normalizeFaculty maps photo_url -> photo", () => {
  const p = normalizeFaculty(rows);
  assert.equal(p[0].photo, "b.jpg");
  assert.equal(p[0].id, 1);
});

test("departmentsOf is unique, first-seen order", () => {
  assert.deepEqual(departmentsOf(normalizeFaculty(rows)), ["Languages", "Sciences"]);
});

test("filterSortGroup drops inactive and groups by department", () => {
  const groups = filterSortGroup(normalizeFaculty(rows), { query: "", department: "", sort: "default" });
  assert.deepEqual(groups.map((g) => g.name), ["Languages", "Sciences"]);
  assert.deepEqual(groups[0].people.map((p) => p.name), ["Bina"]); // Cara inactive
});

test("query filters by name (case-insensitive)", () => {
  const groups = filterSortGroup(normalizeFaculty(rows), { query: "as", department: "", sort: "default" });
  assert.deepEqual(groups.flatMap((g) => g.people).map((p) => p.name), ["Asha"]);
});

test("department filter narrows to one group", () => {
  const groups = filterSortGroup(normalizeFaculty(rows), { query: "", department: "Sciences", sort: "default" });
  assert.deepEqual(groups.map((g) => g.name), ["Sciences"]);
});

test("name-asc sorts within groups", () => {
  const many = normalizeFaculty([
    { id: 1, name: "Zed", department: "X", active: true },
    { id: 2, name: "Ann", department: "X", active: true },
  ]);
  const groups = filterSortGroup(many, { query: "", department: "", sort: "name-asc" });
  assert.deepEqual(groups[0].people.map((p) => p.name), ["Ann", "Zed"]);
});

test("name sort reorders within groups but keeps department order stable", () => {
  const people = normalizeFaculty([
    { id: 1, name: "Zed", department: "Languages", active: true },
    { id: 2, name: "Bea", department: "Sciences", active: true },
    { id: 3, name: "Ann", department: "Languages", active: true },
  ]);
  const groups = filterSortGroup(people, { query: "", department: "", sort: "name-asc" });
  assert.deepEqual(groups.map((g) => g.name), ["Languages", "Sciences"]); // group order unchanged
  assert.deepEqual(groups[0].people.map((p) => p.name), ["Ann", "Zed"]);  // sorted within group
});
