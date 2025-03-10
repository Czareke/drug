const mongoose = require("mongoose");

// Import models
const User = require("./User");
const Admin = require("./Admin");
const Pharmacist = require("./Pharmacist");
const Drug = require("./Drug");
const Report = require("./Report");
const Verification = require("./Verification");

// Define relationships
// Mongoose handles relationships differently than Sequelize. 
// You can use `populate` to fetch related documents.

// Connect to MongoDB
const connectDatabase = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/drug-app", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ Database connected successfully!");
  } catch (error) {
    console.error("❌ Error connecting to database:", error);
  }
};

// Export models and connect function
module.exports = {
  connectDatabase,
  Admin,
  Pharmacist,
  Drug,
  Report,
  User,
  Verification,
};
