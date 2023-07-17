import { getShopifyAccessToken } from '../../../helpers'
import { mutationAddToCart } from '../graphql'

export async function addItemsToCart(variables: { cartId: string; merchandiseId: string; quantity: number }) {
  const accessToken = getShopifyAccessToken()
  return await fetch(`https://${import.meta.env.PUBLIC_STORE_DOMAIN}/api/2023-07/graphql.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': `${accessToken}`,
    },
    body: JSON.stringify({
      query: mutationAddToCart,
      variables,
    }),
  })
}
