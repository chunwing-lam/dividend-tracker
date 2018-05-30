import React, { Component } from 'react';
import { Constant } from './Constant';
import HeaderRow from './modules/Table/HeaderRow';
import AdderRow from './modules/Table/AdderRow';
import PurchasesRow from './modules/Table/PurchasesRow';
import ForecastTable from './modules/Table/ForecastTable';
import * as PortfolioService from './PortfolioService';

class Portfolio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      forecastTableIsOpen: false,
      forecast: [],
      stocks: {},
      purchases: {
        purchaseOrder: []
      }
    };

    this.fetchStats = this.fetchStats.bind(this);
    this.handleStateChange = this.handleStateChange.bind(this);
    this.handleForecastTableChange = this.handleForecastTableChange.bind(this);
  }

  handleStateChange(newStocks) {
    this.setState({ ...newStocks });
  }

  handleForecastTableChange(estimateGrowth) {
    this.setState(prevState => {
      return {
        ...this.state.stocks,
        forecastTableIsOpen: !prevState.forecastTableIsOpen,
        forecast: estimateGrowth
      }
    })
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.stocks !== undefined) {
      if (Object.keys(this.state.stocks).length > Object.keys(prevState.stocks).length) {
        this.fetchStats(this.state.purchases);
      }
    }
  }

  fetchStats(purchases) {
    let allStocks = Object.entries(purchases)
      .filter((purchase) => purchase[0].indexOf('Order') === -1)
      .map((purchase) => purchase[1].symbol)
      .filter((purchase, index, purchases) => purchases.indexOf(purchase) === index)

    fetch(`${Constant.IEXTRADING_BATCH_URL}?symbols=${allStocks}&types=quote,stats,dividends&range=5y`)
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        let stocks = {};
        for (let data in json) {
          let stock = {
            ...this.state.stocks[data],
            market_price: json[data].quote.latestPrice,
            dividend_percentage: json[data].stats.dividendYield,
            growth: PortfolioService.getDividendGrowth(json[data].dividends)
          }
          stocks[data] = stock;
        }
        this.setState({
          ...this.state,
          stocks,
          purchases: {
            ...purchases,
          }
        });
      });
  }

  componentDidMount() {
    // get portfolio from DynamoDB
    fetch(`${Constant.PORTFOLIO_ENDPOINT}`)
      .then((response) => {
        return response.json();
      })
      .then((portfolio) => {
        if (portfolio.length > 0) {
          let purchases = {};
          portfolio.forEach((p, index) => {
            let purchase = {
              symbol: p.symbol,
              share: p.share,
              entry_price: p.entryPrice,
              key: p.id
            }
            purchases['purchase' + index] = purchase;
          });
          purchases['purchaseOrder'] = Object.keys(purchases);
          this.fetchStats(purchases);
        }
      });
  }

  render() {
    return (
      <div>
        <div className="portfolio">
          <HeaderRow />
          <PurchasesRow stocks={this.state} onStateChange={this.handleStateChange} onForecastTableChange={this.handleForecastTableChange} />
          <AdderRow stocks={this.state} onStateChange={this.handleStateChange} />
        </div>
        { this.state.forecastTableIsOpen? <ForecastTable forecast={this.state.forecast} onForecastTableChange={this.handleForecastTableChange} /> : null }
      </div>
    )
  }
}

export default Portfolio;
