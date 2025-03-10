const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Drug = require("./Drug");
const Pharmacist = require("./Pharmacist");
const Admin = require("./Admin");

class Report extends Model {}

Report.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    drug_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    pharmacist_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    admin_id: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    report_text: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    reason: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: "No reason provided",
    },
  },
  {
    sequelize,
    modelName: "Report",
    tableName: "reports",
    timestamps: false,
  }
);

// ✅ Define Associations (Make sure the aliases match in the `include` queries)
Report.belongsTo(Drug, { foreignKey: "drug_id", as: "drug" });
Report.belongsTo(Pharmacist, { foreignKey: "pharmacist_id", as: "pharmacist" });
Report.belongsTo(Admin, { foreignKey: "admin_id", as: "admin" });

module.exports = Report;
