export const Constant = {
  IEXTRADING_BATCH_URL: 'https://api.iextrading.com/1.0/stock/market/batch',
  PORTFOLIO_ENDPOINT: 'https://x1fkx2wle1.execute-api.us-east-1.amazonaws.com/dev/portfolio/',
  ESTIMATE_YEARS: 20,
  IEXTRADING_PRICE_URL: function(symbol) {
    return `https://api.iextrading.com/1.0/stock/${symbol}/price`;
  }
}
