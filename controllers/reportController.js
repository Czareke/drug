const Report = require("../models/Report");
const Drug = require("../models/Drug");
const Pharmacist = require("../models/Pharmacist");
const Admin = require("../models/Admin");

// 📌 Create a Report (Pharmacists can report drugs)
exports.createReport = async (req, res) => {
    try {
      const { drug_id, pharmacist_id, admin_id, report_text } = req.body; // ✅ Ensure report_text is extracted
  
      // 🔍 Debugging Step
      console.log("Received Data:", req.body);
  
      // ✅ Ensure report_text is provided
      if (!report_text) {
        return res.status(400).json({ error: "report_text is required" });
      }
  
      const report = await Report.create({
        drug_id,
        pharmacist_id,
        admin_id,
        report_text, // ✅ Ensure this is passed
      });
  
      res.status(201).json({ message: "Report created successfully", report });
    } catch (error) {
      console.error("❌ Error creating report:", error);
      res.status(500).json({ error: error.message });
    }
  };
// 📌 Get All Reports (Admins & Pharmacists can view)
exports.getAllReports = async (req, res) => {
    try {
      const reports = await Report.findAll({
        include: [
          { model: Drug, as: "drug", attributes: ["name", "serial_number"] }, // ✅ Correct alias
          { model: Pharmacist, as: "pharmacist", attributes: ["name", "email"] }, // ✅ Correct alias
          { model: Admin, as: "admin", attributes: ["name"] }, // ✅ Correct alias
        ],
      });
  
      res.status(200).json(reports);
    } catch (error) {
      console.error("❌ Error fetching reports:", error);
      res.status(500).json({ message: "Server error", error });
    }
  };

// 📌 Get Report by ID (Admin & Pharmacists can view specific report)
exports.getReportById = async (req, res) => {
    try {
      const report = await Report.findByPk(req.params.id, {
        include: [
          { model: Drug, as: "drug", attributes: ["name", "serial_number"] }, // ✅ Correct alias
          { model: Pharmacist, as: "pharmacist", attributes: ["name", "email"] }, // ✅ Correct alias
          { model: Admin, as: "admin", attributes: ["name"] }, // ✅ Correct alias
        ],
      });
  
      if (!report) return res.status(404).json({ message: "Report not found" });
  
      res.status(200).json(report);
    } catch (error) {
      console.error("❌ Error fetching report:", error);
      res.status(500).json({ message: "Server error", error });
    }
  };

// 📌 Update Report Status (Only Admins can update)
exports.updateReportStatus = async (req, res) => {
  try {
    const { status, admin_id } = req.body;

    // Validate status
    if (!["pending", "reviewed", "removed"].includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    // Check if report exists
    const report = await Report.findByPk(req.params.id);
    if (!report) return res.status(404).json({ message: "Report not found" });

    // Check if admin exists
    const admin = await Admin.findByPk(admin_id);
    if (!admin) return res.status(404).json({ message: "Admin not found" });

    // Update the report
    await report.update({ status, admin_id });

    res.status(200).json({ message: "Report status updated", report });
  } catch (error) {
    console.error("❌ Error updating report status:", error);
    res.status(500).json({ message: "Server error", error });
  }
};
