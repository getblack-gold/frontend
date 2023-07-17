import { queryGetCart } from '../graphql'
import { getShopifyAccessToken } from '../../../helpers'

export const QK_GET_CART = 'cart-details'
export async function getCart(variables: { id: string }): Promise<Response> {
  const accessToken = getShopifyAccessToken()
  return await fetch(`https://${import.meta.env.PUBLIC_STORE_DOMAIN}/api/2023-07/graphql.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': `${accessToken}`,
    },
    body: JSON.stringify({
      query: queryGetCart,
      variables,
    }),
  })
}
