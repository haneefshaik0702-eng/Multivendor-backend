import { Router } from 'express';
import { pool } from '../db';
import { v4 as uuidv4 } from 'uuid';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

router.post('/', authMiddleware, async (req, res) => {
  const client = await pool.connect();
  try {
    const id = uuidv4();
    const customerId = (req as any).userId || null;
    const payload = req.body;
    const total = payload.totalCents || 0;
    await client.query('INSERT INTO orders(id, customer_id, payload, total_cents) VALUES($1,$2,$3,$4)', [id, customerId, JSON.stringify(payload), total]);
    return res.json({ id, createdAt: new Date().toISOString() });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: 'Internal error' });
  } finally {
    client.release();
  }
});

router.get('/', authMiddleware, async (req, res) => {
  const client = await pool.connect();
  try {
    const r = await client.query('SELECT * FROM orders ORDER BY created_at DESC LIMIT 100');
    return res.json(r.rows);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: 'Internal error' });
  } finally {
    client.release();
  }
});

export default router;
