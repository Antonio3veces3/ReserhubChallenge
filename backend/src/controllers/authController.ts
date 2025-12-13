import type { Request, Response } from 'express';
import { UserModel, type IUser } from '../models/user.model.ts';

export const signUpController = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    const existingUser = await UserModel.findOne({ username });
    if (existingUser) {
      return res
        .status(409)
        .json({ message: 'User already exists, please go to login' });
    }

    const newUser = new UserModel({ username, password });
    await newUser.save();

    return res.status(201).json({
      message: 'User registered successfully',
      user: { id: newUser._id, username: newUser.username },
    });
  } catch (error) {
    console.error('Error en sign up:', error);
    return res.status(500).json({ message: 'Server error during signup.' });
  }
};

export const signInController = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    const user = await UserModel.findOne({ username }).select('+password');

    if (!user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Incorrect password' });
    }

    return res.status(200).json({
      message: 'Login successful',
      user: { id: user._id, username: user.username },
    });
  } catch (error) {
    console.error('Error on sign in:', error);
    return res.status(500).json({
      message: 'Server error in sign in.',
    });
  }
};
