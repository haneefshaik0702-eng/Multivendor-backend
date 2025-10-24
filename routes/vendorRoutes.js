const express = require("express");
const router = express.Router();

// Sample route
router.get("/", (req, res) => {
  res.send("Vendor routes working ✅");
});

module.exports = router;
