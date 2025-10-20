import mongoose, { Schema, Document } from "mongoose";

export interface IProduct extends Document {
  name: string;
  price: number;
  category: string;
  description?: string;
  stock: number;
}

const productSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    description: { type: String },
    stock: { type: Number, required: true, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model<IProduct>("Product", productSchema);
