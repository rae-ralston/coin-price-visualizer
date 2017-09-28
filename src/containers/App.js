import React, { Component } from 'react';
import moment from 'moment'
import './App.css';
import { connect } from 'react-redux'
import { UPDATE_PRICES } from '../constants';
// import PriceBarGraph from './PriceBarGraph'
// API for Current Price in USD: https://min-api.cryptocompare.com/data/price?fsym=LUN&tsyms=USD')

class App extends Component {

  componentDidMount() {
    let closingPrices
    fetch('https://min-api.cryptocompare.com/data/histohour?fsym=LUN&tsym=USD&limit=60&aggregate=3&e=CCCAGG')
      .then(rawResponse => rawResponse.json())
      .then(parsedResponse => {
         closingPrices = parsedResponse.Data.map(priceObj => ({
            time: moment(new Date( priceObj.time )).format("LTS"),
            price: priceObj.close
          }))
        this.props.dispatch({
          type: UPDATE_PRICES,
          prices: closingPrices
        })
      })

  }

  render() {
    return (
      <div>
        hai
      </div>
    );
  }
}

export default connect()(App);
