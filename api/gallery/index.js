import { withErrors } from "../_lib/response.js";
import { collection } from "../_lib/crud.js";
import { gallery } from "../_lib/schemas.js";

export default withErrors(collection(gallery));
