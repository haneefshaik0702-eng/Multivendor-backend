const express = require("express");
const router = express.Router();

// Place an order
router.post("/place", (req, res) => {
  res.send("Order placed successfully!");
});

// Track an order
router.get("/track/:id", (req, res) => {
  res.send(`Tracking order ${req.params.id}`);
});

// List all orders
router.get("/", (req, res) => {
  res.send("List of all orders");
});

module.exports = router;
