import User from "../models/user.js";
import Material from "../models/Material.js";


export const addMaterial = async (req, res) => {
  try {
    console.log("🟢 addMaterial called");
    console.log("Body:", req.body);
    console.log("File:", req.file);

    const teacherId = req.body.teacherId;
    console.log("Teacher ID:", teacherId);

    const teacher = await User.findByPk(teacherId);
    if (!teacher) {
      console.log("❌ Teacher not found");
      return res.status(404).json({ success: false, message: "Teacher not found" });
    }

    const { title, type, description, className, status } = req.body;
    const filePath = req.file ? `/uploads/${req.file.filename}` : null;

    const material = await Material.create({
      title,
      type,
      description,
      className,
      status,
      fileUrl: filePath,
      teacherId,
    });

    console.log("✅ Material created:", material);
    res.json({ success: true, material });
  } catch (err) {
    console.error("❌ Error adding material:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// ================== Get all materials ==================
export const getMaterials = async (req, res) => {
  try {
    const materials = await Material.findAll({
      include: [
        {
          model: User, // or Teacher
          as: "teacher",
          attributes: ["id", "firstname", "lastname", "email"],
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    res.json({ success: true, materials });
  } catch (err) {
    console.error("❌ Error fetching materials:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};
// ================== Delete material ==================
export const deleteMaterial = async (req, res) => {
  try {
    const { id } = req.params;

    const material = await Material.findByPk(id);
    if (!material) {
      return res.status(404).json({ success: false, message: "Material not found" });
    }

    await material.destroy();
    res.json({ success: true, message: "Material deleted successfully" });
  } catch (err) {
    console.error("❌ Error deleting material:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};