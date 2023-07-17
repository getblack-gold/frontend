import { PRODUCT_DETAILS } from './details'

export const queryGetRecommendations = `#graphql
  query RecommendedProducts($productId: ID!) {
    productRecommendations(productId: $productId) {
      ...productFragment
    }
  }
  ${PRODUCT_DETAILS}
`
