import mongoose from 'mongoose';
import { config } from 'dotenv';

const env = config();

const ENV = process.env.NODE_ENV;

const DB_STRING =
  ENV === 'production' ? process.env.DB_STRING : process.env.DB_STRING_LOCAL;

const connectToDB = async () => {
  try {
    console.log('Connecting to database');
    await mongoose.connect(DB_STRING || '');
    console.log('Connected to mongodb');
  } catch (err) {
    console.log(err);
  }
};

export { connectToDB };
