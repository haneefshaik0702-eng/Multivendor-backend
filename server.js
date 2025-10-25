import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB Connected"))
.catch((err) => console.log("❌ MongoDB Error:", err));

// Example product data
const products = [
  { id: 1, name: "Smartphone", price: 499, vendor: "TechZone" },
  { id: 2, name: "Headphones", price: 99, vendor: "Soundify" },
  { id: 3, name: "Smartwatch", price: 199, vendor: "TimePro" },
];

// Routes
app.get("/", (req, res) => {
  res.send("Welcome to Multivendor API");
});

app.get("/api/products", (req, res) => {
  res.json(products);
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
