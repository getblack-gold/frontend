import type { Component } from 'solid-js'
import { Routes } from '@solidjs/router'
import { ScreenAvailableRewards, ScreenDashboard, ScreenEarnRewards, ScreenStatus } from './features'

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
  return <Stack />
}

export default App
