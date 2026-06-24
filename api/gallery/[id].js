import { withErrors } from "../_lib/response.js";
import { item } from "../_lib/crud.js";
import { gallery } from "../_lib/schemas.js";

export default withErrors(item(gallery));
