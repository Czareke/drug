const path = require("path");
  .sync({ force: false }) // ❌ Don't use force:true in production
  .then(() => {
    console.log("✅ Database connected & tables synced!");

    const PORT = process.env.PORT || 1200;
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("❌ Database connection failed:", err);
  });
app.use(globalErrorHandler);
