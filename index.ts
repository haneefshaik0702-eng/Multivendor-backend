import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db";
import productRoutes from "./routes/products";
import orderRoutes from "./routes/orders";
import authRoutes from "./routes/auth";

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => res.send("✅ Multivendor API is running..."));
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
