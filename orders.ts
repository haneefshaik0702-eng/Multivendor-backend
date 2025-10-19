import { Router } from 'express';
import Order from '../models/Order';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

router.post('/', authMiddleware, async (req, res) => {
  const { items, totalCents, address } = req.body;
  const customerId = (req as any).userId;
  const order = await Order.create({ customerId, items, totalCents, address });
  res.json({ id: order._id, createdAt: order.createdAt });
});

router.get('/', authMiddleware, async (req, res) => {
  const orders = await Order.find().limit(100).sort({ createdAt: -1 });
  res.json(orders);
});

export default router;
