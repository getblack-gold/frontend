import { Route } from '@solidjs/router'

const Screen = () => {
  return (
    <>
      <h1>Earn rewards screen</h1>
    </>
  )
}

export const PATHNAME_EARN_REWARDS = '/earn-rewards'
export const ScreenEarnRewards = () => <Route path={PATHNAME_EARN_REWARDS} component={Screen} />

export default ScreenEarnRewards
