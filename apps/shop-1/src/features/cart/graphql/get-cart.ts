import { CART_DETAILS } from './details'

export const queryGetCart = `
  query ($id: ID!) {
    cart(id: $id) {
      ...cartFragment
    }
  }
  ${CART_DETAILS}
`
