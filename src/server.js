import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // 👈 VERY IMPORTANT

const app = express();
app.use(express.json());

const mongoURI = process.env.MONGO_URI;
console.log("🔍 Mongo URI from env:", mongoURI); // 👈 for testing

mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

app.get("/", (req, res) => {
  res.send("✅ Backend server is running successfully on Render!");
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
