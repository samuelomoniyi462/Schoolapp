import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import sequelizeConnection from "./database/dbconnection.js";

import "./models/user.js";

// ✅ Import routes
import studentRoutes from "./routes/studentRoutes.js";
import teacherRoutes from "./routes/teacherRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import materialRoutes from "./routes/materialRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/student", studentRoutes);
app.use("/teacher", teacherRoutes);
app.use("/auth", authRoutes);
app.use("/material", materialRoutes);
app.use("/uploads", express.static("uploads"));
app.use("/admin", adminRoutes);

// Database sync
sequelizeConnection
  .sync()
  .then(() => {
    console.log("✅ Database connected & synced");
  })
  .catch((err) => {
    console.error("❌ Unable to connect to database", err);
  });

// Favicon fix
app.get("/favicon.ico", (req, res) => res.status(204).end());

// Start server
app.listen(5100, () => {
  console.log("🚀 Server running on http://localhost:5100");
});
