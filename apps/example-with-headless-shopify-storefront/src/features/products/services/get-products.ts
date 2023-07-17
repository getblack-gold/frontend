import { getShopifyAccessToken } from '../../../helpers'
import { queryGetProducts } from '../graphql'

export async function getProducts(variables: { first: number; query?: string }) {
  const accessToken = getShopifyAccessToken()
  return await fetch(`https://${import.meta.env.PUBLIC_STORE_DOMAIN}/api/2023-07/graphql.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': `${accessToken}`,
    },
    body: JSON.stringify({
      query: queryGetProducts,
      variables,
    }),
  })
}
