import mongoose from 'mongoose';
import { IAnalysis, IHeadlineEntry, IMarketData } from '../types';

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
  url: {
    type: String,
    default: '',
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
