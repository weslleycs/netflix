import jwt from 'jsonwebtoken';
import { AppError, ErrorCode } from '@shared/errors/AppError';

const SECRET = process.env.JWT_SECRET;
if (!SECRET) {
  throw new Error('JWT_SECRET is required and must be set in the environment.');
}
const SECRET_VALUE: string = SECRET;

const EXPIRES_IN = '7d';

export type TokenPayload = {
  sub: number;
  email: string;
};

export function signToken(payload: TokenPayload): string {
  return jwt.sign(payload, SECRET_VALUE, { expiresIn: EXPIRES_IN });
}

export function verifyToken(token: string): TokenPayload {
  try {
    const decoded = jwt.verify(token, SECRET_VALUE) as jwt.JwtPayload;
    if (typeof decoded.sub !== 'number' || typeof decoded.email !== 'string') {
      throw new AppError(ErrorCode.UNAUTHORIZED, 'Invalid token payload');
    }
    return { sub: decoded.sub, email: decoded.email };
  } catch (err) {
    if (err instanceof AppError) throw err;
    throw new AppError(ErrorCode.UNAUTHORIZED, 'Invalid or expired token');
  }
}
