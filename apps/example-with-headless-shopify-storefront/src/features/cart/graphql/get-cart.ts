import { CART_DETAILS } from './fragment-cart-details'

/**
 * GraphQL query to fetch a cart details by its id
 * @param `id` - ID of the cart to fetch the info of
 * @see https://shopify.dev/docs/api/storefront/2023-07/objects/Cart#query-cart
 */
export const queryGetCart = `
  query CartById($id: ID!) {
    cart(id: $id) {
      ...cartFragment
    }
  }
  ${CART_DETAILS}
`
