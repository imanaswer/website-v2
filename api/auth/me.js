import { getSession } from "../_lib/auth.js";
import { withErrors, sendData } from "../_lib/response.js";

export default withErrors(async (req, res) => {
  const session = await getSession(req);
  sendData(res, {
    authenticated: !!session,
    user: session ? { username: session.sub } : null,
  });
});
