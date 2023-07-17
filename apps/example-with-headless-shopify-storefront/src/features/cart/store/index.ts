import { persistentAtom } from '@nanostores/persistent'
import { QueryClient } from '@tanstack/query-core'

interface StoreCart {
  id: string
  checkoutUrl: string
  totalQuantity: number
  lines: { nodes: Array<any> }
  cost: {
    totalAmount: {
      amount: string
      currencyCode: string
    }
  }
}

export const INITIAL_STATE = {
  id: '',
  checkoutUrl: '',
  totalQuantity: 0,
  lines: { nodes: [] },
  cost: { totalAmount: { amount: '', currencyCode: '' } },
}

export const storeCart = persistentAtom<StoreCart>('cart', INITIAL_STATE, {
  encode: JSON.stringify,
  decode: JSON.parse,
})

export const queryClient = new QueryClient()
