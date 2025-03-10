const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Verification = sequelize.define(
  "Verification",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    drugId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: "drugs", key: "id" },
    },
    pharmacistId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: "pharmacists", key: "id" },
    },
    status: {
      type: DataTypes.ENUM("pending", "verified", "rejected"),
      allowNull: false,
      defaultValue: "pending",
    },
  },
  {
    tableName: "verifications",
    timestamps: false, // ✅ Explicitly disable timestamps
  }
);

module.exports = Verification;
