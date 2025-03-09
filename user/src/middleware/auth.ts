import { Request, Response, NextFunction } from "express";

export const authenticate = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader || authHeader !== "Bearer faketoken_user1") {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }
  
  next();
};
