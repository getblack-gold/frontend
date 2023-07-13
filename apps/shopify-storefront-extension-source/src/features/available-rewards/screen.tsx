import { Route } from '@solidjs/router'

const Screen = () => {
  return (
    <>
      <h1>Available rewards screen</h1>
    </>
  )
}

export const PATHNAME_AVAILABLE_REWARDS = '/available-rewards'
export const ScreenAvailableRewards = () => <Route path={PATHNAME_AVAILABLE_REWARDS} component={Screen} />

export default ScreenAvailableRewards
