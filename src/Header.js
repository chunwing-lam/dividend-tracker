import React, { Component } from 'react';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date()
    }
  }

  componentDidMount() {
    this.dateTimerID = setInterval(() => {
      this.setState({
        date: new Date()
      })
    }, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.dateTimerID);
  }

  render() {
    return (
      <h1>{this.state.date.toUTCString()}</h1>
    )
  }
}

export default Header;
