import { A, Route } from '@solidjs/router'
import { Match, Show, Switch } from 'solid-js'
import { BsBoxArrowInRight, BsChevronRight } from 'solid-icons/bs'
import { PATHNAME_AVAILABLE_REWARDS } from '../available-rewards'
import { PATHNAME_STATUS_PERKS } from '../status-perks'
import { PATHNAME_EARN_REWARDS } from '../earn-rewards'
import { useOnChainIdentity } from '../onchain-identity'

const Screen = () => {
  const { mutationCheckConnection, mutationSignOut, storeOnChainIdentity, mutationSignIn } = useOnChainIdentity()

  return (
    <div class="px-1.5">
      <Switch>
        <Match when={mutationCheckConnection.isPending}>...</Match>
        <Match when={storeOnChainIdentity.isWalletClientAvailable === false}>Download Fuel wallet to get started</Match>
        <Match when={!storeOnChainIdentity.connected}>
          <section class="flex flex-col bg-neutral-2 border border-neutral-4 rounded py-3 px-6">
            <div class="pb-3 leading-snug text-neutral-11 text-xs text-center grid gap-3">
              <p>Join our loyalty program to unlock premium rewards and exclusive perks !</p>
              <p>
                The only requirement is to install the{' '}
                <span class="font-medium underline text-neutral-12">Fuel wallet extension</span>
              </p>
            </div>
            <button
              class="text-sm w-1/2 rounded-full bg-neutral-12 text-neutral-1 font-bold p-1.5 mx-auto"
              onClick={async () => await mutationSignIn.mutateAsync()}
            >
              Join
              <Show when={mutationSignIn.isPending}>.......</Show>
            </button>
          </section>
        </Match>
        <Match when={storeOnChainIdentity.connected}>
          <div class="grid gap-4">
            <section class="aspect-video flex flex-col gap-1.5 justify-end pb-3 -mx-3 -mt-4 bg-neutral-2 text-neutral-12 text-lg border-b px-3 border-neutral-4 rounded">
              <button title="Sign out" onClick={() => mutationSignOut.mutate()} class="absolute end-2 top-2 ">
                <span class="sr-only">Sign out</span>
                <BsBoxArrowInRight class="rtl:rotate-180" />
              </button>

              <p class="text-neutral-11 absolute top-0">
                <span class="pe-1 text-[0.575em]">Status:&nbsp;</span>
                <span class="font-bold text-sm">gold</span>
              </p>
              <p class="leading-none flex flex-col">
                <span class="text-neutral-11 pb-0.5 text-[0.575em]">You can spend</span>
                <span class="text-neutral-12 font-black text-2xl">
                  {storeOnChainIdentity.loyalty?.redeemablePointsAmount} points
                </span>
              </p>
            </section>

            <section class="text-sm flex justify-between shadow border rounded p-3 min-h-24 relative">
              <h2>My available rewards</h2>
              <BsChevronRight class="rtl:rotate-180" />
              <A
                title="View my available rewards"
                class="absolute z-10 w-full h-full block opacity-0 inset-0"
                href={PATHNAME_AVAILABLE_REWARDS}
              >
                View my available rewards
              </A>
            </section>

            <section class="text-sm flex justify-between shadow border rounded p-3 min-h-24 relative">
              <h2>My perks</h2>
              <BsChevronRight class="rtl:rotate-180" />

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
        <section class="text-sm flex justify-between shadow border rounded p-3 min-h-24 relative">
          <h2>How to earn rewards</h2>
          <BsChevronRight class="rtl:rotate-180" />

          <A
            title="Learn more about how to earn rewards"
            class="absolute z-10 w-full h-full block opacity-0 inset-0"
            href={PATHNAME_EARN_REWARDS}
          >
            Learn more about how to earn rewards
          </A>
        </section>
        <section class="text-sm flex justify-between shadow border rounded p-3 min-h-24 relative">
          <h2>How to redeem rewards</h2>
          <BsChevronRight class="rtl:rotate-180" />
        </section>
        <section class="text-sm flex justify-between shadow border rounded p-3 min-h-24">
          <h2>Our partner shops</h2>
          <BsChevronRight class="rtl:rotate-180" />
        </section>
      </div>
    </div>
  )
}

export const PATHNAME_DASHBOARD = '/'
export const ScreenDashboard = () => <Route path={PATHNAME_DASHBOARD} component={Screen} />

export default ScreenDashboard
