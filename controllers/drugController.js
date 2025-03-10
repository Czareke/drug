const { Drug, Admin } = require("../models"); // ✅ Import Drug from models

// ✅ Create a new drug entry
exports.createDrug = async (req, res) => {
  try {
    const { name, serial_number, qr_code, manufacturer, manufacturing_date, expiry_date, added_by } = req.body;

    // ✅ Check if `added_by` exists in Admins table
    const adminExists = await Admin.findByPk(added_by);
    if (!adminExists) {
      return res.status(400).json({ message: "Invalid admin ID. The admin does not exist." });
    }

    // ✅ Insert new drug only if `added_by` is valid
    const drug = await Drug.create({
      name,
      serial_number,
      qr_code,
      manufacturer,
      manufacturing_date,
      expiry_date,
      added_by,
    });

    res.status(201).json({ message: "Drug added successfully", drug });
  } catch (error) {
    console.error("❌ Error creating drug:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
// ✅ Get all drugs
exports.getAllDrugs = async (req, res) => {
  try {
    const drugs = await Drug.findAll();
    res.status(200).json(drugs);
  } catch (error) {
    console.error("❌ Error fetching drugs:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Get a single drug by ID
exports.getDrugById = async (req, res) => {
  try {
    const drug = await Drug.findByPk(req.params.id);
    if (!drug) return res.status(404).json({ message: "Drug not found" });

    res.status(200).json(drug);
  } catch (error) {
    console.error("❌ Error fetching drug:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Update drug details (Prevent updating serial_number)
exports.updateDrug = async (req, res) => {
  try {
    const { name, manufacturer, expiry_date } = req.body;
    const drug = await Drug.findByPk(req.params.id);

    if (!drug) return res.status(404).json({ message: "Drug not found" });

    // ✅ Only update allowed fields
    await drug.update({ name, manufacturer, expiry_date });

    res.status(200).json({ message: "Drug updated successfully", drug });
  } catch (error) {
    console.error("❌ Error updating drug:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Delete a drug
exports.deleteDrug = async (req, res) => {
  try {
    const drug = await Drug.findByPk(req.params.id);
    if (!drug) return res.status(404).json({ message: "Drug not found" });

    await drug.destroy();
    res.status(200).json({ message: "Drug deleted successfully" });
  } catch (error) {
    console.error("❌ Error deleting drug:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
