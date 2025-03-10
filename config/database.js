const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("drug_verification", "root", "", {
  host: "localhost",
  port: 3306, // Make sure this matches the instance with your DB
  dialect: "mysql",
  logging: false,
});

module.exports = sequelize;
