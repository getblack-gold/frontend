import {
  Popover,
  PopoverContent,
  PopoverCloseTrigger,
  PopoverTitle,
  PopoverTrigger,
  PopoverPositioner,
  PopoverDescription,
} from '@ark-ui/solid'
import { useStore } from '@nanostores/solid'
import { For, Match, Show, Switch } from 'solid-js'
import { useUpdateCart } from '../../hooks/use-update-cart'
import { useCartDetails } from '../../hooks/use-cart-details'
import type { CartLine } from '../../services/types'

export const PopoverCart = () => {
  const { mutationDeleteLinesFromCart } = useUpdateCart()
  const { queryCartDetails } = useCartDetails()
  return (
    <Popover open={true}>
      <PopoverTrigger class="relative" disabled={queryCartDetails.isLoading}>
        <div
          classList={{
            'bg-icon-cart-outline': queryCartDetails.data?.totalQuantity === 0 || !queryCartDetails.data?.totalQuantity,
            'bg-icon-cart-fill': queryCartDetails.data?.totalQuantity > 0,
          }}
          class="bg-contain w-6 h-6  block"
        />
        <Show when={queryCartDetails.data?.totalQuantity}>
          <span class="text-slate-50 absolute left-0 bottom-0.5 w-full h-4 flex items-center text-xs font-bold justify-center">
            {queryCartDetails.data?.totalQuantity}{' '}
          </span>
        </Show>
        <span class="sr-only">My shopping bag</span>
      </PopoverTrigger>
      <PopoverPositioner>
        <PopoverContent class="bg-slate-50 border-slate-600 shadow-lg w-72">
          <PopoverTitle>Shopping bag</PopoverTitle>
          <PopoverDescription>Your shopping bag</PopoverDescription>
          <Switch fallback={<p>Empty</p>}>
            <Match when={queryCartDetails?.data?.totalQuantity > 0}>
              <span>
                My bag:{' '}
                <span>
                  {queryCartDetails?.data?.totalQuantity} item{queryCartDetails?.data?.totalQuantity > 1 && 's'}
                </span>
              </span>
              <ul class="max-h-64 grid grid-cols-1 gap-4 overflow-y-auto">
                <For each={queryCartDetails?.data?.lines?.nodes}>
                  {(line: CartLine) => {
                    return (
                      <li>
                        <article class="grid grid-cols-2 gap-2">
                          <div class="h-24 w-24 bg-neutral-400">
                            <img
                              height="96"
                              width="auto"
                              loading="lazy"
                              class="h-full w-auto object-contain"
                              src={line.merchandise?.image?.url}
                            />
                          </div>
                          <div class="flex flex-col">
                            <p>
                              {new Intl.NumberFormat(undefined, {
                                style: 'currency',
                                currency: line.cost.totalAmount.currencyCode,
                              }).format(parseFloat(line.cost.totalAmount.amount))}
                            </p>
                            <h1>{line.merchandise.product.title}</h1>
                            <p>
                              <abbr title="Quantity">Qty</abbr>: {line.quantity}
                            </p>
                          </div>
                          <button
                            classList={{
                              'animate-pulse': mutationDeleteLinesFromCart.isPending,
                            }}
                            disabled={mutationDeleteLinesFromCart.isPending}
                            onClick={() => mutationDeleteLinesFromCart.mutateAsync({ lineIds: [line.id] })}
                          >
                            Delete
                          </button>
                        </article>
                      </li>
                    )
                  }}
                </For>
              </ul>
              <div class="py-2">
                <span>Subtotal:</span>
                <span>
                  {new Intl.NumberFormat(undefined, {
                    style: 'currency',
                    currency: queryCartDetails?.data?.cost?.totalAmount?.currencyCode as string,
                  }).format(parseFloat(queryCartDetails?.data?.cost?.totalAmount?.amount))}
                </span>
              </div>
              <div>
                <a href={queryCartDetails?.data?.checkoutUrl}>Checkout</a>
              </div>
            </Match>
          </Switch>
          <PopoverCloseTrigger>
            <button>Close</button>
          </PopoverCloseTrigger>
        </PopoverContent>
      </PopoverPositioner>
    </Popover>
  )
}

export default PopoverCart
