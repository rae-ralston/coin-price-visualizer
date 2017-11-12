const UPDATE_PRICES = "UPDATE PRICES"

export const updatePrices = (payload) => ({
  type: UPDATE_PRICES,
  prices: payload
})
