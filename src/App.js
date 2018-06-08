import React, { Component } from 'react';
import Header from './Header';
import Portfolio from './Portfolio';

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <Portfolio />
      </div>
    );
  }
}

export default App;
