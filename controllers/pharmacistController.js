const bcrypt = require("bcryptjs");
const { Pharmacist, Admin } = require("../models");

// 📌 Get All Pharmacists
exports.getAllPharmacists = async (req, res) => {
    try {
      const pharmacists = await Pharmacist.findAll();
      res.status(200).json(pharmacists);
    } catch (error) {
      console.error("❌ Error fetching pharmacists:", error);
      res.status(500).json({ message: "Server error", error });
    }
  };
  
// 📌 Get a Single Pharmacist by ID
exports.getPharmacistById = async (req, res) => {
    try {
      console.log("📌 Requested Pharmacist ID:", req.params.id); // Debugging

      const pharmacist = await Pharmacist.findByPk(req.params.id);
      if (!pharmacist) {
        return res.status(404).json({ message: "Pharmacist not found" });
      }
      res.status(200).json(pharmacist);
    } catch (error) {
      console.error("❌ Error fetching pharmacist:", error);
      res.status(500).json({ message: "Server error", error });
    }
  };

  
  

// 📌 Create a New Pharmacist
exports.createPharmacist = async (req, res) => {
  try {
    const { name, email, password, admin_id } = req.body;

    // Check if all fields are provided
    if (!name || !email || !password || !admin_id) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if the admin_id exists
    const admin = await Admin.findByPk(admin_id);
    if (!admin) {
      return res.status(400).json({ message: "Invalid admin_id. Admin does not exist." });
    }

    // Hash the password before storing
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the pharmacist
    const newPharmacist = await Pharmacist.create({ 
      name, 
      email, 
      password: hashedPassword, 
      admin_id 
    });

    res.status(201).json({ message: "Pharmacist created successfully", pharmacist: newPharmacist });
  } catch (error) {
    console.error("❌ Error creating pharmacist:", error);

    if (error.name === "SequelizeForeignKeyConstraintError") {
      return res.status(400).json({ message: "Invalid admin_id. Admin not found in database." });
    }

    res.status(500).json({ message: "Server error", error });
  }
};

// 📌 Delete a Pharmacist
exports.deletePharmacist = async (req, res) => {
  try {
    const pharmacist = await Pharmacist.findByPk(req.params.id);
    if (!pharmacist) return res.status(404).json({ message: "Pharmacist not found" });

    await pharmacist.destroy();
    res.status(200).json({ message: "Pharmacist deleted successfully" });
  } catch (error) {
    console.error("❌ Error deleting pharmacist:", error);
    res.status(500).json({ message: "Server error", error });
  }
};
