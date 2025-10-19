import { Request, Response, NextFunction } from 'express';
import { verify } from '../utils/jwt';

export async function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const header = req.headers.authorization;
  if (!header) return res.status(401).json({ message: 'Missing authorization' });
  const parts = header.split(' ');
  if (parts.length !== 2) return res.status(401).json({ message: 'Invalid authorization header' });
  const token = parts[1];
  try {
    const payload = verify(token);
    (req as any).userId = payload.sub;
    next();
  } catch (e) {
    return res.status(401).json({ message: 'Invalid token' });
  }
}
