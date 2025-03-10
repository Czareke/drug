const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  id: {
    type: String,
    default: () => new mongoose.Types.ObjectId(),
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
}, {
  collection: "admins",
  timestamps: false,
});

const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;
