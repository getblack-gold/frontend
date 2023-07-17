export interface CartLine {
  id: string
  quantity: number
  cost: {
    amountPerQuantity: {
      amount: string
      currencyCode: string
    }
    subtotalAmount: {
      amount: string
      currencyCode: string
    }
    totalAmount: {
      amount: string
      currencyCode: string
    }
  }
  merchandise: {
    id: string
    title: string
    image: null | {
      url: string
      width: number
      height: string
      altText: string
    }
    product: {
      title: string
      handle: string
    }
  }
}
export interface CartDetails {
  totalQuantity: number
  cost: {
    totalAmount: {
      amount: string
      currencyCode: string
    }
  }
  checkoutUrl: string
  id: string
  lines: {
    nodes: Array<CartLine>
  }
}
export interface QueryCartDetailsResult {
  data: {
    cart: CartDetails
  }
}
