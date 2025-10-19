import express from "express";
import { 
  login, 
  addStudent, 
  getStudents, 
  updateStudent, 
  deleteStudent 
} from "../controllers/studentController.js";

const router = express.Router();

// Authentication
router.post("/login", login);

// Student routes
router.post("/addStudents", addStudent);
router.get("/getStudents", getStudents);
router.put("/updateStudents/:id", updateStudent);
router.delete("/deleteStudents/:id", deleteStudent);

export default router;