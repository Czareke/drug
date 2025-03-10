const express = require("express");
const router = express.Router();
const drugController = require("../controllers/drugController"); // ✅ Ensure this exists

// Drug Routes
router.post("/", drugController.createDrug);
router.get("/", drugController.getAllDrugs);
router.get("/:id", drugController.getDrugById);
router.put("/:id", drugController.updateDrug);
router.delete("/:id", drugController.deleteDrug);

module.exports = router;
