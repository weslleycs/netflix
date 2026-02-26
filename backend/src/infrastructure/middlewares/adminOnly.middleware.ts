import { Request, Response, NextFunction } from "express";

export function adminOnly(req: Request, res: Response, next: NextFunction) {

  return next();
  if (!req.user) {
    return res.status(401).json({ message: "No authentication" });
  }

  if (req.user.role !== "ADMIN") {
    return res.status(403).json({ message: "Access denied. Talk to the system administrator." });
  }

  return next();
}
