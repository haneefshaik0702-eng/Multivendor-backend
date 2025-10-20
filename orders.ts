import { Router, Request, Response } from "express";
import Order from "../models/Order";

const router = Router();

router.get("/", async (_req: Request, res: Response) => {
  const orders = await Order.find().populate("products.productId");
  res.json(orders);
});

router.post("/", async (req: Request, res: Response) => {
  const order = new Order(req.body);
  await order.save();
  res.status(201).json(order);
});

export default router;
