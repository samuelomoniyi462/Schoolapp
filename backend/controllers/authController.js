import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const login = async (req, res) => {
  const { userID, password } = req.body;
  console.log(req.body)

  try {
    // check user
    const user = await User.findOne({ where: { userID } });
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: "Invalid credentials" });
    }

    // sign token
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET || "secretkey",
      { expiresIn: "1h" }
    );

    res.json({ success: true, token, user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
