
const express = require("express");
const router = express.Router();

// ✅ Test route — to confirm it works
router.get("/", (req, res) => {
  res.send("✅ Vendor route working successfully!");
});

// ✅ Register vendor
router.post("/register", (req, res) => {
  res.send("Vendor registered successfully!");
});

// ✅ Login vendor
router.post("/login", (req, res) => {
  res.send("Vendor login successful!");
});

// ✅ List all vendors
router.get("/list", (req, res) => {
  res.send(["Vendor 1", "Vendor 2", "Vendor 3"]);
});

module.exports = router;
