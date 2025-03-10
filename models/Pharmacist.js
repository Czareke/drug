const mongoose = require("mongoose");

const pharmacistSchema = new mongoose.Schema({
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
  admin_id: {
    type: String,
    required: true,
    ref: "Admin",
  },
}, {
  collection: "pharmacists",
  timestamps: false,
});

const Pharmacist = mongoose.model("Pharmacist", pharmacistSchema);

module.exports = Pharmacist;
