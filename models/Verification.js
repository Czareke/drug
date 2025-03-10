const mongoose = require("mongoose");

const verificationSchema = new mongoose.Schema({
  id: {
    type: String,
    default: () => new mongoose.Types.ObjectId(),
    unique: true,
  },
  drugId: {
    type: String,
    required: true,
    ref: "Drug",
  },
  pharmacistId: {
    type: String,
    required: true,
    ref: "Pharmacist",
  },
  status: {
    type: String,
    enum: ["pending", "verified", "rejected"],
    default: "pending",
  },
}, {
  collection: "verifications",
  timestamps: false,
});

const Verification = mongoose.model("Verification", verificationSchema);

module.exports = Verification;
