import { createMutation } from '@tanstack/solid-query'
import { queryClient, storeCart } from '../store'
import { QK_GET_CART, addItemsToCart, createCart, removeItemsFromCart } from '../services'
import type { CartDetails } from '../services/types'
export function useUpdateCart() {
  const mutationUpsertCart = createMutation(
    () => ({
      client: queryClient,
      mutationFn: async (item: { id: string; quantity: number }) => {
        const cartId = storeCart.get().id
        if (!cartId || cartId === '') {
          const responseCreateCart = await createCart({ id: item.id, quantity: item.quantity })
          const { data } = await responseCreateCart.json()
          const updatedCartData = data?.cartCreate?.cart

          return updatedCartData
        } else {
          const responseUpdatedCartData = await addItemsToCart({
            cartId,
            merchandiseId: item.id,
            quantity: item.quantity,
          })
          const { data } = await responseUpdatedCartData.json()
          const updatedCartData = data?.cartLinesAdd?.cart
          return updatedCartData
        }
      },
      onMutate: async (item: { id: string; quantity: number }) => {
        await queryClient.cancelQueries([QK_GET_CART, storeCart.get().id])
      },
      onSuccess: (data: CartDetails, variables, context) => {
        storeCart.set(data)
        queryClient.invalidateQueries([QK_GET_CART, storeCart.get().id])
      },
    }),
    () => queryClient,
  )

  const mutationDeleteLinesFromCart = createMutation(
    () => ({
      client: queryClient,
      mutationFn: async (variables: { lineIds: Array<string> }) => {
        const cartId = storeCart.get().id
        const responseUpdatedCartData = await removeItemsFromCart({ cartId, lineIds: variables.lineIds })
        const { data } = await responseUpdatedCartData.json()
        const updatedCartData = data?.cartLinesRemove?.cart
        return updatedCartData
      },
      onMutate: async (variables: { lineIds: Array<string> }) => {
        await queryClient.cancelQueries([QK_GET_CART, storeCart.get().id])
      },
      onSuccess: (data: CartDetails, variables, context) => {
        storeCart.set(data)
        queryClient.invalidateQueries([QK_GET_CART, storeCart.get().id])
      },
    }),
    () => queryClient,
  )
  return {
    mutationDeleteLinesFromCart,
    mutationUpsertCart,
  }
}
