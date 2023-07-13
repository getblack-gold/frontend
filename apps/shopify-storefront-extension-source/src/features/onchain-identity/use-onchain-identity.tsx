import { createContext, useContext, onMount } from 'solid-js'
import { createStore } from 'solid-js/store'
import { QueryClient, createMutation } from '@tanstack/solid-query'
import type { CreateMutationResult } from '@tanstack/solid-query'

export const queryClient = new QueryClient()
const OnChainIdentityContext = createContext<{
  storeOnChainIdentity: {
    isWalletClientAvailable: boolean
    provider: any
    connected: boolean
    accounts: any[]
    currentAccount: any
  }
  mutationSignIn: CreateMutationResult<string | undefined, Error, void, unknown>
  mutationCheckConnection: CreateMutationResult<boolean, Error, void, unknown>
}>()

const DEFAULT_STATE = {
  isWalletClientAvailable: false,
  provider: undefined,
  connected: false,
  accounts: [],
  currentAccount: undefined,
}

export function OnChainIdentityProvider(props) {
  const [storeOnChainIdentity, setStoreOnchainIdentity] = createStore(DEFAULT_STATE)
  onMount(async () => {
    const fuel = window?.fuel
    if (fuel) {
      setStoreOnchainIdentity({
        ...storeOnChainIdentity,
        provider: fuel,
        isWalletClientAvailable: true,
      })
    }
    fuel?.on(fuel.events.connection, async () => {
      const connected = await fuel.isConnected()
      setStoreOnchainIdentity({
        ...storeOnChainIdentity,
        connected,
      })
    })

    fuel?.on(fuel.events.accounts, (accounts: Array<string>) => {
      setStoreOnchainIdentity({
        ...storeOnChainIdentity,
        accounts,
      })
    })

    /**
     * Gets triggered when the user switches wallet
     */
    fuel?.on(fuel.events.currentAccount, (account: string) => {
      setStoreOnchainIdentity({
        ...storeOnChainIdentity,
        currentAccount: account,
      })
    })

    if (fuel) await mutationCheckConnection.mutateAsync()
  })

  const mutationCheckConnection = createMutation(
    () => ({
      mutationFn: async (): Promise<boolean> => {
        return await window.fuel.isConnected()
      },
    }),
    () => queryClient,
  )

  const mutationSignIn = createMutation(
    () => ({
      mutationFn: async (): Promise<string | undefined> => {
        if (!storeOnChainIdentity.connected) await window.fuel.connect()
        return await window.fuel.currentAccount()
      },
      onSuccess(data) {
        if (data) {
          setStoreOnchainIdentity({
            ...storeOnChainIdentity,
            connected: true,
            currentAccount: data,
          })
        }
      },
    }),
    () => queryClient,
  )

  return (
    <OnChainIdentityContext.Provider
      value={{
        storeOnChainIdentity,
        mutationCheckConnection,
        mutationSignIn,
      }}
    >
      {props.children}
    </OnChainIdentityContext.Provider>
  )
}

export function useOnChainIdentity() {
  return useContext(OnChainIdentityContext)
}
