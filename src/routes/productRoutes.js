const express = require("express");
const router = express.Router();

// ✅ Test route
router.get("/", (req, res) => {
  res.send("✅ Product route working successfully!");
});

// ✅ Add product
router.post("/add", (req, res) => {
  res.send("Product added successfully!");
});

// ✅ Edit product
router.put("/edit/:id", (req, res) => {
  res.send(`Product ${req.params.id} updated successfully!`);
});

// ✅ Delete product
router.delete("/delete/:id", (req, res) => {
  res.send(`Product ${req.params.id} deleted successfully!`);
});

// ✅ List products
router.get("/list", (req, res) => {
  res.send(["Product A", "Product B", "Product C"]);
});

module.exports = router;

