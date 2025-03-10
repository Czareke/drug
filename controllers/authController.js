const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../models");  // ✅ Import models properly
const User = db.User;
const Admin = db.Admin;

require("dotenv").config();
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const sendEmail = require("../utils/email");

// ✅ Generate JWT Token
const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// ✅ Register a new User
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    let user = await User.findOne({ where: { email } });
    if (user) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    user = await User.create({ name, email, password: hashedPassword, role: "user" });

    res.status(201).json({ message: "User registered successfully", user });
  } catch (error) {
    console.error("❌ Registration Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Register a new Admin
exports.registerAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    let admin = await Admin.findOne({ where: { email } });
    if (admin) return res.status(400).json({ message: "Admin already exists" });

    // ✅ Ensure password is hashed before storing
    const hashedPassword = await bcrypt.hash(password, 10);
    admin = await Admin.create({ name, email, password: hashedPassword, role: "admin" });

    res.status(201).json({ message: "Admin registered successfully", admin });
  } catch (error) {
    console.error("❌ Admin Registration Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Login for both User & Admin

// ✅ Login for both User & Admin
exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  console.log("📌 Login attempt for email:", email);

  const [user, admin] = await Promise.all([
    User.findOne({ where: { email } }),
    Admin.findOne({ where: { email } }),
  ]);

  const account = user || admin;

  if (!account) {
    console.log("❌ User not found:", email);
    return next(new AppError("User or Admin not found", 404));
  }

  console.log("✅ User found:", account.email);

  // Compare password (without displaying it)
  const isMatch = await bcrypt.compare(password, account.password);

  if (!isMatch) {
    console.log("❌ Password Mismatch!");
    return next(new AppError("Invalid credentials", 400));
  }

  const token = generateToken(account.id, account.role);

  console.log("✅ Login Successful:", account.email);

  res.status(200).json({
    message: "Login successful",
    token,
    role: account.role,
  });
});


exports.forgotPassword = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ where: { email: req.body.email } });
  if (!user) {
    return next(new AppError("There is no user with that email address.", 404));
  }

  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  const resetURL = `${req.protocol}://${req.get("host")}/api/v1/auth/resetPassword/${resetToken}`;

  const message = `Forgot your password? Submit a PATCH request with your new password and passwordConfirm to: ${resetURL}.\nIf you didn't forget your password, please ignore this email!`;

  try {
    await sendEmail({
      email: user.email,
      subject: "Your password reset token (valid for 10 min)",
      message,
    });

    res.status(200).json({
      status: "success",
      message: "Token sent to email!",
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });

    return next(new AppError("There was an error sending the email. Try again later!", 500));
  }
});

exports.resetPassword = catchAsync(async (req, res, next) => {
  const { token, newPassword } = req.body;

  const user = await User.findOne({
    where: { passwordResetToken: token, passwordResetExpires: { $gt: Date.now() } },
  });

  if (!user) {
    return next(new AppError("Invalid or expired token", 400));
  }

  user.password = await bcrypt.hash(newPassword, 10);
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;

  await user.save();

  res.status(200).json({
    status: "success",
    message: "Password updated successfully",
  });
});
