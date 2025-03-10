const express = require("express");
const adminController = require("../controllers/adminController");

const router = express.Router();

router.post("/", adminController.createAdmin);
router.get("/", adminController.getAllAdmins);
router.get("/:id", adminController.getAdminById);
router.delete("/:id", adminController.deleteAdmin);

module.exports = router; // ✅ Ensure router is exported
