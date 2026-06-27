import { sql } from "./db.js";
import { requireAdmin } from "./auth.js";
import { sendData, Err } from "./response.js";
import { intId } from "./validation.js";

/*
 * Reusable REST CRUD for a Postgres table, driven by a resource config:
 *   { table, order, publicFilter?, parse(body) -> {col: value} }
 * - collection(config) → GET (list) + POST (create, admin)
 * - item(config)       → GET (one) + PUT (update, admin) + DELETE (admin)
 *
 * Public GETs hide unpublished rows when `publicFilter` (a boolean column) is
 * set; `?all=1` returns everything but requires an admin session.
 * postgres.js handles dynamic identifiers/columns safely.
 */
export function collection(config) {
  const order = sql.unsafe(config.order || "id desc");
  return async (req, res) => {
    if (req.method === "GET") {
      if (req.query.all === "1") {
        await requireAdmin(req);
        const rows = await sql`select * from ${sql(config.table)} order by ${order}`;
        return sendData(res, rows);
      }
      const rows = config.publicFilter
        ? await sql`select * from ${sql(config.table)} where ${sql(config.publicFilter)} = true order by ${order}`
        : await sql`select * from ${sql(config.table)} order by ${order}`;
      return sendData(res, rows);
    }

    if (req.method === "POST") {
      await requireAdmin(req);
      const data = config.parse(req.body || {});
      const [row] = await sql`insert into ${sql(config.table)} ${sql(data)} returning *`;
      return sendData(res, row, 201);
    }

    throw Err.badMethod();
  };
}

/*
 * One handler per resource (`index.js`): dispatches to `collection` for
 * `/resource` and to `item` for `/resource/:id`. The `:id` arrives as the
 * `id` query param — directly in dev, and via a vercel.json rewrite in
 * production. Normalised to a scalar in case a routing layer passes an array.
 */
export function resource(config) {
  const list = collection(config);
  const one = item(config);
  return (req, res) => {
    const raw = req.query.id;
    const id = Array.isArray(raw) ? raw[0] : raw;
    if (id === undefined || id === null || id === "") return list(req, res);
    req.query.id = id;
    return one(req, res);
  };
}

export function item(config) {
  return async (req, res) => {
    const id = intId(req.query.id);

    if (req.method === "GET") {
      const [row] = await sql`select * from ${sql(config.table)} where id = ${id}`;
      if (!row) throw Err.notFound();
      return sendData(res, row);
    }

    if (req.method === "PUT") {
      await requireAdmin(req);
      const data = config.parse(req.body || {});
      const [row] = await sql`update ${sql(config.table)} set ${sql(data)} where id = ${id} returning *`;
      if (!row) throw Err.notFound();
      return sendData(res, row);
    }

    if (req.method === "DELETE") {
      await requireAdmin(req);
      const [row] = await sql`delete from ${sql(config.table)} where id = ${id} returning id`;
      if (!row) throw Err.notFound();
      return sendData(res, { ok: true });
    }

    throw Err.badMethod();
  };
}
