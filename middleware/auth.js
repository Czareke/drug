const jwt = require("jsonwebtoken");
const { User, Admin, Pharmacist } = require("../models");

exports.protect = async (req, res, next) => {
  try {
    // Get token from header
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Please login to access this resource",
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Check user exists
    let user;
    if (decoded.role === "admin") {
      user = await Admin.findByPk(decoded.id);
    } else if (decoded.role === "pharmacist") {
      user = await Pharmacist.findByPk(decoded.id);
    } else {
      user = await User.findByPk(decoded.id);
    }

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User no longer exists",
      });
    }

    // Add user to request
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Invalid token",
    });
  }
};
