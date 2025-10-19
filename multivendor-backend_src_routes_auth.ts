import { Router } from 'express';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import { pool } from '../db';
import { sign } from '../utils/jwt';

const router = Router();

router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) return res.status(400).json({ message: 'Missing fields' });
  const client = await pool.connect();
  try {
    const exists = await client.query('SELECT id FROM users WHERE email = $1', [email]);
    if (exists.rowCount > 0) return res.status(400).json({ message: 'Email already used' });
    const hashed = await bcrypt.hash(password, 10);
    const id = uuidv4();
    await client.query('INSERT INTO users(id, name, email, password) VALUES($1,$2,$3,$4)', [id, name, email, hashed]);
    const token = sign({ sub: id, email });
    return res.json({ accessToken: token, user: { id, name, email } });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: 'Internal error' });
  } finally {
    client.release();
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: 'Missing fields' });
  const client = await pool.connect();
  try {
    const r = await client.query('SELECT id, name, password FROM users WHERE email=$1', [email]);
    if (r.rowCount === 0) return res.status(401).json({ message: 'Invalid credentials' });
    const user = r.rows[0];
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: 'Invalid credentials' });
    const token = sign({ sub: user.id, email });
    return res.json({ accessToken: token, user: { id: user.id, name: user.name, email } });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: 'Internal error' });
  } finally {
    client.release();
  }
});

router.get('/me', async (req, res) => {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ message: 'Missing authorization' });
  const parts = auth.split(' ');
  if (parts.length !== 2) return res.status(401).json({ message: 'Invalid authorization header' });
  const token = parts[1];
  try {
    const payload = (await import('../utils/jwt')).verify(token);
    const client = await pool.connect();
    const r = await client.query('SELECT id, name, email FROM users WHERE id=$1', [payload.sub]);
    client.release();
    if (r.rowCount === 0) return res.status(404).json({ message: 'User not found' });
    return res.json(r.rows[0]);
  } catch (e) {
    return res.status(401).json({ message: 'Invalid token' });
  }
});

export default router;
