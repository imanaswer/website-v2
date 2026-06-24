import { sql } from "../_lib/db.js";
import { requireAdmin } from "../_lib/auth.js";
import { withErrors, ApiError, Err } from "../_lib/errors.js";

export default withErrors(async (req, res) => {
  if (req.method === "GET") {
    // ?all=1 returns drafts too, but only for an authenticated admin.
    if (req.query.all === "1") {
      await requireAdmin(req);
      const rows = await sql`select * from news order by date desc, id desc`;
      return res.status(200).json(rows);
    }
    const rows = await sql`select * from news where published = true order by date desc, id desc`;
    return res.status(200).json(rows);
  }

  if (req.method === "POST") {
    await requireAdmin(req);
    const { title, category, body, date, image_url, published } = req.body || {};
    if (!title || !title.trim()) throw Err.missing("a title");
    const [row] = await sql`
      insert into news (title, category, body, date, image_url, published)
      values (${title.trim()}, ${category || null}, ${body || null},
              ${date || new Date().toISOString().slice(0, 10)}, ${image_url || null}, ${published ?? false})
      returning *`;
    return res.status(201).json(row);
  }

  throw Err.badMethod();
});
