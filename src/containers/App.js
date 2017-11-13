import React, { Component } from 'react';
import moment from 'moment'
import './App.css';
import { connect } from 'react-redux'
import { UPDATE_PRICES } from '../constants';
// API for Current Price in USD: https://min-api.cryptocompare.com/data/price?fsym=LUN&tsyms=USD')

class App extends Component {

  fetchPrices = () => {
    fetch('https://min-api.cryptocompare.com/data/histohour?fsym=LUN&tsym=USD&limit=60&aggregate=3&e=CCCAGG')
      .then(rawResponse => rawResponse.json())
      .then(parsedResponse => {
        return parsedResponse.Data.map(priceObj => {
          return {
            time: moment(new Date( priceObj.time )).format("LTS"),
            price: priceObj.close
          }
        })
    })
  }

  componentDidMount() {
    fetch('https://min-api.cryptocompare.com/data/histohour?fsym=LUN&tsym=USD&limit=60&aggregate=3&e=CCCAGG')
      .then(rawResponse => rawResponse.json())
      .then(parsedResponse => {
        return parsedResponse.Data.map(priceObj => {
          return {
            time: moment(new Date( priceObj.time )).format("LTS"),
            price: priceObj.close
          }
        })
      })
      .then(closingPrices => {
        this.props.dispatch({
          type: UPDATE_PRICES,
          prices: closingPrices
        })
      })
      .catch(e => console.error(e))
    // const { store } = this.context
    // this.unsubscribe = store.subscribe(() =>
    //   this.forceUpdate()
    // )
  }

  // componentWillUnmount() {
  //   this.unsubscribe()
  // }

  render() {
    const props = this.props
    // const {store} = this.context
    // const state = store.getState()
    return (
      <div className="App">
        <button onGetPriceClick={this.fetchPrices}>Get Prices</button>
        hai {props.data}
        {props.prices}
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
    onGetPriceClick: (closingPrices) => dispatch({
      type: UPDATE_PRICES,
      prices: closingPrices
    })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
// export default App
