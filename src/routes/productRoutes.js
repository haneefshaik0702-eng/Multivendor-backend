const express = require("express");
const router = express.Router();

// Example product route
router.get("/", (req, res) => {
  res.send("Product route working ✅");
});

module.exports = router;
