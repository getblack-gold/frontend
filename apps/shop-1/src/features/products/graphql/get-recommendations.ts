import { PRODUCT_DETAILS } from './details'

export const queryGetRecommendations = `#graphql
  query ($productId: ID!) {
    productRecommendations(productId: $productId) {
      ...productFragment
    }
  }
  ${PRODUCT_DETAILS}
`
