export const PRODUCT_DETAILS = `#graphql
fragment productFragment on Product {
  id
  title
  handle
  description
  images (first: 10) {
    nodes {
      url
      width
      height
      altText
    }
  }
  variants(first: 10) {
    nodes {
      id
      title
      availableForSale
      quantityAvailable
      price {
        amount
        currencyCode
      }
    }
  }
  featuredImage {
    url
    width
    height
    altText
  }
}
`
