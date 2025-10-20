import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = Router();
const users: any[] = [];

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  const user = { id: Date.now().toString(), name, email, password: hashed };
  users.push(user);
  res.status(201).json({ message: "User registered" });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = users.find((u) => u.email === email);
  if (!user) return res.status(400).json({ message: "User not found" });
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(400).json({ message: "Invalid password" });

  const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET as string);
  res.json({ token });
});

export default router;
