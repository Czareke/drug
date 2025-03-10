const express = require("express");
const router = express.Router();
const verificationController = require("../controllers/verificationController");

// ✅ Ensure the functions are correctly assigned
router.post("/verify", verificationController.verifyDrug);
router.get("/", verificationController.getAllVerifications);
router.get("/:id", verificationController.getVerificationById);

module.exports = router;
