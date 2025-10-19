// controllers/adminController.js
import  User  from "../models/user.js";


// ✅ Link students to a teacher
export const linkStudents = async (req, res) => {
  try {
    const { teacherId, studentIds } = req.body;
    console.log("🔗 Linking students:", { teacherId, studentIds }); // Debug log

    if (!teacherId || !studentIds || studentIds.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Teacher ID and student IDs are required",
      });
    }

    // Find teacher by numeric ID
    let teacher = await User.findOne({ 
      where: { id: teacherId, role: "teacher" } 
    });
    
    // If not found, try by userID
    if (!teacher) {
      teacher = await User.findOne({ 
        where: { userID: teacherId.toString(), role: "teacher" } 
      });
    }

    if (!teacher) {
      return res.status(404).json({ 
        success: false, 
        message: "Teacher not found or not valid" 
      });
    }

    // Find students by numeric IDs
    const students = await User.findAll({ 
      where: { id: studentIds } 
    });

    if (students.length === 0) {
      return res.status(404).json({ 
        success: false, 
        message: "No valid students found" 
      });
    }

    await teacher.addStudents(students);

    res.status(201).json({ 
      success: true, 
      message: "Students linked successfully" 
    });
  } catch (error) {
    console.error("Error in linkStudents:", error);
    res.status(500).json({ 
      success: false, 
      message: "Server error: " + error.message 
    });
  }
};

// controllers/adminController.js - UPDATED VERSION
export const getLinkedStudents = async (req, res) => {
  try {
    const { teacherId } = req.params;
    console.log("🔍 getLinkedStudents: Looking for teacher with ID:", teacherId);

    // First try to find by numeric ID (primary key)
    let teacher = await User.findOne({
      where: { id: teacherId, role: "teacher" },
      include: [
        {
          model: User,
          as: "students",
          through: { attributes: [] },
          attributes: ["id", "userID", "firstname", "lastname", "email", "grade"],
        },
      ],
    });

    console.log("🔍 getLinkedStudents: Teacher found by id:", teacher ? "Yes" : "No");

    // If not found by numeric ID, try by userID
    if (!teacher) {
      console.log("🔄 getLinkedStudents: Trying to find by userID...");
      teacher = await User.findOne({
        where: { userID: teacherId, role: "teacher" },
        include: [
          {
            model: User,
            as: "students",
            through: { attributes: [] },
            attributes: ["id", "userID", "firstname", "lastname", "email", "grade"],
          },
        ],
      });
      console.log("🔍 getLinkedStudents: Teacher found by userID:", teacher ? "Yes" : "No");
    }

    if (!teacher) {
      console.log("❌ getLinkedStudents: Teacher not found with ID:", teacherId);
      return res.status(404).json({ 
        success: false, 
        message: "Teacher not found" 
      });
    }

    console.log("✅ getLinkedStudents: Found teacher:", teacher.userID);
    console.log("✅ getLinkedStudents: Number of students:", teacher.students?.length);

    res.json({ 
      success: true, 
      students: teacher.students || [] 
    });
  } catch (error) {
    console.error("❌ getLinkedStudents: Error:", error);
    res.status(500).json({ 
      success: false, 
      message: "Server error: " + error.message 
    });
  }
};