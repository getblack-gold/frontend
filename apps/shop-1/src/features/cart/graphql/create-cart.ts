import { CART_DETAILS } from './details'

export const mutationCreateCart = `#graphql
  mutation ($id: ID!, $quantity: Int!) {
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
