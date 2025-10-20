import { Router, Request, Response } from "express";
import Product from "../models/Product";

const router = Router();

router.get("/", async (_req: Request, res: Response) => {
  const products = await Product.find();
  res.json(products);
});

router.post("/", async (req: Request, res: Response) => {
  const product = new Product(req.body);
  await product.save();
  res.status(201).json(product);
});

router.put("/:id", async (req: Request, res: Response) => {
  const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

router.delete("/:id", async (req: Request, res: Response) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: "Product deleted" });
});

export default router;
