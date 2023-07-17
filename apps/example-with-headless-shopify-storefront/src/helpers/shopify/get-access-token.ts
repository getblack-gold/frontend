export function getShopifyAccessToken() {
  const isSSR = import.meta.env.SSR
  if (isSSR) return import.meta.env.STOREFRONT_API_TOKEN
  return import.meta.env.PUBLIC_STOREFRONT_API_TOKEN
}
