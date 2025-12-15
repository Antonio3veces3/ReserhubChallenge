import type { Request, Response } from 'express';
import { UserModel, type IUser } from '../models/user.model.ts';
import jwt from 'jsonwebtoken';
import config from '../config/config.ts';

const generateAuthToken = (user: IUser) => {
  return jwt.sign(
    { username: user.username, email: user.email },
    config.JWT_SECRET,
    {
      expiresIn: '7d',
    },
  );
};

export const signUpController = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res
        .status(409)
        .json({ message: 'User already exists, please go to login' });
    }

    const newUser = new UserModel({ username, email, password });
    await newUser.save();

    const newJwt = generateAuthToken(newUser);
    return res.status(201).json({
      message: 'User registered successfully',
      token: newJwt,
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.error('Error en sign up:', error);
    return res.status(500).json({ message: 'Server error during signup.' });
  }
};

export const signInController = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email }).select('+password');

    if (!user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Incorrect password' });
    }

    const newJwt = generateAuthToken(user);
    return res.status(200).json({
      message: 'Login successful',
      token: newJwt,
      user: { id: user._id, username: user.username, email: user.email },
    });
  } catch (error) {
    console.error('Error on sign in:', error);
    return res.status(500).json({
      message: 'Server error in sign in.',
    });
  }
};
