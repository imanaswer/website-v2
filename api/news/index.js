import { withErrors } from "../_lib/response.js";
import { resource } from "../_lib/crud.js";
import { news } from "../_lib/schemas.js";

export default withErrors(resource(news));
