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
    this.state = {};

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
        this.fetchStats();
      }
    }
  }

  fetchStats() {
    if (this.state.stocks !== undefined) {
      let allStocks = Object.keys(this.state.stocks);
      if (allStocks.length > 0) {
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
              stocks[data] =  stock
            }
            this.setState({
              ...this.state,
              stocks
            });
          });
      }
    }
  }

  componentDidMount() {
    // get stuff from express users
    fetch('/users')
      .then((response) => {
        return response.json();
      })
      .then((portfolio) => {
        this.setState({
          ...portfolio
        })
        this.fetchStats();
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
