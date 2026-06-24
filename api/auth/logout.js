import { clearCookie } from "../_lib/auth.js";
import { withErrors, sendData, Err } from "../_lib/response.js";

export default withErrors(async (req, res) => {
  if (req.method !== "POST") throw Err.badMethod();
  res.setHeader("Set-Cookie", clearCookie());
  sendData(res, { ok: true });
});
