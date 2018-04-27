import React, { Component } from 'react';
import { getEntryValue, getMarketValue, getGainLoss, getDividend, getWeight } from './PortfolioService';
import { Constant } from './Constant';

class Portfolio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stocks : [
        {
          symbol: 'KO',
          share: 44,
          market_price: 0,
          entry_price: 33.01,
          dividend_percentage: 0
        },
        {
          symbol: 'MCD',
          share: 17,
          market_price: 0,
          entry_price: 81.02,
          dividend_percentage: 0
        },
        {
          symbol: 'T',
          share: 124,
          market_price: 0,
          entry_price: 28.9075,
          dividend_percentage: 0
        },
        {
          symbol: 'KO',
          share: 106,
          market_price: 0,
          entry_price: 34.335,
          dividend_percentage: 0
        },
        {
          symbol: 'CTL',
          share: 41,
          market_price: 0,
          entry_price: 34.61,
          dividend_percentage: 0
        },
      ]
    }
  }

  componentDidMount() {
    // get updated market price
    let allStocks = [];
    this.state.stocks.map((stock, index) => {
      if (allStocks.indexOf(stock.symbol) < 0) {
        allStocks.push(stock.symbol);
      }
    });
    fetch(`${Constant.IEXTRADING_BATCH_URL}?symbols=${allStocks}&types=quote,stats`)
      .then((response) => {
        return response.json();
      })
      .then((myJson) => {
        this.state.stocks.map((stock, index) => {
          let newStocks = [...this.state.stocks];
          newStocks[index].market_price = myJson[stock.symbol].quote.latestPrice;
          newStocks[index].dividend_percentage = myJson[stock.symbol].stats.dividendYield;
          this.setState({ newStocks });
        })
      })


  }

  createStockTable = () => {
    let stocks = [],
        total = 0;

    this.state.stocks.map((stock) => {
      total += getEntryValue(stock);
    });

    this.state.stocks.map((stock) => {
      stocks.push(
        <div className="stock-row">
          <div className="stock symbol">{stock.symbol}</div>
          <div className="stock share">{stock.share}</div>
          <div className="stock market-price">{stock.market_price}</div>
          <div className="stock market-value">{getMarketValue(stock)}</div>
          <div className="stock entry-price">{stock.entry_price}</div>
          <div className="stock entry-value">{getEntryValue(stock)}</div>
          <div className="stock weight">{getWeight(this.state.stocks, stock, total)}</div>
          <div className="stock gain-loss">{getGainLoss(stock)}</div>
          <div className="stock dividend-percentage">{stock.dividend_percentage}</div>
          <div className="stock dividend">{getDividend(stock)}</div>
        </div>
      )
    })

    return stocks;
  }

  render() {
    return (
      <div className="portfolio">
        <div className="header-row">
          <div className="header symbol"><h3>Symbol</h3></div>
          <div className="header share"><h3>Share</h3></div>
          <div className="header market-price"><h3>Market price</h3></div>
          <div className="header market-value"><h3>Market value</h3></div>
          <div className="header entry-price"><h3>Entry price</h3></div>
          <div className="header entry-value"><h3>Entry value</h3></div>
          <div className="header weight"><h3>Weight Percentage</h3></div>
          <div className="header gain-loss"><h3>Gain/Loss</h3></div>
          <div className="header dividend-percentage"><h3>Dividend Percentage</h3></div>
          <div className="header dividend"><h3>Dividend</h3></div>
        </div>

        {this.createStockTable()}
      </div>
    )
  }
}

export default Portfolio;
