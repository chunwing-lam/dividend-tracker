import React from 'react';
import * as PortfolioService from '../PortfolioService';

const ResultBox = (props) => {
  return (
    <div className="result-box">
      <div className="result-header-rows">
        <div className="result-header-row">Dividend Average</div>
        <div className="result-header-row">Dividend Total</div>
      </div>
      <div className="result-rows">
        <div className="result-row">{PortfolioService.getDividendAverage(props.stocks)}</div>
        <div className="result-row">{PortfolioService.getDividendTotal(props.stocks)}</div>
      </div>
    </div>
  );
}

export default ResultBox;
