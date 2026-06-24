import { requireAdmin } from "../_lib/auth.js";
import { withErrors, sendData, ApiError, Err } from "../_lib/response.js";
import { uploadAsset } from "../_lib/storage.js";

/*
 * POST /api/uploads  (admin only)
 * Body: { filename, contentType, dataBase64, folder? }
 * Uploads the asset to Supabase Storage server-side and returns its public URL.
 * The frontend never touches Supabase directly or sees any privileged key.
 */
export default withErrors(async (req, res) => {
  if (req.method !== "POST") throw Err.badMethod();
  await requireAdmin(req);

  const { filename, contentType, dataBase64, folder } = req.body || {};
  if (!contentType || !dataBase64) {
    throw new ApiError(400, "missing_file", "No file was received. Please choose a file and try again.");
  }

  const result = await uploadAsset({ folder: folder || "uploads", filename, contentType, base64: dataBase64 });
  sendData(res, result, 201);
});
