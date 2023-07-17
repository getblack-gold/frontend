import { useStore } from '@nanostores/solid'
import { createQuery } from '@tanstack/solid-query'
import { QK_GET_CART, getCart } from '../services'
import type { CartDetails, QueryCartDetailsResult } from '../services/types'
import type { DefinedCreateQueryResult } from '@tanstack/solid-query'

import { queryClient, storeCart } from '../store'

export function useCartDetails(): {
  queryCartDetails: DefinedCreateQueryResult<CartDetails, Error>
} {
  const cart = useStore(storeCart)
  const queryCartDetails = createQuery(
    () => ({
      enabled: cart()?.id && cart().id !== '' ? true : false,
      queryKey: [QK_GET_CART, cart()?.id],
      queryFn: async (): Promise<QueryCartDetailsResult> => {
        const result = await getCart({ id: cart().id })
        return (await result.json()) as QueryCartDetailsResult
      },
      initialData: () => queryClient.getQueryData([QK_GET_CART, cart().id]),
      placeholderData: (prev) => {
        return prev
      },
      select(data): any {
        if (data?.data?.cart) {
          return data?.data?.cart as CartDetails
        }
        return data
      },
    }),

    () => queryClient,
  )
  return {
    queryCartDetails,
  }
}
