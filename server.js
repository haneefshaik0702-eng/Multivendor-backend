const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const app = express();

app.use(express.json());

// Import routes
const vendorRoutes = require("./routes/vendorRoutes");
app.use("/api/vendors", vendorRoutes);

const PORT = process.env.PORT || 10000;
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
