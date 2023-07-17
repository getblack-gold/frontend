import { CART_DETAILS } from './fragment-cart-details'

/**
 * GraphQL mutation that adds a merchandise line to a given cart.
 * @see https://shopify.dev/docs/api/storefront/2023-07/mutations/cartLinesAdd
 * @param `cartId` - The ID of the cart to update
 * @param `merchandiseId` - ID of the merchandise to add to the cart
 * @param `quantity`? - amount of the merchandise to add to the cart
 */
export const mutationAddToCart = `#graphql
  mutation AddLinesToCart($cartId: ID!, $merchandiseId: ID!, $quantity: Int) {
    cartLinesAdd (cartId: $cartId, lines: [{ merchandiseId: $merchandiseId, quantity: $quantity }]) {
      cart {
        ...cartFragment
      }
      userErrors {
        field
        message
      }
    }
  }
  ${CART_DETAILS}
`
