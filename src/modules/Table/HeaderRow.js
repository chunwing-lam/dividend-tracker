import React from 'react';

const HeaderRow = () => (
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
  )

export default HeaderRow;
