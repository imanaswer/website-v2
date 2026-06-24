import { sql } from "../_lib/db.js";
import { requireAdmin } from "../_lib/auth.js";
import { withErrors, sendData, Err } from "../_lib/response.js";
import { str, bool, date, intId } from "../_lib/validation.js";

export default withErrors(async (req, res) => {
  const id = intId(req.query.id);

  if (req.method === "GET") {
    const [row] = await sql`select * from news where id = ${id}`;
    if (!row) throw Err.notFound("That news item");
    return sendData(res, row);
  }

  if (req.method === "PUT") {
    await requireAdmin(req);
    const title = str(req.body, "title", { required: true, max: 300, label: "a title" });
    const category = str(req.body, "category", { max: 80 });
    const body = str(req.body, "body", { max: 20000 });
    const day = date(req.body, "date");
    const image_url = str(req.body, "image_url", { max: 1000 });
    const published = bool(req.body, "published");

    const [row] = await sql`
      update news set
        title = ${title}, category = ${category}, body = ${body},
        date = ${day}, image_url = ${image_url}, published = ${published}
      where id = ${id} returning *`;
    if (!row) throw Err.notFound("That news item");
    return sendData(res, row);
  }

  if (req.method === "DELETE") {
    await requireAdmin(req);
    const [row] = await sql`delete from news where id = ${id} returning id`;
    if (!row) throw Err.notFound("That news item");
    return sendData(res, { ok: true });
  }

  throw Err.badMethod();
});
