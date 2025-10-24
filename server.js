const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB connected successfully"))
.catch((err) => console.log("❌ MongoDB connection error:", err));

// Test route
app.get("/test", (req, res) => {
  res.send("✅ Backend Connected Successfully!");
});

// Vendor Routes (example placeholder)
app.use("/api/vendors", require("./routes/vendorRoutes"));

// Product Routes
app.use("/api/products", require("./routes/productRoutes"));

// Order Routes
app.use("/api/orders", require("./routes/orderRoutes"));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
