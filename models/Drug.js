const mongoose = require("mongoose");

const drugSchema = new mongoose.Schema({
  id: {
    type: String,
    default: () => new mongoose.Types.ObjectId(),
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  manufacturer: {
    type: String,
    required: true,
  },
  serial_number: {
    type: String,
    unique: true,
    required: true,
  },
  manufacturing_date: {
    type: Date,
    required: true,
  },
  expiry_date: {
    type: Date,
    required: true,
  },
  added_by: {
    type: String,
    required: true,
    ref: "Admin",
  },
}, {
  collection: "drugs",
  timestamps: false,
});

const Drug = mongoose.model("Drug", drugSchema);

module.exports = Drug;
