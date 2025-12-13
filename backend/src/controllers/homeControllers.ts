import type { Request, Response, NextFunction } from 'express';
import { UserModel } from '../models/user.model.ts';
export const getHomeController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const users = await UserModel.find();
  res.status(200).json({ message: 'Welcome to the Home Route!', data: users });
};
