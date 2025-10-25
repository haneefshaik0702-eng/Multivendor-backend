// server.js
const express = require("express");
const cors = require("cors");

const productRoutes = require("./src/routes/productRoutes");

const app = express();

// ✅ Enable CORS for your Render frontend
app.use(
  cors({
    origin: "https://multivendor-fronted.onrender.com", // your frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// ✅ Parse JSON request bodies
app.use(express.json());

// ✅ Home route
app.get("/", (req, res) => {
  res.send("✅ Backend server is running successfully on Render!");
});

// ✅ Product routes
app.use("/api/products", productRoutes);

// ✅ Start server
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
