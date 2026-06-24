import { getSession } from "../_lib/auth.js";
import { withErrors } from "../_lib/errors.js";

export default withErrors(async (req, res) => {
  const session = await getSession(req);
  res.status(200).json({
    authenticated: !!session,
    user: session ? { username: session.sub } : null,
  });
});
