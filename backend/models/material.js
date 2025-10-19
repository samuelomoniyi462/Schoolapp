// backend/models/Material.js
import { DataTypes } from "sequelize";
import sequelize from "../database/dbconnection.js";
import User from "./user.js";    

const Material = sequelize.define("Material", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
  className: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM("Draft", "Published"),
    defaultValue: "Draft",
  },
  fileUrl: {
    type: DataTypes.STRING, // will store file path
  },
});

// associations
Material.belongsTo(User, { foreignKey: "teacherId", as: "teacher" });


export default Material;
