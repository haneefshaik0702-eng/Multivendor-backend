// server.js
const express = require("express");
const cors = require("cors");

const productRoutes = require("./src/routes/productRoutes");

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Home route
app.get("/", (req, res) => {
  res.send("✅ Backend server is running successfully on Render!");
});

// ✅ Use product routes
app.use("/api/products", productRoutes);

// ✅ Start server
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
