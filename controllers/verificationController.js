const Drug = require("../models/Drug");  
const Verification = require("../models/Verification");  

// 📌 Verify a Drug
exports.verifyDrug = async (req, res) => {
  try {
    const { serialNumber } = req.body;

    if (!serialNumber) {
      return res.status(400).json({ message: "Serial number is required" });
    }

    // Look up the drug by serial number
    const drug = await Drug.findOne({ where: { serial_number: serialNumber } });

    // If drug is not found, mark it as fake
    if (!drug) {
      return res.status(404).json({ 
        message: "Invalid serial number. Drug not found.", 
        status: "fake" 
      });
    }

    // Check if the drug is expired
    const currentDate = new Date();
    const expiryDate = new Date(drug.expiry_date);
    let status = "verified"; // Assume the drug is authentic

    if (expiryDate < currentDate) {
      status = "expired";
    }

    // Respond with the verification result without batch number
    res.status(200).json({
      status: status,
      product: {
        name: drug.name,
        manufacturer: drug.manufacturer,
        manufacturingDate: drug.manufacturing_date,
        expiryDate: drug.expiry_date,
        serialNumber: drug.serial_number
      }
    });
  } catch (error) {
    console.error("❌ Error verifying drug:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

// 📌 Get All Verifications
exports.getAllVerifications = async (req, res) => {
  try {
    const verifications = await Verification.findAll();
    res.status(200).json(verifications);
  } catch (error) {
    console.error("❌ Error fetching verifications:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

// 📌 Get a Single Verification by ID
exports.getVerificationById = async (req, res) => {
  try {
    const verification = await Verification.findByPk(req.params.id);
    if (!verification) {
      return res.status(404).json({ message: "Verification not found" });
    }
    res.status(200).json(verification);
  } catch (error) {
    console.error("❌ Error fetching verification:", error);
    res.status(500).json({ message: "Server error", error });
  }
};
