const { syncDatabase } = require("./models");
const Verification = require("./models/Verification"); // Ensure path is correct

syncDatabase().then(() => process.exit());
