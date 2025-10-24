const express = require("express");
const router = express.Router();

// Example vendor route
router.get("/", (req, res) => {
  res.send("Vendor route working ✅");
});

module.exports = router;
