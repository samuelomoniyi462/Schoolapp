// backend/controllers/teacherController.js
import User from "../models/user.js";
import Material from "../models/Material.js";
import bcrypt from "bcrypt";

// ================== Teacher Management ==================
export const addTeacher = async (req, res) => {
  const { userID, lastname, firstname, othername, grade, email } = req.body;

  try {
    const existing = await User.findOne({ where: { userID } });
    if (existing) {
      return res.status(400).json({ success: false, error: "UserID already exists" });
    }

    const hashedPassword = await bcrypt.hash("123456", 10);

    const newTeacher = await User.create({
      userID,
      lastname,
      firstname,
      othername,
      grade,
      email,
      role: "teacher",
      password: hashedPassword
    });

    return res.status(201).json({
      success: true,
      message: "Teacher added successfully",
      teacher: newTeacher,
    });
  } catch (error) {
    console.error("addTeacher error:", error);
    return res.status(500).json({ success: false, error: "Server Error" });
  }
};

export const getTeachers = async (req, res) => {
  try {
    const teachers = await User.findAll({ where: { role: "teacher" } });
    return res.status(200).json({ success: true, teachers });
  } catch (error) {
    console.error("getTeachers error:", error);
    return res.status(500).json({ success: false, error: "Server Error" });
  }
};

export const updateTeacher = async (req, res) => {
  const { id } = req.params;
  const { firstname, lastname, othername, grade, email } = req.body;

  try {
    const teacher = await User.findOne({ where: { id, role: "teacher" } });
    if (!teacher) {
      return res.status(404).json({ success: false, error: "Teacher not found" });
    }

    await teacher.update({ firstname, lastname, othername, grade, email });

    return res.status(200).json({ success: true, teacher });
  } catch (error) {
    console.error("updateTeacher error:", error);
    return res.status(500).json({ success: false, error: "Server Error" });
  }
};

export const deleteTeacher = async (req, res) => {
  const { id } = req.params;

  try {
    const teacher = await User.findOne({ where: { id, role: "teacher" } });
    if (!teacher) {
      return res.status(404).json({ success: false, error: "Teacher not found" });
    }

    await teacher.destroy();
    return res.status(200).json({ success: true, message: "Teacher deleted successfully" });
  } catch (error) {
    console.error("deleteTeacher error:", error);
    return res.status(500).json({ success: false, error: "Server Error" });
  }
};

// ================== Add Material ==================
export const addMaterial = async (req, res) => {
  const { id } = req.params; // teacher id
  const { title, type, description, className, status } = req.body;
  const fileUrl = req.file ? `/uploads/${req.file.filename}` : null;

  try {
    // Check if teacher exists
    const teacher = await User.findOne({ where: { id, role: "teacher" } });
    if (!teacher) {
      return res.status(404).json({ success: false, error: "Teacher not found" });
    }

    // Create material
    const material = await Material.create({
      teacherId: id,
      title,
      type,
      description,
      className,
      status,
      fileUrl,
    });

    return res.status(201).json({
      success: true,
      message: "Material added successfully",
      material,
    });
  } catch (error) {
    console.error("addMaterial error:", error);
    return res.status(500).json({ success: false, error: "Server Error" });
  }
};
