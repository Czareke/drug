const bcrypt = require("bcryptjs");

bcrypt.hash("password", 10).then((hash) => {
  console.log("🔑 New Hashed Password:", hash);
});
