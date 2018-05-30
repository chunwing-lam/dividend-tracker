import React, { Component } from 'react';
import { FaMinusSquareO, FaLineChart } from 'react-icons/lib/fa';
import * as PortfolioService from '../../PortfolioService';
import { Constant } from '../../Constant';

class PurchasesRow extends Component {
  constructor(props) {
    super(props);

    this.createStockTable = this.createStockTable.bind(this);
    this.handleRemoveClick = this.handleRemoveClick.bind(this);
    this.handleForecastClick = this.handleForecastClick.bind(this);
  }

  handleRemoveClick = (purchaseId, event) => {
    let answer = window.confirm('Are you sure you want to remove?');
    if (answer) {
      let newPurchases = {
        ...this.props.stocks.purchases
      };
      delete newPurchases[purchaseId];

      this.props.onStateChange({
        ...this.props.stocks,
        purchases: {
          ...newPurchases,
          purchaseOrder: this.props.stocks.purchases.purchaseOrder.filter((purchase) => purchase !== purchaseId)
        }
      })
    }
  }

  handleForecastClick = (purchaseId, event) => {
    let estimateGrowth = PortfolioService.getEstimateGrowth(this.props.stocks.stocks, this.props.stocks.purchases[purchaseId], Constant.ESTIMATE_YEARS);
    this.props.onForecastTableChange(estimateGrowth);
  }

  createStockTable = () => {
    let purchaseTable = [];

    this.props.stocks.purchases.purchaseOrder.forEach((purchaseId) => {
      let purchase = this.props.stocks.purchases[purchaseId];
      let gainLoss = PortfolioService.getGainLoss(this.props.stocks.stocks, purchase);

      purchaseTable.push(
        <div className="stock-row" key={purchase.key}>
          <div className="stock action">
            <div className="icon" onClick={(event) => this.handleRemoveClick(purchaseId, event)}>
              <FaMinusSquareO />
            </div>
            <div className="icon" onClick={(event) => this.handleForecastClick(purchaseId, event)}>
              <FaLineChart />
            </div>
          </div>
          <div className="stock symbol">{purchase.symbol}</div>
          <div className="stock share">{purchase.share}</div>
          <div className="stock market-price">{PortfolioService.getMarketPrice(this.props.stocks.stocks, purchase)}</div>
          <div className="stock market-value">{PortfolioService.getMarketValue(this.props.stocks.stocks, purchase)}</div>
          <div className="stock entry-price">{purchase.entry_price}</div>
          <div className="stock entry-value">{PortfolioService.getEntryValue(purchase)}</div>
          <div className="stock weight">{PortfolioService.getWeight(this.props.stocks.purchases, purchase)}</div>
          <div className={`stock gain-loss ${gainLoss > 0? 'green': 'red'}`}>{gainLoss}</div>
          <div className="stock dividend-percentage">{PortfolioService.getDividendPercentage(this.props.stocks.stocks, purchase)}</div>
          <div className="stock dividend">{PortfolioService.getDividend(this.props.stocks.stocks, purchase)}</div>
        </div>
      )
    }, this);

    return purchaseTable;
  }

  render() {
    return (
      <div>
        {Object.keys(this.props.stocks).length > 0? this.createStockTable() : null}
      </div>
    )
  }
}

export default PurchasesRow;
