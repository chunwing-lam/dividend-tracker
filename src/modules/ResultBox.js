import React, { Component } from 'react';
import * as PortfolioService from '../PortfolioService';

class ResultBox extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div>
          Dividend Average = {PortfolioService.getDividendAverage(this.props.stocks)}
        </div>
        <div>
          Dividend Total = {PortfolioService.getDividendTotal(this.props.stocks)}
        </div>
      </div>
    );
  }
}

export default ResultBox;
