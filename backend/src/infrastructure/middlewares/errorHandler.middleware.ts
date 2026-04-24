import { Request, Response, NextFunction } from 'express';

interface AppError extends Error {
  statusCode?: number;
}

export function errorHandler(
  err: AppError,
  _req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction,
) {
  const statusCode = err.statusCode || 500;

  console.error(`[ERROR] ${statusCode} - ${err.message}`);

  return res.status(statusCode).json({ error: err.message });
}
