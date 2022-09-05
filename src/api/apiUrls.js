export const allPairsUrl = "https://www.binance.com/api/v3/ticker/price";
export const dayDataUrl = "https://api.binance.com/api/v3/ticker/24hr?symbol=";
// export const candlesUrl =
//   "https://api.binance.com/api/v3/klines?symbol=BTCUSDT&interval=1d";
export const candlesUrl = (pair, interval) =>
  `https://api.binance.com/api/v3/klines?symbol=${pair}&interval=${interval}`;
