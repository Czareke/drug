const path = require("path");
const express = require("express");
const cors = require("cors");
const qrRoutes = require("./routes/qrRoutes");
const AppError = require("./utils/appError");
// Import database and models
const { sequelize } = require("./models");  // ✅ Import models/index.js to initialize Sequelize

// Import routes
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const drugRoutes = require("./routes/drugRoutes");
const verificationRoutes = require("./routes/verificationRoutes");
const reportRoutes = require("./routes/reportRoutes");
const adminRoutes = require("./routes/adminRoutes");
const pharmacistRoutes = require("./routes/pharmacistRoutes");
const globalErrorHandler = require("./controllers/errorController");
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Register Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/drugs", drugRoutes);
app.use("/api/verification", verificationRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/admins", adminRoutes);
app.use("/api/pharmacists", pharmacistRoutes);
app.use("/api/qrcode", qrRoutes);


// ✅ Global Error Handler
app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  res.status(err.statusCode).json({
    success: false,
    status: err.status,
    message: err.message,
  });
});
app.get("/", (req,res) => {
  res.render("index")
})
app.get("/verify", (req,res) => {
  res.render("verify")
})
app.get("/about", (req,res) => {
  res.render("about")
})
app.get("/contact", (req,res) => {
  res.render("contact")
})
app.get("/login", (req,res) => {
  res.render("login")
})
app.get("/forgot-password", (req,res) => {
  res.render("forgot-password")
})
app.get("/admin", (req,res) => {
  res.render("admin")
})
app.get("/pharmacist", (req,res) => {
  res.render("pharmacist")
})
app.get("/managedrugs", (req,res) => {
  res.render("managedrugs")
})
app.get("/expireddrugs", (req,res) => {
  res.render("expireddrugs")
})
app.get("/report", (req,res) => {
  res.render("report")
})
app.get("/settings", (req,res) => {
  res.render("settings")
})
app.get("/logout", (req,res) => {
  res.render("logout")
})
app.get("/pharmacistadmin", (req,res) => {
  res.render("pharmacistadmin")
})
app.get("/druginventory", (req,res) => {
  res.render("druginventory")
})
app.get("/verifydrug", (req,res) => {
  res.render("verifydrug")
})
app.get("/expireddrug", (req,res) => {
  res.render("expireddrug")
})
app.get("/profile", (req,res) => {
  res.render("profile")
})
app.get("/pharmacistlogout", (req,res) => {
  res.render("pharmacistlogout")
})
app.post("/api/auth/login", async (req, res) => {
  // Authentication logic...
  if (loginSuccessful) {
      return res.json({ message: "Login successful", redirect: "index" }); // ✅ Redirect to home
  } else {
      return res.status(401).json({ message: "Invalid credentials" });
  }
});

// Sync database before starting the server
sequelize.sync({ force: false })  // ❌ Don't use force:true in production
  .then(() => {
    console.log("✅ Database connected & tables synced!");

    const PORT = process.env.PORT || 1200;
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("❌ Database connection failed:", err);
  });
  app.use(globalErrorHandler);
