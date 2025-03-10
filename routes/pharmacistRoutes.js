const express = require("express");
const pharmacistController = require("../controllers/pharmacistController"); // ✅ Ensure this file exists

const router = express.Router();

router.get("/", pharmacistController.getAllPharmacists);
router.get("/:id", pharmacistController.getPharmacistById);
router.post("/register", pharmacistController.createPharmacist);
router.delete("/:id", pharmacistController.deletePharmacist);

module.exports = router;
