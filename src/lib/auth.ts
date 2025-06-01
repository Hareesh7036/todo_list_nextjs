import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET || 'your_default_secret';

export function verifyToken(token: string) {
  try {
    return jwt.verify(token, SECRET);
  } catch (err) {
    return null;
  }
}
