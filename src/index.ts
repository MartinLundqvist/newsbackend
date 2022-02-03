import express from 'express';
import dotenv from 'dotenv';
import routes from './routes';
import cors from 'cors';
import { connectToDB } from './database';

dotenv.config();

console.log(
  'Starting news-scraper-backend service in ' + process.env.NODE_ENV + ' mode'
);

const PORT = parseInt(process.env.PORT!, 10) || 4000;

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', routes);

app.listen(PORT, async () => {
  console.log('Server listening on port ' + PORT);
  try {
    await connectToDB();
    console.log('Connected to database');
  } catch (err) {
    console.log('Failed to connect to database');
  }
});
