export const Constant = {
  IEXTRADING_BATCH_URL: 'https://api.iextrading.com/1.0/stock/market/batch',
  ESTIMATE_YEARS: 20,
  IEXTRADING_PRICE_URL: function(symbol) {
    return `https://api.iextrading.com/1.0/stock/${symbol}/price`;
  } 
}
