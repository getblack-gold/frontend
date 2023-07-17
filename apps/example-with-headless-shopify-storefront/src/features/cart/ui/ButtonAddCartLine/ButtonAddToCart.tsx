/** @jsxImportSource solid-js */

import { Match, Switch } from 'solid-js'
import { useUpdateCart } from '../../hooks/use-update-cart'

export const UI = (props) => {
  const { mutationUpsertCart } = useUpdateCart()
  return (
    <button
      onClick={async () =>
        mutationUpsertCart.mutateAsync(
          {
            id: props.itemId,
            quantity: 1,
          },
          {
            onSuccess(data, variables, context) {
              setTimeout(() => mutationUpsertCart.reset(), 5000)
            },
          },
        )
      }
      disabled={mutationUpsertCart.status === 'pending'}
    >
      <Switch fallback="Add">
        <Match when={mutationUpsertCart?.status === 'pending'}>Adding...</Match>
        <Match when={mutationUpsertCart?.status === 'success'}>Success !</Match>
      </Switch>
    </button>
  )
}

export default UI
