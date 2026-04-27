declare global {
  namespace Express {
    interface Request {
      userId?: number;
      validatedQuery?: unknown;
      validatedParams?: unknown;
    }
  }
}

export {};
