import React, { Component } from 'react';
import * as PortfolioService from '../PortfolioService';

class ResultBox extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="result-box">
        <div className="result-header-rows">
          <div className="result-header-row">Dividend Average</div>
          <div className="result-header-row">Dividend Total</div>
        </div>
        <div className="result-rows">
          <div className="result-row">{PortfolioService.getDividendAverage(this.props.stocks)}</div>
          <div className="result-row">{PortfolioService.getDividendTotal(this.props.stocks)}</div>
        </div>
      </div>
    );
  }
}

export default ResultBox;
