import { COLLECTION_DETAILS } from './details'

/**
 * Requires `read_products` access scope in Shopify
 * @see  https://shopify.dev/docs/api/admin-graphql/2023-07/objects/Collection
 */
export const queryGetCollections = `#graphql
  query FeaturedCollections($first: Int!) {
      collections(first: $first) {
        edges {
          node {
            ...collectionFragment
          }
        }
      }
    }
    ${COLLECTION_DETAILS}
  `
