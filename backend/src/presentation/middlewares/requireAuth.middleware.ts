import { NextFunction, Request, Response } from 'express';
import { AppError, ErrorCode } from '@shared/errors/AppError';
import { verifyToken } from '@shared/auth/jwt';

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  try {
    const header = req.headers.authorization;
    if (!header || !header.startsWith('Bearer ')) {
      throw new AppError(ErrorCode.UNAUTHORIZED, 'Missing or malformed Authorization header');
    }

    const token = header.slice('Bearer '.length).trim();
    if (!token) {
      throw new AppError(ErrorCode.UNAUTHORIZED, 'Missing bearer token');
    }

    const payload = verifyToken(token);
    req.userId = payload.sub;
    next();
  } catch (err) {
    if (err instanceof AppError) {
      return res.status(err.statusCode).json({ message: err.message });
    }
    return res.status(ErrorCode.UNAUTHORIZED).json({ message: 'Unauthorized' });
  }
}
