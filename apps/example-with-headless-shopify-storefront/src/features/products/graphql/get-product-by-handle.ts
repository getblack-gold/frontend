import { PRODUCT_DETAILS } from './details'

export const queryGetProductByHandle = `#graphql
  query ProductByHandle($handle: String!) {
    product(handle: $handle) {
      ...productFragment
    }
  }
  ${PRODUCT_DETAILS}
`
