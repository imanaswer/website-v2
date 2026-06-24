import { withErrors } from "../_lib/response.js";
import { collection } from "../_lib/crud.js";
import { jobs } from "../_lib/schemas.js";

export default withErrors(collection(jobs));
