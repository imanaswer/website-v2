import { sql } from "../_lib/db.js";
import { requireAdmin } from "../_lib/auth.js";
import { withErrors, sendData, Err } from "../_lib/response.js";
import { str, bool, date } from "../_lib/validation.js";

export default withErrors(async (req, res) => {
  if (req.method === "GET") {
    // ?all=1 returns drafts too, but only for an authenticated admin.
    if (req.query.all === "1") {
      await requireAdmin(req);
      const rows = await sql`select * from news order by date desc, id desc`;
      return sendData(res, rows);
    }
    const rows = await sql`select * from news where published = true order by date desc, id desc`;
    return sendData(res, rows);
  }

  if (req.method === "POST") {
    await requireAdmin(req);
    const title = str(req.body, "title", { required: true, max: 300, label: "a title" });
    const category = str(req.body, "category", { max: 80 });
    const body = str(req.body, "body", { max: 20000 });
    const day = date(req.body, "date", { fallbackToday: true });
    const image_url = str(req.body, "image_url", { max: 1000 });
    const published = bool(req.body, "published");

    const [row] = await sql`
      insert into news (title, category, body, date, image_url, published)
      values (${title}, ${category}, ${body}, ${day}, ${image_url}, ${published})
      returning *`;
    return sendData(res, row, 201);
  }

  throw Err.badMethod();
});
