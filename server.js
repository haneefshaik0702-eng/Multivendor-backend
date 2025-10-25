// server.js

// Import dependencies
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

// Initialize environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Root route to confirm server is running
app.get("/", (req, res) => {
  res.send("✅ Backend server is running successfully on Render!");
});

// Example: connect to MongoDB (optional)
const MONGO_URL = process.env.MONGO_URL || "";
if (MONGO_URL) {
  mongoose
    .connect(MONGO_URL)
    .then(() => console.log("✅ Connected to MongoDB"))
    .catch((err) => console.error("❌ MongoDB connection error:", err));
} else {
  console.log("⚠️ No MongoDB URL provided, skipping database connection.");
}

// Start the server
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

