import { Schema, model } from 'mongoose';

const ProductSchema = new Schema({
  vendorId: String,
  name: String,
  description: String,
  priceCents: Number,
  unit: String,
  stock: Number,
  requiresRx: { type: Boolean, default: false }
}, { timestamps: true });

export default model('Product', ProductSchema);
