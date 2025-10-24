// routes/orderRoutes.js
import express from "express";
import Order from "../models/Order.js";
import Product from "../models/Product.js";

const router = express.Router();

// Place order
router.post("/", async (req, res) => {
  try {
    const { customerName, products } = req.body;
    // compute total
    let total = 0;
    for (const item of products) {
      const p = await Product.findById(item.productId);
      if (!p) return res.status(400).json({ message: "Invalid product" });
      total += p.price * (item.quantity || 1);
    }
    const order = new Order({ customerName, products, totalAmount: total });
    await order.save();
    res.status(201).json(order);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// List orders
router.get("/", async (req, res) => {
  const orders = await Order.find().populate({ path: "products.productId", model: "Product" });
  res.json(orders);
});

// Update order (status)
router.put("/:id", async (req, res) => {
  const order = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(order);
});

export default router;

