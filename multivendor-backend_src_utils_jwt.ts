import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

export function sign(payload: object, opts: any = {}) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d', ...opts });
}

export function verify(token: string) {
  return jwt.verify(token, JWT_SECRET) as any;
}
