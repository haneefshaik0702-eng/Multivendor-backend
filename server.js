import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const app = express();

// ✅ Enable CORS
app.use(cors());

// ✅ Middleware
app.use(express.json());

// ✅ Connect to MongoDB
mongoose
  .connect("your_mongodb_connection_string_here", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection failed:", err));

// ✅ Simple test route
app.get("/", (req, res) => {
  res.send("Backend running successfully 🚀");
});

// ✅ Products route example (you can adjust to your real route)
app.get("/api/products", (req, res) => {
  res.json([
    { id: 1, name: "Product 1", price: 100 },
    { id: 2, name: "Product 2", price: 200 },
  ]);
});

// ✅ Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
