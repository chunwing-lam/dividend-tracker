import React, { Component } from 'react'
import { FaPlusSquareO } from 'react-icons/lib/fa';

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
      nextIndex = Number(lastOrderName.substring(lastOrderName.length - 1)) + 1;
    }

    let _stock = data.get('stock');

    this.props.onStocksChange({
      ...this.props.stocks,
      stocks: {
        ...this.props.stocks.stocks,
        [_stock]: {
          symbol: _stock,
          market_price: this.props.stocks.stocks[_stock] !== undefined? this.props.stocks.stocks[_stock].market_price : 0,
          dividend_percentage: this.props.stocks.stocks[_stock] !== undefined? this.props.stocks.stocks[_stock].dividend_percentage : 0
        }
      },
      purchases: {
        ...this.props.stocks.purchases,
        ['purchase'+nextIndex]: {
          symbol: data.get('stock'),
          share: Number(data.get('share')),
          entry_price: Number(data.get('entry_price'))
        },
        purchaseOrder: this.props.stocks.purchases.purchaseOrder.concat('purchase'+nextIndex)
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
    )
  }
}

export default AdderRow;
