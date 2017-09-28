
import { UPDATE_PRICES } from '../constants';

export const updatePrices = (payload) => ({
  type: UPDATE_PRICES,
  prices: payload
})
