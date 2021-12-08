import express from 'express';
import { config } from 'dotenv';
import routes from './routes';
import cors from 'cors';
import { connectToDB } from './model';

const env = config();

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
