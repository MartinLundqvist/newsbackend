export type TNewsPaper =
  | 'SVD'
  | 'Aftonbladet'
  | 'Sydsvenskan'
  | 'GP'
  | 'DN'
  | 'Expressen'
  | 'WSJ'
  | 'Guardian'
  // Below this line are new ones
  | 'WashingtonPost'
  | 'BBC'
  | 'CNN'
  | 'DailyMail'
  | 'NYTimes'
  | 'Yahoo';

export type TLanguage = 'en' | 'se';

export interface IHeadlineEntry {
  headline: string;
  url: string;
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
