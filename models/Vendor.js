// models/Vendor.js
import mongoose from "mongoose";

const vendorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true } // later hash this with bcrypt
}, { timestamps: true });

export default mongoose.model("Vendor", vendorSchema);

