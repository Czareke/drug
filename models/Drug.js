const { DataTypes } = require("sequelize");
const sequelize = require("../config/database"); // Import the Sequelize instance

const Drug = sequelize.define(
  "Drug",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    manufacturer: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    serial_number: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    manufacturing_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    expiry_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    added_by: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  },
  {
    timestamps: false, // ✅ Fix: Disable createdAt & updatedAt
  }
);

module.exports = Drug;
