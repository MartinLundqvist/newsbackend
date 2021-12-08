import { Router } from 'express';
import {
  getHeadlines,
  getNewsPaper,
  getDate,
  getMetadata,
  getDateRange,
} from './controllers';

/**
 * Routes:
 * / - Get's you all the headline data in one huge dump
 * /newspaper/:{newspaper} - Get's you all the headline data from one newspaper
 * /date/:{date} - Get's you all the headline data nearest a specific time
 * /daterange/:{from}/:{to} - Get's you all the headline data between the two dates
 * /metadata - Gets you the basic information about the database contents
 */

const routes = Router();

routes.get('/', getHeadlines);
routes.get('/newspaper/:newspaper', getNewsPaper);
routes.get('/date/:date', getDate);
routes.get('/daterange/:from/:to', getDateRange);
routes.get('/metadata', getMetadata);

export default routes;
