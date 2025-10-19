import { Router } from 'express';
import { pool } from '../db';
import { v4 as uuidv4 } from 'uuid';

const router = Router();

router.get('/', async (req, res) => {
  const client = await pool.connect();
  try {
    const r = await client.query(`SELECT p.*, v.name as vendor_name, v.vendor_type FROM products p LEFT JOIN vendors v ON p.vendor_id = v.id`);
    return res.json(r.rows.map(row => ({
      id: row.id,
      vendorId: row.vendor_id,
      vendor: { id: row.vendor_id, name: row.vendor_name, vendorType: row.vendor_type },
      name: row.name,
      description: row.description,
      price_cents: row.price_cents,
      unit: row.unit,
      stock: row.stock,
      requires_prescription: row.requires_rx
    })));
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: 'Internal error' });
  } finally {
    client.release();
  }
});

// create product (protected use in real app)
router.post('/', async (req, res) => {
  const { vendorId, name, description, priceCents, unit, stock, requiresRx } = req.body;
  const client = await pool.connect();
  try {
    const id = uuidv4();
    await client.query('INSERT INTO products(id, vendor_id, name, description, price_cents, unit, stock, requires_rx) VALUES($1,$2,$3,$4,$5,$6,$7,$8)', [id, vendorId, name, description || '', priceCents || 0, unit || '', stock || 0, requiresRx || false]);
    return res.json({ id });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: 'Internal error' });
  } finally {
    client.release();
  }
});

export default router;
