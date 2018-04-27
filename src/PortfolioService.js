export const getEntryValue = (stock) => stock.entry_price * stock.share;

export const getMarketValue = (stock) => stock.market_price * stock.share;

export const getGainLoss = (stock) => getMarketValue(stock) - getEntryValue(stock);

export const getDividend = (stock) => getMarketValue(stock) * stock.dividend_percentage / 100;

export const getWeight = (stocks, stock, total) => {
  const reducer = (accumulator, currentValue) => accumulator + getEntryValue(currentValue);

  let selectedStockTotal =
    stocks
      .filter((_stock) => _stock.symbol === stock.symbol)
      .reduce(reducer, 0);

  return selectedStockTotal / total * 100;
}
