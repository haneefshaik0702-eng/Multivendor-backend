import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config(); // Load .env variables

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// ✅ MongoDB Connection
const mongoURI = process.env.MONGO_URI;

if (!mongoURI) {
  console.error("❌ MONGO_URI is missing in environment variables!");
  process.exit(1);
}

mongoose
  .connect(mongoURI, {
  })
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  });

// Example Route
app.get("/", (req, res) => {
  res.send("🚀 Server is running and MongoDB is connected!");
});

// ✅ Dynamic Port for Render
const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
