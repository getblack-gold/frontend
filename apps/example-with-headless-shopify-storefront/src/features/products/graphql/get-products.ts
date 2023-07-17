import { PRODUCT_DETAILS } from './details'

/**
 * @see https://shopify.dev/docs/api/admin-graphql/2023-07/objects/Product
 */
export const queryGetProducts = `#graphql
query FeaturedProducts($first: Int!, $after: String, $query: String) {
    products(first: $first, after: $after, query: $query) {
      edges {
        node {
          ...productFragment
        }
      }
    }
  }
  ${PRODUCT_DETAILS}
`
