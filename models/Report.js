const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema({
  id: {
    type: String,
    default: () => new mongoose.Types.ObjectId(),
    unique: true,
  },
  drug_id: {
    type: String,
    required: true,
    ref: "Drug",
  },
  pharmacist_id: {
    type: String,
    required: true,
    ref: "Pharmacist",
  },
  admin_id: {
    type: String,
    ref: "Admin",
  },
  report_text: {
    type: String,
    required: true,
  },
  reason: {
    type: String,
    default: "No reason provided",
  },
}, {
  collection: "reports",
  timestamps: false,
});

const Report = mongoose.model("Report", reportSchema);

module.exports = Report;
