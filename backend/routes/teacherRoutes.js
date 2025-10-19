// teacherRoutes.js
import express from "express";
import multer from "multer";
import { 
  addTeacher, 
  getTeachers, 
  updateTeacher, 
  deleteTeacher,
  addMaterial
} from "../controllers/teacherController.js";

const router = express.Router();

// ✅ Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

// Teacher routes - remove "/teachers" prefix since it's in the base path
router.post("/addTeacher", addTeacher);
router.get("/getTeachers", getTeachers);
router.put("updateTeacher/:id", updateTeacher);
router.delete("deleteTeacher/:id", deleteTeacher);

// ✅ Material route
router.post("/:id/materials", upload.single("file"), addMaterial);

export default router;