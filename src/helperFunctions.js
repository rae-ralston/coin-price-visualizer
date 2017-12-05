import moment from 'moment'

export function fetchPrices() {
  return fetch('https://min-api.cryptocompare.com/data/histohour?fsym=LUN&tsym=USD&limit=60&aggregate=3&e=CCCAGG')
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
