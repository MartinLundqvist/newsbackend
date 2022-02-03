import { Router } from 'express';
import {
  getHeadlines,
  getNewsPaper,
  getDate,
  getMetadata,
  getDateRange,
  getAnalysis,
  getAnalysisDateRange,
} from './controllers';

/**
 * Routes:
 * / - Get's you all the headline data in one huge dump
 * /newspaper/:{newspaper} - Get's you all the headline data from one newspaper
 * /date/:{date} - Get's you all the headline data nearest a specific time
 * /daterange/:{from}/:{to} - Get's you all the headline data between the two dates
 * /metadata - Gets you the basic information about the database contents
 * /analysis - Retrieves analysis data generated from the Analyzer service. This also takes a query '?max=[x]' where x is the maximum number of headlines loaded
 * /analysis/daterange - Same as above, but for a date range...
 */

const routes = Router();

routes.get('/', getHeadlines);
routes.get('/newspaper/:newspaper', getNewsPaper);
routes.get('/date/:date', getDate);
routes.get('/daterange/:from/:to', getDateRange);
routes.get('/metadata', getMetadata);
routes.get('/analysis/:date', getAnalysis);
routes.get('/analysis/daterange/:from/:to', getAnalysisDateRange);

export default routes;
