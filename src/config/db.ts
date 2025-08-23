import mongoose from 'mongoose';

let isConnected = false;

export const connectDB = async (uri: string) => {
  if (isConnected) return;

  try {
    await mongoose.connect(uri);
    isConnected = true;
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    throw err;
  }
};
