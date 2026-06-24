import bcrypt from "bcryptjs";
import { signSession, sessionCookie } from "../_lib/auth.js";
import { withErrors, ApiError, Err } from "../_lib/errors.js";

export default withErrors(async (req, res) => {
  if (req.method !== "POST") throw Err.badMethod();

  const { username, password } = req.body || {};
  if (!username || !password) {
    throw new ApiError(400, "missing_fields", "Please enter both your username and password.");
  }

  const adminUser = process.env.ADMIN_USERNAME;
  const adminHash = process.env.ADMIN_PASSWORD_HASH;
  if (!adminUser || !adminHash) throw Err.notConfigured("The admin login");

  const ok = username === adminUser && (await bcrypt.compare(password, adminHash));
  if (!ok) throw Err.badCredentials();

  const token = await signSession(username);
  res.setHeader("Set-Cookie", sessionCookie(token));
  res.status(200).json({ ok: true, user: { username } });
});
