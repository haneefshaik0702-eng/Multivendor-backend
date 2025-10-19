import { Router } from 'express';
import bcrypt from 'bcrypt';
import User from '../models/User';
import { sign } from '../utils/jwt';

const router = Router();

router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) return res.status(400).json({ message: 'Missing fields' });
  const existing = await User.findOne({ email });
  if (existing) return res.status(400).json({ message: 'Email already used' });
  const hash = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hash });
  const token = sign({ sub: user._id.toString(), email });
  res.json({ accessToken: token, user: { id: user._id, name: user.name, email: user.email } });
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });
  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(401).json({ message: 'Invalid credentials' });
  const token = sign({ sub: user._id.toString(), email });
  res.json({ accessToken: token, user: { id: user._id, name: user.name, email: user.email } });
});

router.get('/me', async (req, res) => {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ message: 'Missing authorization' });
  const token = auth.split(' ')[1];
  try {
    const payload = (await import('../utils/jwt')).verify(token);
    const user = await User.findById(payload.sub).select('id name email');
    res.json(user);
  } catch (e) {
    res.status(401).json({ message: 'Invalid token' });
  }
});

export default router;
