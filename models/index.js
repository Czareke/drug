const { Sequelize } = require("sequelize");
const sequelize = require("../config/database");

// ✅ Import models
const User = require("./User"); 
const Admin = require("./Admin");
const Pharmacist = require("./Pharmacist");
const Drug = require("./Drug");
const Report = require("./Report");


// ✅ Define relationships AFTER all models are imported
Admin.hasMany(Pharmacist, { foreignKey: "admin_id", onDelete: "CASCADE" });
Pharmacist.belongsTo(Admin, { foreignKey: "admin_id" });

Admin.hasMany(Drug, { foreignKey: "added_by", onDelete: "CASCADE" });
Pharmacist.hasMany(Drug, { foreignKey: "added_by", onDelete: "CASCADE" });

Drug.belongsTo(Admin, { foreignKey: "added_by" });
Drug.belongsTo(Pharmacist, { foreignKey: "added_by" });

Report.belongsTo(Drug, { foreignKey: "drug_id" });  // 🚀 Ensure `Report` is defined before this line
Report.belongsTo(Pharmacist, { foreignKey: "pharmacist_id" });
Report.belongsTo(Admin, { foreignKey: "admin_id", allowNull: true });

// ✅ Sync function
const syncDatabase = async () => {
  try {
    await sequelize.sync({ force: false });  // ⚠️ Avoid `force: true` in production
    console.log("✅ Database & tables synced successfully!");
  } catch (error) {
    console.error("❌ Error syncing database:", error);
  }
};

// ✅ Export models
module.exports = {
  sequelize,
  Admin,
  Pharmacist,
  Drug,
  Report,
  User, 
  syncDatabase,
};
