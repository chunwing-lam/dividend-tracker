export const getMarketPrice = (stocks, purchase) => stocks[purchase.symbol].market_price;

export const getMarketValue = (stocks, purchase) => {
  if (purchase !== undefined) {
    return getMarketPrice(stocks, purchase) * purchase.share;
  }
  return 0;
}

export const getDividendPercentage = (stocks, purchase) => stocks[purchase.symbol].dividend_percentage;

export const getEntryValue = (purchase) => purchase.entry_price * purchase.share;

export const getGainLoss = (stocks, purchase) => getMarketValue(stocks, purchase) - getEntryValue(purchase);

export const getDividend = (stocks, purchase) =>
  getMarketValue(stocks, purchase) * getDividendPercentage(stocks, purchase) / 100;

export const getWeight = (purchases, purchase) => {
  const total = getTotal(purchases);
  let reducer = (acc, curr) => acc + getEntryValue(purchases[curr]);
  let selectedStockTotal = purchases.purchaseOrder
                             .filter((id) => purchases[id].symbol === purchase.symbol)
                             .reduce(reducer, 0);
  return selectedStockTotal / total * 100;
}

export const getTotal = (purchases) => {
  let reducer = (acc, curr) => acc + getEntryValue(purchases[curr]);
  return purchases.purchaseOrder.reduce(reducer, 0);
}

export const getDividendGrowth = (dividends) => {
  let filtered = dividends
                  .filter((d) => d.amount > 0)
                  .reverse();

  let diff = [];
  // get the diff for dividends
  for (let i = 1; i < filtered.length; i++) {
    diff.push(parseFloat((filtered[i].amount - filtered[i-1].amount).toFixed(4)));
  }

  let percentage = [];
  for (let i = 0; i < filtered.length - 1; i++) {
    percentage.push(parseFloat((diff[i] / filtered[i].amount).toFixed(4)));
  }

  return percentage.reduce((acc, curr) => acc + curr, 0) / percentage.length;
}

export const getEstimateGrowth = (stocks, purchase, years) => {
  return new Array(years);
}
