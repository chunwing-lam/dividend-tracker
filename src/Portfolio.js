import React, { Component } from 'react';
import { FaMinusSquareO, FaLineChart, FaPlusSquareO } from 'react-icons/lib/fa';
import * as PortfolioService from './PortfolioService';
import { Constant } from './Constant';

class Portfolio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stocks: {
        KO: {
          symbol: 'KO',
          market_price: 0,
          dividend_percentage: 0
        },
        MCD: {
          symbol: 'MCD',
          market_price: 0,
          dividend_percentage: 0
        },
        T: {
          symbol: 'T',
          market_price: 0,
          dividend_percentage: 0
        },
        CTL: {
          symbol: 'CTL',
          market_price: 0,
          dividend_percentage: 0
        }
      },
      purchases: {
        purchase1: {
          symbol: 'KO',
          share: 44,
          entry_price: 33.01
        },
        purchase2: {
          symbol: 'MCD',
          share: 17,
          entry_price: 81.02
        },
        purchase3: {
          symbol: 'T',
          share: 124,
          entry_price: 28.9075
        },
        purchase4: {
          symbol: 'KO',
          share: 106,
          entry_price: 34.335
        },
        purchase5: {
          symbol: 'CTL',
          share: 41,
          entry_price: 34.61
        },
        purchaseOrder: ['purchase1', 'purchase2', 'purchase3', 'purchase4', 'purchase5']
      }
    }

    this.handleRemoveClick = this.handleRemoveClick.bind(this);
    this.handleForecastClick = this.handleForecastClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.createStockTable = this.createStockTable.bind(this);
    this.fetchStats = this.fetchStats.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    if (Object.keys(this.state.stocks).length > Object.keys(prevState.stocks).length) {
      this.fetchStats();
    }
  }

  fetchStats() {
    let allStocks = Object.keys(this.state.stocks);
    fetch(`${Constant.IEXTRADING_BATCH_URL}?symbols=${allStocks}&types=quote,stats`)
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        let stocks = {};
        for (let data in json) {
          let stock = {
            ...this.state.stocks[data],
            market_price: json[data].quote.latestPrice,
            dividend_percentage: json[data].stats.dividendYield
          }
          stocks[data] =  stock
        }
        this.setState({
          ...this.state,
          stocks
        });
      });
  }

  componentDidMount() {
    this.fetchStats();
  }

  handleRemoveClick = (purchaseId, event) => {
    let answer = window.confirm('Are you sure you want to remove?');
    if (answer) {
      let newPurchases = {
        ...this.state.purchases
      };
      delete newPurchases[purchaseId];

      this.setState({
        ...this.state,
        purchases: {
          ...newPurchases,
          purchaseOrder: this.state.purchases.purchaseOrder.filter((purchase) => purchase !== purchaseId)
        }
      })
    }
  }

  handleForecastClick = (purchaseId, event) => {
    console.log(purchaseId);
    console.log(`show me forecast ${purchaseId} ${event.target}`);
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    let nextIndex = this.state.purchases.purchaseOrder.length + 1;

    let _stock = data.get('stock');

    this.setState({
      ...this.state,
      stocks: {
        ...this.state.stocks,
        [_stock]: {
          symbol: _stock,
          market_price: 0,
          dividend_percentage: 0
        }
      },
      purchases: {
        ...this.state.purchases,
        ['purchase'+nextIndex]: {
          symbol: data.get('stock'),
          share: Number(data.get('share')),
          entry_price: Number(data.get('entry_price'))
        },
        purchaseOrder: this.state.purchases.purchaseOrder.concat('purchase'+nextIndex)
      }
    });
  }

  createStockTable = () => {
    let purchaseTable = [];

    this.state.purchases.purchaseOrder.forEach((purchaseId) => {
      let purchase = this.state.purchases[purchaseId];
      let gainLoss = PortfolioService.getGainLoss(this.state.stocks, purchase);

      purchaseTable.push(
        <div className="stock-row">
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
          <div className="stock market-price">{PortfolioService.getMarketPrice(this.state.stocks, purchase)}</div>
          <div className="stock market-value">{PortfolioService.getMarketValue(this.state.stocks, purchase)}</div>
          <div className="stock entry-price">{purchase.entry_price}</div>
          <div className="stock entry-value">{PortfolioService.getEntryValue(purchase)}</div>
          <div className="stock weight">{PortfolioService.getWeight(this.state.purchases, purchase)}</div>
          <div className={`stock gain-loss ${gainLoss > 0? 'green': 'red'}`}>{gainLoss}</div>
          <div className="stock dividend-percentage">{PortfolioService.getDividendPercentage(this.state.stocks, purchase)}</div>
          <div className="stock dividend">{PortfolioService.getDividend(this.state.stocks, purchase)}</div>
        </div>
      )
    }, this);

    return purchaseTable;
  }

  render() {
    return (
      <div className="portfolio">
        <div className="header-row">
          <div className="stock action"><h3>Action</h3></div>
          <div className="stock symbol"><h3>Symbol</h3></div>
          <div className="stock share"><h3>Share</h3></div>
          <div className="stock market-price"><h3>Market price</h3></div>
          <div className="stock market-value"><h3>Market value</h3></div>
          <div className="stock entry-price"><h3>Entry price</h3></div>
          <div className="stock entry-value"><h3>Entry value</h3></div>
          <div className="stock weight"><h3>Weight Percentage</h3></div>
          <div className="stock gain-loss"><h3>Gain/Loss</h3></div>
          <div className="stock dividend-percentage"><h3>Dividend Percentage</h3></div>
          <div className="stock dividend"><h3>Dividend</h3></div>
        </div>

        {this.createStockTable()}

        <form onSubmit={this.handleSubmit}>
          <div className="add-row">
            <div className="stock action">
              <div className="icon">
                <button className="submit icon">
                  <FaPlusSquareO />
                </button>
              </div>
            </div>
            <div className="stock symbol">
              <input type="text" name="stock" />
            </div>
            <div className="stock share">
              <input type="text" name="share" />
            </div>
            <div className="stock market-price"></div>
            <div className="stock market-value"></div>
            <div className="stock entry-price">
              <input type="text" name="entry_price" />
            </div>
            <div className="stock entry-value"></div>
            <div className="stock weight"></div>
            <div className="stock gain-loss"></div>
            <div className="stock dividend-percentage"></div>
            <div className="stock dividend"></div>
          </div>
        </form>
      </div>
    )
  }
}

export default Portfolio;
