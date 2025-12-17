// src/middlewares/multerMiddleware.ts

import multer from "multer";
import path from "path";
import fs from "fs";

// Absolute path to uploads directory
const uploadDir = path.join(__dirname, "../../uploads");

// ✅ Create the uploads/ folder if it doesn't exist
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

export const multerMiddleware = upload.array("images", 5); // Accept up to 5 images
