import { PRODUCT_DETAILS } from './details'

export const queryGetProducts = `#graphql
query ($first: Int!) {
    products(first: $first) {
      edges {
        node {
          ...productFragment
        }
      }
    }
  }
  ${PRODUCT_DETAILS}
`
