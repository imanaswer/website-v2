import { sql } from "../_lib/db.js";
import { requireAdmin } from "../_lib/auth.js";
import { withErrors, Err } from "../_lib/errors.js";

export default withErrors(async (req, res) => {
  const id = Number(req.query.id);
  if (!Number.isInteger(id)) throw Err.notFound("That news item");

  if (req.method === "GET") {
    const [row] = await sql`select * from news where id = ${id}`;
    if (!row) throw Err.notFound("That news item");
    return res.status(200).json(row);
  }

  if (req.method === "PUT") {
    await requireAdmin(req);
    const { title, category, body, date, image_url, published } = req.body || {};
    if (!title || !title.trim()) throw Err.missing("a title");
    const [row] = await sql`
      update news set
        title = ${title.trim()},
        category = ${category || null},
        body = ${body || null},
        date = ${date || null},
        image_url = ${image_url || null},
        published = ${published ?? false}
      where id = ${id} returning *`;
    if (!row) throw Err.notFound("That news item");
    return res.status(200).json(row);
  }

  if (req.method === "DELETE") {
    await requireAdmin(req);
    const [row] = await sql`delete from news where id = ${id} returning id`;
    if (!row) throw Err.notFound("That news item");
    return res.status(200).json({ ok: true });
  }

  throw Err.badMethod();
});
