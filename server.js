// server.js
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Home route
app.get("/", (req, res) => {
  res.send("✅ Backend server is running successfully on Render!");
});

// ✅ Temporary Products API (test data)
app.get("/api/products", (req, res) => {
  const products = [
    { id: 1, name: "Red Shirt", price: 499 },
    { id: 2, name: "Blue Jeans", price: 999 },
    { id: 3, name: "Sneakers", price: 1499 },
  ];
  res.json(products);
});

// ✅ Start server
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
