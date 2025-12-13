import type { Request, Response, NextFunction } from "express";

export const getHomeController = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(200).json({ message: "Welcome to the Home Route!" });
};
