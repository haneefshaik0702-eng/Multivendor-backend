
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// ✅ Middlewares
app.use(cors());
app.use(express.json());

// ✅ MongoDB connection (optional)
const MONGO_URI = process.env.MONGO_URI || "your_local_mongodb_connection_string";
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((err) => console.log("❌ MongoDB connection error:", err));

// ✅ Test route to confirm backend is live
app.get("/", (req, res) => {
  res.send("🚀 Backend is running successfully!");
});

// ✅ Test route for frontend-backend connection
app.get("/test", (req, res) => {
  res.send("Backend Connected Successfully!");
});

// ✅ Start server
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
