// routes/adminRoutes.js
import express from "express";
import path from "path";
import { linkStudents, getLinkedStudents } from "../controllers/adminController.js";

const adminRoutes = express.Router();

// ✅ POST /admin/linkStudents
adminRoutes.post("/linkStudents", linkStudents);

// ✅ GET /admin/linkedStudents/:teacherId
adminRoutes.get("/linkedStudents/:teacherId", getLinkedStudents);

export default adminRoutes;
