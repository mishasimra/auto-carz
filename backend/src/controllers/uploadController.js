import asyncHandler from "express-async-handler";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { cloudinary, hasCloudinaryConfig } from "../config/cloudinary.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const uploadImage = asyncHandler(async (req, res) => {
  if (!req.file) {
    const error = new Error("Image file is required");
    error.statusCode = 400;
    throw error;
  }

  if (hasCloudinaryConfig) {
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "car-technic"
    });

    fs.unlinkSync(req.file.path);
    return res.status(201).json({ success: true, data: { url: result.secure_url } });
  }

  const relativeUrl = `/uploads/${path.basename(req.file.path)}`;
  const localPath = path.join(__dirname, "../../", relativeUrl);

  if (!fs.existsSync(path.dirname(localPath))) {
    fs.mkdirSync(path.dirname(localPath), { recursive: true });
  }

  res.status(201).json({ success: true, data: { url: relativeUrl } });
});
