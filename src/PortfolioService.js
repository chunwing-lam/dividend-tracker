export const getMarketPrice = (stocks, purchase) => stocks[purchase.symbol].market_price;

export const getMarketValue = (stock) => stock.market_price * stock.share;

export const getDividendPercentage = (stocks, purchase) => stocks[purchase.symbol].dividend_percentage;

export const getEntryValue = (purchase) => purchase.entry_price * purchase.share;

export const getGainLoss = (stock) => getMarketValue(stock) - getEntryValue(stock);

export const getDividend = (stocks, purchase) =>
  getMarketValue(stocks, purchase) * getDividendPercentage(stocks, purchase) / 100;

export const getWeight = (purchases, purchaseId) => {
  const total = getTotal(purchases);
  let selectedStockTotal = 0;

  for (let purchase in purchases) {
    if (purchase.symbol === purchases[purchaseId].symbol) {
      selectedStockTotal += getEntryValue(purchase);
    }
  }
  return selectedStockTotal / total * 100;
}

export const getTotal = (purchases) => {
  let total = 0;
  for (let purchase in purchases) {
    total += getEntryValue(purchase);
  }
  return total;
}
