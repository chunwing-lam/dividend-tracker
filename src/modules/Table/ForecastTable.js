import React, { Component } from 'react';

class ForecastTable extends Component {
  constructor(props) {
    super(props);

    this.handleForecastClick = this.handleForecastClick.bind(this);
    this.createForecastTable = this.createForecastTable.bind(this);
  }

  handleForecastClick() {
    this.props.onForecastTableChange();
  }

  createForecastTable = () => {
    let forecastTable = [];

    this.props.forecast.forEach((forecast) => {
      forecastTable.push(
        <div className="forecast-row">
          <div className="forecast year">{forecast.year}</div>
          <div className="forecast payable">{forecast.payable}</div>
          <div className="forecast estimate">{forecast.forecast}</div>
        </div>
      )
    })

    return forecastTable;
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

          {this.createForecastTable()}

        </div>
      </div>
    )
  }
}

export default ForecastTable;
