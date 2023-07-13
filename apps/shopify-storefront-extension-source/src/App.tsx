import type { Component } from 'solid-js'
import { Routes } from '@solidjs/router'
import { ScreenAvailableRewards, ScreenDashboard, ScreenEarnRewards, ScreenStatus } from './features'
import {
  Popover,
  PopoverTrigger,
  PopoverPositioner,
  PopoverContent,
  PopoverTitle,
  PopoverDescription,
  PopoverCloseTrigger,
} from '@ark-ui/solid'
import { Portal } from 'solid-js/web'

const Stack = () => {
  return (
    <Routes>
      <ScreenDashboard />
      <ScreenEarnRewards />
      <ScreenAvailableRewards />
      <ScreenStatus />
    </Routes>
  )
}

const App: Component = () => {
  return (
    <Popover open={true} portalled>
      <PopoverTrigger>
        <button>Open Popover</button>
      </PopoverTrigger>
      <Portal>
        <PopoverPositioner class="max-w-[100dvw] w-full px-3 !min-w-[unset]">
          <PopoverContent class="border shadow-lg w-96 max-w-full">
            <Stack />
            <PopoverCloseTrigger>
              <button>Close</button>
            </PopoverCloseTrigger>
          </PopoverContent>
        </PopoverPositioner>
      </Portal>
    </Popover>
  )
}

export default App
