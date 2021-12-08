import mongoose from 'mongoose';
import { config } from 'dotenv';

const env = config();

const DB_HOST = process.env.DB_HOST;
const DB_USER = process.env.DB_USER;
const DB_PWD = process.env.DB_PWD;
const DB_PORT = process.env.DB_PORT;
const DB_DATABASE = process.env.DB_DATABASE;

const HeadlineSchema = new mongoose.Schema({
  headline: {
    type: String,
    default: 'Empty',
  },
  url: {
    type: String,
    default: 'Empty',
  },
});

const NewsPaperHeadlinesSchema = new mongoose.Schema({
  newspaper: {
    type: String,
    default: 'Unknown',
  },
  date: {
    type: Date,
    default: new Date(),
  },
  headlines: [HeadlineSchema],
});

const connectToDB = async () => {
  try {
    console.log('Connecting to database');
    await mongoose.connect(
      `mongodb://${DB_USER}:${DB_PWD}@${DB_HOST}:${DB_PORT}/${DB_DATABASE}?authSource=admin&readPreference=primary&ssl=false`
    );
    console.log('Connected to mongodb');
  } catch (err) {
    console.log(err);
  }
};

const HeadlinesModel = mongoose.model('headline', NewsPaperHeadlinesSchema);

export { connectToDB, HeadlinesModel };
