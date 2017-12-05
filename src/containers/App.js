import React, { Component } from 'react';
import { connect } from 'react-redux'

import { UPDATE_PRICES } from '../constants';
import './App.css';
// API for Current Price in USD: https://min-api.cryptocompare.com/data/price?fsym=LUN&tsyms=USD')

class App extends Component {

  render() {
    let prices = this.props.prices[0]
    let pricesLI = Array.isArray(prices)
        ? prices.map((data, index) => {
            return <li key={index}>{data.time}: {data.price}</li>
          })
        : <li></li>
    return (
      <div className="App">
        <ul>
          {pricesLI}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    prices: state.prices
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onGetPriceClick: (closingPrices) =>
      dispatch({
        type: UPDATE_PRICES,
        prices: closingPrices
      })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
