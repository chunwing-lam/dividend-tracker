import React, { Component } from 'react';

class ForecastTable extends Component {
  constructor(props) {
    super(props);

    this.handleForecastClick = this.handleForecastClick.bind(this);
  }

  handleForecastClick() {
    this.props.onForecastTableChange();
  }

  render() {
    return (
      <div>
        <div className="backdrop" onClick={(event) => this.handleForecastClick()}></div>
        <div className="forecast-table">
          <div className="forecast-header-row">
            <div className="forecast year"><h3>Year</h3></div>
            <div className="forecast payable"><h3>Estimate Dividend/Payable</h3></div>
            <div className="forecast estimate"><h3>Estimate Dividend Forecast</h3></div>
          </div>

          <div className="forecast-row">
            <div className="forecast year">1</div>
            <div className="forecast payable">2</div>
            <div className="forecast estimate">3</div>
          </div>

          <div className="forecast-row">
            <div className="forecast year">1</div>
            <div className="forecast payable">2</div>
            <div className="forecast estimate">3</div>
          </div>

          <div className="forecast-row">
            <div className="forecast year">1</div>
            <div className="forecast payable">2</div>
            <div className="forecast estimate">3</div>
          </div>

          <div className="forecast-row">
            <div className="forecast year">1</div>
            <div className="forecast payable">2</div>
            <div className="forecast estimate">3</div>
          </div>

          <div className="forecast-row">
            <div className="forecast year">1</div>
            <div className="forecast payable">2</div>
            <div className="forecast estimate">3</div>
          </div>
        </div>
      </div>
    )
  }
}

export default ForecastTable;
