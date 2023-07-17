import { Routes, A, useLocation } from '@solidjs/router'
import {
  PATHNAME_DASHBOARD,
  ScreenAvailableRewards,
  ScreenDashboard,
  ScreenEarnRewards,
  ScreenStatus,
} from './features'
import { Popover, PopoverTrigger, PopoverPositioner, PopoverContent } from '@ark-ui/solid'
import { Match, Portal, Show, Switch } from 'solid-js/web'
import { OnChainIdentityProvider, useOnChainIdentity } from './features'
import { BiRegularArrowBack } from 'solid-icons/bi'
import { createVisibilityObserver } from '@solid-primitives/intersection-observer'

const LayoutStack = (props) => {
  let ref
  const { storeOnChainIdentity } = useOnChainIdentity()
  const location = useLocation()
  const visible = createVisibilityObserver({ threshold: 0.5 })(() => ref)

  return (
    <>
      <div class="absolute inset-0 w-full h-48 pointer-events-none" ref={ref} />
      <Switch>
        <Match when={location.pathname === PATHNAME_DASHBOARD}>
          <div
            classList={{
              '-translate-y-full': visible(),
              'translate-y-0 sticky inset-0 w-full z-10 bg-neutral-3 shadow-sm border-b border-neutral-5':
                !visible() && storeOnChainIdentity?.connected,
            }}
            class="transition-all text-sm py-2 px-3"
          >
            <Show when={storeOnChainIdentity?.connected && !visible()}>
              <span class="">{storeOnChainIdentity?.loyalty?.redeemablePointsAmount} available points</span>
            </Show>
          </div>
        </Match>
        <Match when={location.pathname !== PATHNAME_DASHBOARD}>
          <div class="mb-3 flex justify-between items-center bg-neutral-3 shadow-sm border-b border-neutral-5 py-2 px-1.5 sticky inset-0 w-full z-10">
            <A class="rtl:rotate-180" href={PATHNAME_DASHBOARD}>
              <span class="sr-only">Go back to dashboard</span>
              <BiRegularArrowBack />
            </A>
            <Show when={storeOnChainIdentity?.connected}>
              <span class="px-3 text-sm me-auto">
                {storeOnChainIdentity?.loyalty?.redeemablePointsAmount} available points
              </span>
            </Show>
          </div>
        </Match>
      </Switch>
      <div class="px-1.5">{props.children}</div>
    </>
  )
}
const Stack = () => {
  return (
    <OnChainIdentityProvider>
      <LayoutStack>
        <Routes>
          <ScreenDashboard />
          <ScreenAvailableRewards />
          <ScreenStatus />
          <ScreenEarnRewards />
        </Routes>
      </LayoutStack>
    </OnChainIdentityProvider>
  )
}

export const App = () => {
  return (
    <Popover
      portalled
      positioning={{
        placement: 'top-end',
      }}
    >
      <PopoverTrigger class="relative z-10 bg-neutral-12 text-neutral-1 py-1.5 px-3 rounded-full font-semibold">
        Open Popover
      </PopoverTrigger>
      <Portal>
        <PopoverPositioner class="flex justify-end z-10 max-w-[97.5dvw] w-full px-3 !min-w-[unset]">
          <PopoverContent class="overflow-x-hidden h-[100dh] w-80 max-w-[95dw] sm:h-[60vh] overflow-y-auto bg-neutral-1 relative border shadow-lg ">
            <div class="relative h-full grow flex flex-col">
              <div class="pb-8 grow">
                <Stack />
              </div>
              <div class="border-t border-neutral-4 grid gap-1.5 sticky bottom-0 w-full left-0 p-2 bg-neutral-1 text-neutral-9 text-[0.685em] text-center font-medium">
                <footer>Distributed on Blackgold Loyalty Programs</footer>
              </div>
            </div>
          </PopoverContent>
        </PopoverPositioner>
      </Portal>
    </Popover>
  )
}

export default App
