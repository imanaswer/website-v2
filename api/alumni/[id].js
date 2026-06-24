import { withErrors } from "../_lib/response.js";
import { item } from "../_lib/crud.js";
import { alumni } from "../_lib/schemas.js";

export default withErrors(item(alumni));
