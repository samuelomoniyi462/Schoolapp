import express from "express";
import multer from "multer";
import { addMaterial, getMaterials, deleteMaterial } from "../controllers/materialController.js";

const router = express.Router();

// Multer config (same as before)
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now().toString(36) + "-" + file.originalname),
});
const upload = multer({ storage });

// Routes
router.post("/add", upload.single("file"), addMaterial);
router.get("/all", getMaterials);
router.delete("/:id", deleteMaterial); // ✅ DELETE

export default router;
