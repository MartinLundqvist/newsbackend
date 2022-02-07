import express from 'express';
import dotenv from 'dotenv';
import routes from './routes';
import cors from 'cors';
import { closeDBConnection, connectToDB } from './database';

dotenv.config();

console.log(
  'Starting news-scraper-backend service in ' + process.env.NODE_ENV + ' mode'
);

const PORT = parseInt(process.env.PORT!, 10) || 4000;

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', routes);

const server = app.listen(PORT, async () => {
  console.log('Server listening on port ' + PORT);
  try {
    await connectToDB();
    console.log('Connected to database');
  } catch (err) {
    console.log('Failed to connect to database');
  }
});

process.on('SIGINT', async () => {
  console.log('Received SIGINT - closing down.');
  server.close(async (err) => {
    if (err) {
      console.log('Error closing server connection');
    } else {
      console.log('Serve connection closed');
    }
    await closeDBConnection();
    process.exit(0);
  });
});
