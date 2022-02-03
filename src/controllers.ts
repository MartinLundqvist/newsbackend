import { Request, Response, NextFunction } from 'express';
import { AnalysisModel } from './models/analyses';
import { HeadlinesModel } from './models/headlines';

const getHeadlines = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await HeadlinesModel.find();
    res.status(200).send(JSON.stringify(data));
  } catch (err) {
    res
      .status(500)
      .send(JSON.stringify({ message: 'Error finding headlines', error: err }));
  }
};

const getNewsPaper = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const newspaper = req.params.newspaper;

  try {
    const data = await HeadlinesModel.find({ newspaper: newspaper }).exec();
    console.log('Fetched ' + data.length + ' articles');
    res.status(200).send(JSON.stringify(data));
  } catch (err) {
    console.log('Error fetching newspaper' + newspaper);
    res
      .status(500)
      .send(
        JSON.stringify({ message: `Error finding ${newspaper}`, error: err })
      );
  }
};

const getDate = async (req: Request, res: Response, next: NextFunction) => {
  var toDate = new Date();
  var fromDate = new Date();

  try {
    toDate = new Date(req.params.date);
    fromDate = new Date(toDate);
    fromDate.setMinutes(fromDate.getMinutes() - 2);

    console.log(toDate.toISOString());
    console.log(fromDate.toISOString());
    const data = await HeadlinesModel.find({
      date: { $gte: fromDate, $lte: toDate },
    }).exec();
    console.log('Fetched ' + data.length + ' articles');
    res.status(200).send(JSON.stringify(data));
  } catch (err) {
    res
      .status(500)
      .send(JSON.stringify({ message: `Error finding ${toDate}`, error: err }));
  }
};

const getDateRange = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  var toDate = new Date();
  var fromDate = new Date();

  try {
    toDate = new Date(req.params.to);
    fromDate = new Date(req.params.from);

    console.log(fromDate.toISOString());
    console.log(toDate.toISOString());
    const data = await HeadlinesModel.find({
      date: { $gte: fromDate, $lte: toDate },
    }).exec();

    console.log('Fetched ' + data.length + ' articles');
    res.status(200).send(JSON.stringify(data));
  } catch (err) {
    res.status(500).send(
      JSON.stringify({
        message: `Error finding ${fromDate} to ${toDate}`,
        error: err,
      })
    );
  }
};

interface IStringIndexed {
  [index: string]: number;
}

interface IMetaData {
  count: number;
  newspapers: IStringIndexed;
  dates: {
    first: Date;
    last: Date;
  };
}

const getMetadata = async (req: Request, res: Response, next: NextFunction) => {
  const metadata: IMetaData = {
    count: 0,
    newspapers: {
      Aftonbladet: 0,
      SVD: 0,
      DN: 0,
      Expressen: 0,
      Sydsvenskan: 0,
      GP: 0,
    },
    dates: {
      first: new Date('1999'),
      last: new Date('2021'),
    },
  };

  try {
    metadata.count = await HeadlinesModel.count();
    for (var property in metadata.newspapers) {
      metadata.newspapers[property] = await HeadlinesModel.count({
        newspaper: property,
      });
    }
    const sortedByDate = await HeadlinesModel.find({
      $sort: { date: -1 },
    });

    metadata.dates.first = sortedByDate[0].date;
    metadata.dates.last = sortedByDate[sortedByDate.length - 1].date;

    res.status(200).send(JSON.stringify(metadata));
  } catch (err) {
    res
      .status(500)
      .send(JSON.stringify({ message: 'Error fetching metadata', error: err }));
  }
};

const getAnalysis = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const date = new Date(req.params.date);
    const max = parseInt(req.query.max as string, 10) || 10;

    console.log(max);
    const analysisDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    );

    console.log('Fetching analysis data for ' + analysisDate.toString());
    const data = await AnalysisModel.find(
      {
        date: analysisDate,
      },
      { headlines: { $slice: max } }
    ).exec();

    if (data.length > 0) {
      console.log('Found an analysis for that date');
      res.status(200).send(JSON.stringify(data));
    } else {
      console.log('No analysis found for that date');
      res.status(500).send(
        JSON.stringify({
          message: `No analysis found for that date.`,
          error: '',
        })
      );
    }
  } catch (err) {
    res.status(500).send(
      JSON.stringify({
        message: `Error while finding analysis for that date.`,
        error: err,
      })
    );
  }
};
const getAnalysisDateRange = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const fromDate = new Date(req.params.from);
    const toDate = new Date(req.params.to);
    const max = parseInt(req.query.max as string, 10) || 10;

    const analysisFromDate = new Date(
      fromDate.getFullYear(),
      fromDate.getMonth(),
      fromDate.getDate()
    );
    const analysisToDate = new Date(
      toDate.getFullYear(),
      toDate.getMonth(),
      toDate.getDate()
    );

    console.log(
      'Fetching analysis data for ' +
        analysisFromDate.toString() +
        ' to ' +
        analysisToDate.toString()
    );
    const data = await AnalysisModel.find(
      {
        date: { $gte: analysisFromDate, $lte: analysisToDate },
        $sort: { date: -1 },
      },
      { headlines: { $slice: max } }
    ).exec();

    if (data.length > 0) {
      console.log('Found ' + data.length + ' analysis for those dates');
      res.status(200).send(JSON.stringify(data));
    } else {
      console.log('No analyses found for that date');
      res.status(500).send(
        JSON.stringify({
          message: `No analyses found for that date.`,
          error: '',
        })
      );
    }
  } catch (err) {
    res.status(500).send(
      JSON.stringify({
        message: `Error while finding analyses for those dates.`,
        error: err,
      })
    );
  }
};

export {
  getHeadlines,
  getNewsPaper,
  getDate,
  getDateRange,
  getMetadata,
  getAnalysis,
  getAnalysisDateRange,
};
