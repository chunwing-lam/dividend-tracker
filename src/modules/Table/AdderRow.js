import React, { Component } from 'react';
import { FaPlusSquareO } from 'react-icons/lib/fa';
import { Constant } from '../../Constant';

class AdderRow extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.target);

    // use the last purchase order number and plus one
    let nextIndex = 1;
    if (this.props.stocks.purchases.purchaseOrder.length > 0) {
      let lastOrderName = this.props.stocks.purchases.purchaseOrder[this.props.stocks.purchases.purchaseOrder.length - 1];
      nextIndex = Number(lastOrderName.substring('purchase'.length)) + 1;
    }

    let _stock = data.get('stock').toUpperCase();

    // test symbol
    fetch(Constant.IEXTRADING_PRICE_URL(_stock))
      .then((response) => {
        if (response.status === 200) {
          fetch(`${Constant.PORTFOLIO_ENDPOINT}`, {
            method: 'POST',
            body: JSON.stringify({
              symbol: _stock,
              share: Number(data.get('share')),
              entryPrice: Number(data.get('entry_price'))
            })
          })
          .then((response) => {
            return response.json();
          })
          .then((json) => {
            this.props.onStateChange({
              ...this.props.stocks,
              stocks: {
                ...this.props.stocks.stocks,
                [_stock]: {
                  symbol: _stock,
                  market_price: this.props.stocks.stocks[_stock] !== undefined? this.props.stocks.stocks[_stock].market_price : 0,
                  dividend_percentage: this.props.stocks.stocks[_stock] !== undefined? this.props.stocks.stocks[_stock].dividend_percentage : 0,
                  growth: this.props.stocks.stocks[_stock] !== undefined? this.props.stocks.stocks[_stock].growth : 0,
                }
              },
              purchases: {
                ...this.props.stocks.purchases,
                ['purchase'+nextIndex]: {
                  symbol: _stock,
                  share: Number(data.get('share')),
                  entry_price: Number(data.get('entry_price')),
                  key: json.id
                },
                purchaseOrder: this.props.stocks.purchases.purchaseOrder.concat('purchase'+nextIndex)
              }
            });
          })
        }
      });
  }

  render() {
    return (
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
            <input type="text" name="stock" required />
          </div>
          <div className="stock share">
            <input type="number" name="share" required />
          </div>
          <div className="stock market-price"></div>
          <div className="stock market-value"></div>
          <div className="stock entry-price">
            <input type="number" step="0.0001" name="entry_price" required />
          </div>
          <div className="stock entry-value"></div>
          <div className="stock weight"></div>
          <div className="stock gain-loss"></div>
          <div className="stock dividend-percentage"></div>
          <div className="stock dividend"></div>
        </div>
      </form>
    )
  }
}

export default AdderRow;
