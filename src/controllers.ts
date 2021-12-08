import { Request, Response, NextFunction } from 'express';
import { HeadlinesModel } from './model';

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
  const toDate = new Date(req.params.date);
  const fromDate = new Date(toDate);
  fromDate.setMinutes(fromDate.getMinutes() - 2);

  console.log(toDate.toISOString());
  console.log(fromDate.toISOString());

  try {
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
  const toDate = new Date(req.params.to);
  const fromDate = new Date(req.params.from);

  console.log(fromDate.toISOString());
  console.log(toDate.toISOString());

  try {
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

export { getHeadlines, getNewsPaper, getDate, getDateRange, getMetadata };
