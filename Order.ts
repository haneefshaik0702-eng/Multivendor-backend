import mongoose, { Schema, Document } from "mongoose";

export interface IOrder extends Document {
  userId: string;
  products: { productId: string; quantity: number }[];
  total: number;
  status: string;
}

const orderSchema = new Schema<IOrder>(
  {
    userId: { type: String, required: true },
    products: [
      {
        productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
        quantity: { type: Number, required: true },
      },
    ],
    total: { type: Number, required: true },
    status: { type: String, default: "Pending" },
  },
  { timestamps: true }
);

export default mongoose.model<IOrder>("Order", orderSchema);
