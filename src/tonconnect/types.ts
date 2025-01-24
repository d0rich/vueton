import type { IAxiosRetryConfigExtended } from 'axios-retry'
import type {
  TonConnectUI,
  SendTransactionResponse,
  TonConnectUiCreateOptions,
  Account,
  toUserFriendlyAddress
} from '@tonconnect/ui'
import type { TonClientParameters } from '@ton/ton/dist/client/TonClient'
import type { Ref, ComputedRef } from 'vue'
import type { SenderArguments, Sender } from '@ton/core'
import type { TonClient } from '@ton/ton/dist/client/TonClient'

export type Network = 'mainnet' | 'testnet'

interface SetupTonConnectPropsCommon {
  tonConnectUI: TonConnectUiCreateOptions
  axiosRetry?: IAxiosRetryConfigExtended
}

export interface SetupTonConnectPropsSync extends SetupTonConnectPropsCommon {
  tonClient: TonClientParameters | (() => TonClientParameters)
}

export interface SetupTonConnectPropsAsync extends SetupTonConnectPropsCommon {
  tonClient: () => Promise<TonClientParameters>
}

export type SetupTonConnectProps =
  | SetupTonConnectPropsSync
  | SetupTonConnectPropsAsync
export type SetupTonConnectReturn = {
  /**
   * TonConnect UI instance.
   *
   * @see {@link TonConnectUI}
   */
  tonConnect: TonConnectUI
  /**
   * TonClient instance wrapped in Vue ref.
   * May be `null` you initialized with an async function and it is not completed yet.
   *
   * @see {@link TonClient}
   * @see {@link Ref}
   */
  tonClient: Ref<TonClient | null>
  /**
   * Is plugin is connected to a wallet application / browser extension.
   *
   * @see {@link TonConnectUI.connectionRestored}
   */
  isConnected: Ref<boolean>
  /**
   * Currently connected user wallet.
   *
   * @see {@link TonConnectUI.wallet}
   */
  tonWallet: Ref<TonConnectUI['wallet']>
  /**
   * TON address of the currently connected wallet in hex format.
   *
   * @see {@link Account.address}
   */
  tonAddress: ComputedRef<string | null>
  /**
   * TON address of the currently connected wallet in user-friendly format.
   *
   * @see {@link toUserFriendlyAddress}
   */
  tonAddressUserFriendly: ComputedRef<string | null>
  /**
   * Network of the connected wallet.
   *
   * @see {@link Network}
   */
  tonNetwork: ComputedRef<Network | null>
  /**
   * Wrapper to send transaction using TonConnectUI with core interface.
   *
   * @see {@link TonConnectUI.sendTransaction}
   * @see {@link SenderArguments}
   */
  sendTransaction: (args: SenderArguments) => Promise<SendTransactionResponse>
  /**
   * Cleanup all subscriptions and listeners under the hood.
   */
  cleanupSubscriptions: () => void
  /**
   * @see {@link Sender}
   */
  sender: ComputedRef<Sender>
}
