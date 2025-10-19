import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// ================== Authentication ==================
export const login = async (req, res) => {
  const { userID, password } = req.body;

  try {
    const user = await User.findOne({ where: { userID } });
    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ success: false, error: "Invalid password" });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role, userID: user.userID },
      "SECRET_KEY",
      { expiresIn: "1d" }
    );

    return res.status(200).json({
      success: true,
      token,
      user: {
        id: user.id,
        userID: user.userID,
        email: user.email,
        role: user.role,
        firstname: user.firstname,
        lastname: user.lastname,
      },
    });
  } catch (error) {
    console.error("login error:", error);
    return res.status(500).json({ success: false, error: "Server Error" });
  }
};

// ================== Student Management ==================
export const addStudent = async (req, res) => {
  console.log("Data from front end", req.body);
  const { userID, lastname, firstname, othername, grade, email } = req.body;

  try {
    const existing = await User.findOne({ where: { userID } });
    if (existing) {
      return res.status(400).json({ success: false, error: "UserID already exists" });
    }

    const hashedPassword = await bcrypt.hash("123456", 10);

    const newStudent = await User.create({
      userID,
      lastname,
      firstname,
      othername,
      grade,
      email,
      role: "student",
      password: hashedPassword
    });

    return res.status(201).json({
      success: true,
      message: "Student added successfully",
      student: newStudent,
    });
  } catch (error) {
    console.error("addStudent error:", error);
    return res.status(500).json({ success: false, error: "Server Error" });
  }
};

export const getStudents = async (req, res) => {
  try {
    const students = await User.findAll({ where: { role: "student" } });
    return res.status(200).json({ success: true, students });
  } catch (error) {
    console.error("getStudents error:", error);
    return res.status(500).json({ success: false, error: error.message });
  }
};

export const updateStudent = async (req, res) => {
  const { id } = req.params;
  const { firstname, lastname, othername, grade, email } = req.body;

  try {
    const student = await User.findOne({ where: { id, role: "student" } });
    if (!student) {
      return res.status(404).json({ success: false, error: "Student not found" });
    }

    await student.update({ firstname, lastname, othername, grade, email });

    return res.status(200).json({ success: true, student });
  } catch (error) {
    console.error("updateStudent error:", error);
    return res.status(500).json({ success: false, error: "Server Error" });
  }
};

export const deleteStudent = async (req, res) => {
  const { id } = req.params;

  try {
    const student = await User.findOne({ where: { id, role: "student" } });
    if (!student) {
      return res.status(404).json({ success: false, error: "Student not found" });
    }

    await student.destroy();
    return res.status(200).json({ success: true, message: "Student deleted successfully" });
  } catch (error) {
    console.error("deleteStudent error:", error);
    return res.status(500).json({ success: false, error: "Server Error" });
  }
};