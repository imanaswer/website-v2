import { withErrors } from "../_lib/response.js";
import { resource } from "../_lib/crud.js";
import { management } from "../_lib/schemas.js";

export default withErrors(resource(management));
