const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// Example route
app.get("/", (req, res) => {
  res.send("✅ Multivendor backend is running successfully on Render!");
});

// Add other API routes here (orders, products, etc.)
app.post("/create-order", (req, res) => {
  const { items, total } = req.body;
  if (!items || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: "Cart is empty" });
  }
  // In future: save to MongoDB using mongoose
  res.json({ message: "Order created successfully", total });
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
