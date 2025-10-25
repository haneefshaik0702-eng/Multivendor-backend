import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config(); // ✅ Load environment variables

const app = express();

// ✅ Enable CORS
app.use(cors());

// ✅ Middleware
app.use(express.json());

// ✅ Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection failed:", err));

// ✅ Simple test route
app.get("/", (req, res) => {
  res.send("Backend running successfully 🚀");
});

// ✅ Example route
app.get("/api/products", (req, res) => {
  res.json([
    { id: 1, name: "Product 1", price: 100 },
    { id: 2, name: "Product 2", price: 200 },
  ]);
});

// ✅ Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
