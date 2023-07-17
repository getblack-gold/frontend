import { Route } from '@solidjs/router'

const Screen = () => {
  return (
    <>
      <h1>Status and perks screen</h1>
    </>
  )
}

export const PATHNAME_STATUS_PERKS = '/status-perks'
export const ScreenStatus = () => <Route path={PATHNAME_STATUS_PERKS} component={Screen} />

export default ScreenStatus
