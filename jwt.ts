import jwt from 'jsonwebtoken';
const SECRET = process.env.JWT_SECRET || 'secret';

export function sign(payload: object) {
  return jwt.sign(payload, SECRET, { expiresIn: '7d' });
}

export function verify(token: string) {
  return jwt.verify(token, SECRET) as any;
}
