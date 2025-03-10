const Admin = require("../models/Admin");

// 📌 Get All Admins
exports.getAllAdmins = async (req, res) => {
  try {
    const admins = await Admin.findAll();
    res.status(200).json(admins);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// 📌 Get Single Admin by ID
exports.getAdminById = async (req, res) => {
  try {
    const admin = await Admin.findByPk(req.params.id);
    if (!admin) return res.status(404).json({ message: "Admin not found" });

    res.status(200).json(admin);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// 📌 Create a New Admin
exports.createAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newAdmin = await Admin.create({ name, email, password });

    res.status(201).json({ message: "Admin created successfully", admin: newAdmin });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// 📌 Delete an Admin
exports.deleteAdmin = async (req, res) => {
  try {
    const admin = await Admin.findByPk(req.params.id);
    if (!admin) return res.status(404).json({ message: "Admin not found" });

    await admin.destroy();
    res.status(200).json({ message: "Admin deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
