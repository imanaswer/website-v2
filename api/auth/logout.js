import { clearCookie } from "../_lib/auth.js";
import { withErrors, Err } from "../_lib/errors.js";

export default withErrors(async (req, res) => {
  if (req.method !== "POST") throw Err.badMethod();
  res.setHeader("Set-Cookie", clearCookie());
  res.status(200).json({ ok: true });
});
