const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/database");

class Pharmacist extends Model {}

Pharmacist.init(
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
    admin_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "admins",
        key: "id",
      },
    },
  },
  {
    sequelize,
    modelName: "Pharmacist",
    tableName: "pharmacists",
    timestamps: false, // ✅ Match your database schema
  }
);

module.exports = Pharmacist;
