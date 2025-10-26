import express from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS
app.use(cors({ origin: "*", methods: ["GET", "POST", "PUT", "DELETE"] }));
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("Backend is running fine ✅");
});

// Products API
app.get("/products", (req, res) => {
  const products = [
    { id: 1, name: "Test Product 1", price: 100 },
    { id: 2, name: "Test Product 2", price: 200 }
  ];
  res.json(products);
});

// Start server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
