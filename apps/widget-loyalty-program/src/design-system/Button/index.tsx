import { splitProps } from 'solid-js'
import type { JSX } from 'solid-js'

export interface ButtonProps extends JSX.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean
}

export const Button = (props: ButtonProps) => {
  const [local, buttonProps] = splitProps(props, ['children', 'isLoading', 'class'])
  return (
    <button class={local?.class} aria-disabled={buttonProps.disabled || local.isLoading === true} {...buttonProps}>
      {local.isLoading && (
        <span
          classList={{
            'mie-1ex': local?.class?.includes('rounded-full'),
          }}
          class="animate-spin"
        />
      )}
      {local.children}
    </button>
  )
}

export default Button
