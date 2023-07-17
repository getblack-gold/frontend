import { CART_DETAILS } from './fragment-cart-details'

/**
 * GraphQL mutation that removes merchandise lines from a given cart.
 * @see https://shopify.dev/docs/api/storefront/2023-07/mutations/cartLinesRemove
 * @param `cartId` - The ID of the cart to update
 * @param `lineIds` - list of the IDs of merchandise lines to remove from a given cart
 */
export const mutationRemoveFromCart = `#graphql
  mutation RemoveLinesFromCart($cartId: ID!, $lineIds: [ID!]!) {
    cartLinesRemove (cartId: $cartId, lineIds: $lineIds) {
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
