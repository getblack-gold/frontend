/**
 * @see https://shopify.dev/docs/api/admin-graphql/2023-07/objects/Collection
 */
export const COLLECTION_DETAILS = `#graphql
fragment collectionFragment on Collection {
  id
  title
  handle
  description
  image {
    url
    width
    height
    altText
  }
  seo {
    description
    title
  }
}
`
