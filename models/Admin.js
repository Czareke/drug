const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/database");

class Admin extends Model {}

Admin.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Admin",
    tableName: "admins",
    timestamps: false, // ✅ Match your database schema
  }
);

module.exports = Admin;
