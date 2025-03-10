const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.post("/register/user", authController.registerUser);
router.post("/register/admin", authController.registerAdmin);
router.post("/login", authController.login);
router.post("/forgotPassword", authController.forgotPassword)
router.post("/resetPassword", authController.resetPassword)
module.exports = router;
