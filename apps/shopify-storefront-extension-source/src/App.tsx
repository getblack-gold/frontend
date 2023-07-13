import { Routes } from '@solidjs/router'
import { ScreenAvailableRewards, ScreenDashboard, ScreenEarnRewards, ScreenStatus } from './features'
import { Popover, PopoverTrigger, PopoverPositioner, PopoverContent, PopoverCloseTrigger } from '@ark-ui/solid'
import { Portal } from 'solid-js/web'
import { OnChainIdentityProvider } from './features'

const Stack = () => {
  return (
    <OnChainIdentityProvider>
      <Routes>
        <ScreenDashboard />
        <ScreenAvailableRewards />
        <ScreenStatus />
        <ScreenEarnRewards />
      </Routes>
    </OnChainIdentityProvider>
  )
}

export const App = () => {
  return (
    <Popover open={true} portalled>
      <PopoverTrigger>
        <button>Open Popover</button>
      </PopoverTrigger>
      <Portal>
        <PopoverPositioner class="max-w-[100dvw] w-full px-3 !min-w-[unset]">
          <PopoverContent class="overflow-hidden max-h-96 overflow-y-auto bg-neutral-50 relative border shadow-lg w-96 max-w-full">
            <div class="relative">
              <div class="pb-8">
                <Stack />
              </div>
              <footer class="sticky bottom-0 w-full left-0 p-2 bg-neutral-100 text-neutral-300 text-xs text-center font-medium">
                Distributed on Blackgold Loyalty Programs
              </footer>
              <PopoverCloseTrigger class="absolute top-2 end-2">
                <button>Close</button>
              </PopoverCloseTrigger>
            </div>
          </PopoverContent>
        </PopoverPositioner>
      </Portal>
    </Popover>
  )
}

export default App
