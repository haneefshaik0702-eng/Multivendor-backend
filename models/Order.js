// models/Order.js
import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  customerName: { type: String, required: true },
  products: [{
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
    quantity: { type: Number, default: 1 }
  }],
  totalAmount: { type: Number, default: 0 },
  status: { type: String, default: "Pending" }
}, { timestamps: true });

export default mongoose.model("Order", orderSchema);

