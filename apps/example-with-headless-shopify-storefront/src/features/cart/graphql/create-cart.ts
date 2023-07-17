import { CART_DETAILS } from './fragment-cart-details'
/**
 * GraphQL mutation that creates a new cart
 * @see https://shopify.dev/docs/api/storefront/2023-07/mutations/cartCreate
 * @param `id` - The ID of the product variant to add to the cart
 * @param `quantity`? - amount of the merchandise to add to the cart
 */
export const mutationCreateCart = `#graphql
  mutation cartCreate($id: ID!, $quantity: Int!) {
    cartCreate (input: { lines: [{ merchandiseId: $id, quantity: $quantity }] }) {
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
