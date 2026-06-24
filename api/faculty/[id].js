import { withErrors } from "../_lib/response.js";
import { item } from "../_lib/crud.js";
import { faculty } from "../_lib/schemas.js";

export default withErrors(item(faculty));
