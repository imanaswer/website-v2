/* Pure transforms for the faculty listing: normalize DB rows, derive the
 * department filter options, and produce department-grouped results after
 * search/filter/sort. No React, no DOM — unit-tested. */

export function normalizeFaculty(rows) {
  return (Array.isArray(rows) ? rows : []).map((r) => ({
    id: r.id,
    name: r.name,
    subject: r.subject || "",
    department: r.department || "Faculty",
    photo: r.photo_url || "",
    active: r.active !== false,
  }));
}

export function departmentsOf(people) {
  const seen = [];
  for (const p of people) if (!seen.includes(p.department)) seen.push(p.department);
  return seen;
}

export function filterSortGroup(people, { query = "", department = "", sort = "default" } = {}) {
  const q = query.trim().toLowerCase();
  let list = people.filter((p) => p.active);
  if (q) list = list.filter((p) => p.name.toLowerCase().includes(q));
  if (department) list = list.filter((p) => p.department === department);
  if (sort === "name-asc") list = [...list].sort((a, b) => a.name.localeCompare(b.name));
  else if (sort === "name-desc") list = [...list].sort((a, b) => b.name.localeCompare(a.name));

  const order = [];
  const map = new Map();
  for (const p of list) {
    if (!map.has(p.department)) { map.set(p.department, []); order.push(p.department); }
    map.get(p.department).push(p);
  }
  return order.map((name) => ({ name, people: map.get(name) }));
}
