const express = require("express");
const router = express.Router();

// Add a product
router.post("/add", (req, res) => {
  res.send("Product added successfully!");
});

// Edit a product
router.put("/edit/:id", (req, res) => {
  res.send(`Product ${req.params.id} updated successfully!`);
});

// Delete a product
router.delete("/delete/:id", (req, res) => {
  res.send(`Product ${req.params.id} deleted successfully!`);
});

// List all products
router.get("/", (req, res) => {
  res.send("List of all products");
});

module.exports = router;
