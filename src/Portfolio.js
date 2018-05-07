import React, { Component } from 'react';
import { Constant } from './Constant';
import HeaderRow from './modules/Table/HeaderRow';
import AdderRow from './modules/Table/AdderRow';
import PurchasesRow from './modules/Table/PurchasesRow';

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
    this.fetchStats = this.fetchStats.bind(this);
    this.handleStocksChange = this.handleStocksChange.bind(this);
  }

  handleStocksChange(newStocks) {
    this.setState({ ...newStocks });
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

  render() {
    return (
      <div className="portfolio">
        <HeaderRow />
        <PurchasesRow stocks={this.state} />
        <AdderRow stocks={this.state} onStocksChange={this.handleStocksChange} />
      </div>
    )
  }
}

export default Portfolio;
