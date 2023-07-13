import { A, Route } from '@solidjs/router'
import { useOnChainIdentity } from '../onchain-identity'
import { Match, Show, Switch } from 'solid-js'
import { PATHNAME_AVAILABLE_REWARDS } from '../available-rewards'
import { PATHNAME_STATUS_PERKS } from '../status-perks'
import { PATHNAME_EARN_REWARDS } from '../earn-rewards'

const Screen = () => {
  const { mutationCheckConnection, storeOnChainIdentity, mutationSignIn } = useOnChainIdentity()

  return (
    <div class="px-1.5">
      <h1>Dashboard screen</h1>
      <Switch>
        <Match when={mutationCheckConnection.isPending}>...</Match>
        <Match when={storeOnChainIdentity.isWalletClientAvailable === false}>Download Fuel wallet to get started</Match>
        <Match when={!storeOnChainIdentity.connected}>
          <button onClick={async () => await mutationSignIn.mutateAsync()}>
            Connect
            <Show when={mutationSignIn.isPending}>.......</Show>
          </button>
        </Match>
        <Match when={storeOnChainIdentity.connected}>
          <div class="grid gap-4">
            <section>
              <p>
                You have <span class="font-black">1200 points</span>
              </p>
              <p>
                Your rank: <span class="font-black">Gold</span>
              </p>
            </section>

            <section class="shadow border rounded p-3 min-h-24 relative">
              <h2>My available rewards</h2>
              <A
                title="View my available rewards"
                class="absolute z-10 w-full h-full block opacity-0 inset-0"
                href={PATHNAME_AVAILABLE_REWARDS}
              >
                View my available rewards
              </A>
            </section>

            <section class="shadow border rounded p-3 min-h-24 relative">
              <h2>My perks</h2>
              <A
                title="View my perks"
                class="absolute z-10 w-full h-full block opacity-0 inset-0"
                href={PATHNAME_STATUS_PERKS}
              >
                View my perks
              </A>
            </section>
          </div>
        </Match>
      </Switch>
      <div class="mt-4 grid gap-4">
        <section class="shadow border rounded p-3 min-h-24 relative">
          <h2>How to earn rewards</h2>
          <A
            title="Learn more about how to earn rewards"
            class="absolute z-10 w-full h-full block opacity-0 inset-0"
            href={PATHNAME_EARN_REWARDS}
          >
            Learn more about how to earn rewards
          </A>
        </section>
        <section class="shadow border rounded p-3 min-h-24 relative">
          <h2>How to redeem rewards</h2>
        </section>
        <section class="shadow border rounded p-3 min-h-24">
          <h2>Our partner shops</h2>
        </section>
      </div>
    </div>
  )
}

export const PATHNAME_DASHBOARD = '/'
export const ScreenDashboard = () => <Route path={PATHNAME_DASHBOARD} component={Screen} />

export default ScreenDashboard
