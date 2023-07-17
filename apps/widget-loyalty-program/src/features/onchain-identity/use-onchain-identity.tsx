import { createContext, useContext, onMount, createEffect } from 'solid-js'
import { createStore } from 'solid-js/store'
import { QueryClient, createMutation, createQuery } from '@tanstack/solid-query'
import type { CreateMutationResult } from '@tanstack/solid-query'
import type { Fuel } from '@fuel-wallet/sdk'

declare global {
  interface Window {
    fuelet: Fuel | undefined
  }
}
interface OnChainIdentity {
  /** Whether the wallet client (provider) is available */
  isWalletClientAvailable: boolean

  /** Responsible for enabling connectivity with Fuel network */
  provider: Fuel | undefined

  /** Wheter the wallet is connected */
  connected: boolean

  /** List of connected accounts */
  accounts: string[]

  /** The current connected account */
  currentAccount: string | undefined

  loyalty: {
    /** Current user's amount of redeemable loyalty points */
    redeemablePointsAmount: number

    /** Current user's amount of points since they started using the program*/
    historicalPointsAmount: number
  }
}

export const queryClient = new QueryClient()

/**
 * SolidJS context for managing on-chain identity state and operations
 */
const OnChainIdentityContext = createContext<{
  /** SolidJS store that contains data related to the on-chain identity state and operations */ 
  storeOnChainIdentity: OnChainIdentity
  /** Sign the current user in */
  mutationSignIn: CreateMutationResult<string | undefined, Error, void, unknown>

  /** Check wheter or not the current user is connected */
  mutationCheckConnection: CreateMutationResult<boolean, Error, void, unknown>

  /** Sign the current user out */
  mutationSignOut: CreateMutationResult<boolean, Error, void, unknown>
}>()

/**
 * On-chain identity store default state
 */
const DEFAULT_STATE: OnChainIdentity = {
  isWalletClientAvailable: false,
  provider: undefined,
  connected: false,
  accounts: [],
  currentAccount: undefined,
  loyalty: {
    redeemablePointsAmount: 0,
    historicalPointsAmount: 0,
  },
}

export function OnChainIdentityProvider(props) {
  const [storeOnChainIdentity, setStoreOnchainIdentity] = createStore(DEFAULT_STATE)

  // Initializing our identity store and hook-in
  onMount(async () => {
    //
    /**
     * our web3 provider is Fuelet web extension as the Fuel wallet doesn't work in Shopify theme
     * @see Fuelet web extension https://fuelet.app/
     * @see Fuelet extension docs https://phase-caution-3d6.notion.site/Wallet-API-bea166cbf35045e296b90708d909eaba
     */
    const fuel = window?.fuelet
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
        const provider = storeOnChainIdentity?.provider
        return await provider?.isConnected()
      },
    }),
    () => queryClient,
  )

  const mutationSignIn = createMutation(
    () => ({
      mutationFn: async (): Promise<string | undefined> => {
        const provider = storeOnChainIdentity?.provider
        if (!storeOnChainIdentity.connected) await provider?.connect()
        return await provider?.currentAccount()
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

  const mutationSignOut = createMutation(
    () => ({
      mutationFn: async (): Promise<boolean> => {
        const provider = storeOnChainIdentity?.provider

        return await provider?.disconnect()
      },
      onSuccess(data) {
        if (data) {
          setStoreOnchainIdentity({
            ...storeOnChainIdentity,
            connected: false,
            accounts: [],
            currentAccount: undefined,
            loyalty: {
              redeemablePointsAmount: 0,
              historicalPointsAmount: 0,
            },
          })
        }
      },
    }),
    () => queryClient,
  )

  /**
   * Query for retrieving current user loyalty information from the smart contract
   */
  const queryGetUserLoyalty = createQuery(
    () => ({
      enabled: storeOnChainIdentity?.connected ? true : false,
      queryKey: ['loyalty', storeOnChainIdentity?.currentAccount],

      queryFn: async () => {
        /**
         * @todo fetch loyalty points of the current user using onchain function
         */

        const result = {
          redeemablePointsAmount: 30,
          historicalPointsAmount: 1000,
        }

        return result
      },
    }),
    () => queryClient,
  )

  /**
   * Mutation for updating user loyalty information
   */
  const mutationUpdateUserLoyalty = createMutation(
    () => ({
      mutationFn: async (loyalty: { redeemablePointsAmount: number; historicalPointsAmount: number }) => {
        setStoreOnchainIdentity({
          ...storeOnChainIdentity,
          loyalty,
        })
      },
    }),
    () => queryClient,
  )

  createEffect(() => {
    if (storeOnChainIdentity?.currentAccount && queryGetUserLoyalty?.isSuccess && queryGetUserLoyalty?.data)
      // mutate user loyalty information when wallet is connected
      mutationUpdateUserLoyalty.mutate(queryGetUserLoyalty?.data)
  })
  return (
    <OnChainIdentityContext.Provider
      value={{
        storeOnChainIdentity,
        mutationCheckConnection,
        mutationSignIn,
        mutationSignOut,
      }}
    >
      {props.children}
    </OnChainIdentityContext.Provider>
  )
}

/**
 * Hook for accessing the on-chain identity context.
 *
 * @returns {OnChainIdentityContextValue} On-chain identity context value.
 */
export function useOnChainIdentity() {
  return useContext(OnChainIdentityContext)
}
