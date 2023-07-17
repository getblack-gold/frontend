/**
 * GraphQL fragment for the cart field
 * @see https://shopify.dev/docs/api/storefront/2023-07/objects/Cart
 */
export const CART_DETAILS = `#graphql
fragment cartFragment on Cart {
  id
  totalQuantity
  checkoutUrl
  cost {
    totalAmount {
      amount
      currencyCode
    }
  }
  lines(first: 100) {
    nodes {
      id
      quantity
      merchandise {
        ...on ProductVariant {
          id
          title
          image {
            url
            altText
            width
            height
          }
          product {
            handle
            title
          }
        }
      }
      cost {
        amountPerQuantity{
          amount
          currencyCode
        }
        subtotalAmount {
          amount
          currencyCode
        }
        totalAmount {
          amount
          currencyCode
        }
      }
    }
  }
}
`
