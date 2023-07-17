import { INITIAL_STATE, storeCart } from '../store'
import { getCart } from './get-cart'

/**
 * Creates a new Shopify cart and stores it locally (if no cart pre-existing).
 *
 * Initializes a Shopify cart via Shopify GraphQL API.
 * If there is a pre-existing cart stored locally, retrieves the cart details from the API
 * and updates the local storage with the latest information. If there is no pre-existing cart,
 * sets the cart back to it initial state.
 *
 * @async
 * @returns {Promise<void>} A promise that resolves when the cart initialization is complete.
 */
export async function initializeCartSession() {
  // Retrieves wheter or not a session has already been started
  const hasSession = sessionStorage.getItem('hasSession')
  if (!hasSession) {
    // If no session has been started, mark the session as started
    sessionStorage.setItem('hasSession', 'true')

    // Retrieve cart id from the persisted store
    const localCart = storeCart.get()
    const id = localCart?.id
    if (id) {
      // If the cart exists, send a request to the Shopify API to get the cart details
      const response = await getCart({ id })

      const abc = await response.json()
      console.log(abc)
      if (abc?.data) {
        const { data } = abc
        // If data is received from the API, update the local cart with the retrieved details
        storeCart.set({
          id: data.id,
          cost: data.cost,
          checkoutUrl: data.checkoutUrl,
          totalQuantity: data.totalQuantity,
          lines: data.lines,
        })
      } else {
        // If no data is received, set the local cart to the initial state
        storeCart.set(INITIAL_STATE)
      }
    }
  }
}
