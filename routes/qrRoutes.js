const express = require("express");
const qrController = require("../controllers/qrController");

const router = express.Router();

// ✅ Generate QR Code
router.get("/generate/:drugId", qrController.generateQRCode);

// ✅ Scan QR Code (Image Upload)
router.post("/scan", qrController.uploadQRCode, qrController.scanQRCode);

module.exports = router;
