const express = require("express");
const router = express.Router();

// Example: register vendor
router.post("/register", (req, res) => {
  res.send("Vendor registered successfully!");
});

// Example: login vendor
router.post("/login", (req, res) => {
  res.send("Vendor logged in successfully!");
});

// Example: list all vendors
router.get("/", (req, res) => {
  res.send("List of all vendors");
});

module.exports = router;
