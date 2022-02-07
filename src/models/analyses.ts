import mongoose from 'mongoose';

export type TNewsPaper =
  | 'SVD'
  | 'Aftonbladet'
  | 'Sydsvenskan'
  | 'GP'
  | 'DN'
  | 'Expressen'
  | 'WSJ'
  | 'Guardian';

export type TLanguage = 'en' | 'se';

export interface IHeadlineEntry {
  headline: string;
  language: TLanguage;
  newspaper: TNewsPaper;
  count: number;
  share_of_total: number;
}

export interface IMarketDataPoint {
  market: string;
  symbol: string;
  price: number;
}

export interface IMarketData {
  timestamp: number;
  data: IMarketDataPoint[];
}

export interface IAnalysis {
  date: Date;
  count: number;
  unique: number;
  headlines: IHeadlineEntry[];
  market_data: IMarketData;
}

const MarketDataSchema = new mongoose.Schema<IMarketData>({
  timestamp: {
    type: Number,
    default: 0,
  },
  data: [
    {
      market: {
        type: String,
        default: '',
      },
      symbol: {
        type: String,
        default: '',
      },
      price: {
        type: Number,
        default: 0,
      },
    },
  ],
});

const HeadlineEntrySchema = new mongoose.Schema<IHeadlineEntry>({
  headline: {
    type: String,
    default: 'Empty',
  },
  language: {
    type: String,
    default: 'se',
  },
  newspaper: {
    type: String,
    default: 'SVD',
  },
  count: {
    type: Number,
    default: 0,
  },
  share_of_total: {
    type: Number,
    default: 0,
  },
});

const AnalysisSchema = new mongoose.Schema<IAnalysis>({
  date: {
    type: Date,
    default: new Date(),
  },
  count: {
    type: Number,
    default: 0,
  },
  headlines: [HeadlineEntrySchema],
  market_data: MarketDataSchema,
});

const AnalysisModel = mongoose.model('analysis', AnalysisSchema);

export { AnalysisModel };
