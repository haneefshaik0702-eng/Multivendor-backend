import { Router } from 'express';
import Product from '../models/Product';

const router = Router();

router.get('/', async (req, res) => {
  const products = await Product.find().limit(200);
  res.json(products);
});

router.post('/', async (req, res) => {
  const p = await Product.create(req.body);
  res.json(p);
});

export default router;
