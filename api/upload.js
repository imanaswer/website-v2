import { handleUpload } from "@vercel/blob/client";
import { requireAdmin } from "./_lib/auth.js";
import { withErrors, ApiError } from "./_lib/errors.js";

/*
 * Image upload to Vercel Blob using the client-upload flow: the browser calls
 * @vercel/blob/client `upload()` which negotiates a short-lived token with this
 * endpoint. We restrict to images and 5 MB, and require an authenticated admin.
 */
export default withErrors(async (req, res) => {
  try {
    const json = await handleUpload({
      request: req,
      body: req.body,
      onBeforeGenerateToken: async () => {
        await requireAdmin(req);
        return {
          allowedContentTypes: ["image/jpeg", "image/png", "image/webp"],
          maximumSizeInBytes: 5 * 1024 * 1024,
          addRandomSuffix: true,
        };
      },
      onUploadCompleted: async () => {},
    });
    return res.status(200).json(json);
  } catch (e) {
    // Translate the most common upload failures into plain language.
    const msg = String(e?.message || e);
    if (/maximumSizeInBytes|too large|size/i.test(msg)) {
      throw new ApiError(413, "file_too_large", "That photo is too large — please use one under 5 MB.");
    }
    if (/allowedContentTypes|content type|not allowed/i.test(msg)) {
      throw new ApiError(415, "bad_file_type", "That file isn't a supported image. Please upload a JPG, PNG or WebP.");
    }
    if (/BLOB_READ_WRITE_TOKEN|token/i.test(msg)) {
      throw new ApiError(500, "upload_not_configured", "Image uploads aren't set up yet. Please add the Vercel Blob token.");
    }
    throw e;
  }
});
