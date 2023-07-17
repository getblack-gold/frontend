import { mutationCreateCart } from '../graphql'
import { getShopifyAccessToken } from '../../../helpers'

export async function createCart(variables: { id: string; quantity: number }) {
  const accessToken = getShopifyAccessToken()
  return await fetch(`https://${import.meta.env.PUBLIC_STORE_DOMAIN}/api/2023-07/graphql.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': `${accessToken}`,
    },
    body: JSON.stringify({
      query: mutationCreateCart,
      variables,
    }),
  })
}
