import { UPDATE_PRICES } from '../constants'

const prices = (state = [], action) => {
  switch (action.type) {
    case UPDATE_PRICES:
      console.log('in reducer', action)
      return [action.prices]
    default:
      return state
  }
}

export default prices
