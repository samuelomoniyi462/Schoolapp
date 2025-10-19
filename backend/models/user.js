import { Sequelize, DataTypes } from "sequelize";
import sequelizeConnection from "../database/dbconnection.js";

// ✅ User model
const User = sequelizeConnection.define("user", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  userID: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  lastname: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  firstname: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  othername: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: { isEmail: true },
  },
  role: {
    type: DataTypes.ENUM("admin", "student", "teacher"),
    allowNull: false,
    defaultValue: "student",
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: "123456",
  },
  grade: {
    type: Sequelize.STRING,
    allowNull: true,
  },
});

// ✅ Join table (for many-to-many)
const TeacherStudent = sequelizeConnection.define("TeacherStudent", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  teacherId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  studentId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

// ✅ Associations
User.belongsToMany(User, {
  as: "students",
  through: TeacherStudent,
  foreignKey: "teacherId",
  otherKey: "studentId",
});

User.belongsToMany(User, {
  as: "teachers",
  through: TeacherStudent,
  foreignKey: "studentId",
  otherKey: "teacherId",
});

// ✅ Export both
export { User, TeacherStudent };
export default User;
