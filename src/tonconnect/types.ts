/*
 * Copyright 2025 d0rich (Nikolai Dorofeev, dorich2000@gmail.com, https://d0rich.me)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import type { IAxiosRetryConfigExtended } from 'axios-retry'
import type axiosRetry from 'axios-retry'
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

export interface SetupTonConnectProps {
  /**
   * Options to create TonConnect UI instance.
   *
   * @see {@link TonConnectUI}
   * @see {@link TonConnectUiCreateOptions}
   */
  tonConnectUI: TonConnectUiCreateOptions
  /**
   * Options to configure axios-retry.
   *
   * @see {@link axiosRetry}
   * @see {@link IAxiosRetryConfigExtended}
   */
  axiosRetry?: IAxiosRetryConfigExtended
  /**
   * TonClient parameters or a function that returns TonClient parameters.
   * If a function is provided, it will be called once and the result will be used to initialize TonClient.
   * If a function returns a Promise, it will be awaited before initializing TonClient.
   *
   * @see {@link TonClient}
   * @see {@link TonClientParameters}
   */
  tonClient:
    | TonClientParameters
    | (() => TonClientParameters)
    | (() => Promise<TonClientParameters>)
}

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
