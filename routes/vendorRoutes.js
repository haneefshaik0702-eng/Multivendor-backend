// routes/vendorRoutes.js
import express from "express";
import Vendor from "../models/Vendor.js";

const router = express.Router();

// Register
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    // NOTE: in production hash password with bcrypt
    const exists = await Vendor.findOne({ email });
    if (exists) return res.status(400).json({ message: "Email already registered" });
    const vendor = new Vendor({ name, email, password });
    await vendor.save();
    res.status(201).json({ message: "Vendor registered", vendor });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Login (simple)
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const vendor = await Vendor.findOne({ email, password });
    if (!vendor) return res.status(401).json({ message: "Invalid credentials" });
    res.json({ message: "Login successful", vendor });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// List vendors
router.get("/", async (req, res) => {
  const vendors = await Vendor.find();
  res.json(vendors);
});

export default router;
