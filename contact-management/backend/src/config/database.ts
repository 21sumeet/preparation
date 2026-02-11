import mongoose from 'mongoose';
import {env} from './env';

export const connectDatabase = async (): Promise<void> => {
  try {
    const conn = await mongoose.connect(env.DATABASE_URL as string);
    //console.log(conn);
    console.log("database connected")
    
  } catch (error) {
    console.log(error)
    process.exit(1);
  }
};

export const disconnectDatabase = async (): Promise<void> => {
  await mongoose.disconnect();
};