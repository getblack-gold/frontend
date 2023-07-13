import { Route } from '@solidjs/router'

const Screen = () => {
  return (
    <>
      <h1>Dashboard screen</h1>
    </>
  )
}

export const PATHNAME_DASHBOARD = '/'
export const ScreenDashboard = () => <Route path={PATHNAME_DASHBOARD} component={Screen} />

export default ScreenDashboard
