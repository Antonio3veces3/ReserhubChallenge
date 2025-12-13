import mongoose from 'mongoose';
import config from '../config/config.ts';

export const connectDB = async () => {
  try {
    await mongoose.connect(config.connectionUrl);
    console.log('MongoDB connected successfully');
  } catch (error) {
    throw new Error(`Error connecting to MongoDB: ${error}`);
  }
};
