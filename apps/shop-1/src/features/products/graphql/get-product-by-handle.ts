import { PRODUCT_DETAILS } from './details'

export const queryGetProductByHandle = `#graphql
  query ($handle: String!) {
    product(handle: $handle) {
      ...productFragment
    }
  }
  ${PRODUCT_DETAILS}
`
