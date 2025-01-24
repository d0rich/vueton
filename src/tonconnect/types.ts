import type { IAxiosRetryConfigExtended } from 'axios-retry'
import type { TonConnectUiCreateOptions } from '@tonconnect/ui'
import type { TonClientParameters } from '@ton/ton/dist/client/TonClient'
import type { Ref, ComputedRef } from 'vue'
import type { SenderArguments, Sender } from '@ton/core'
import type { TonConnectUI, SendTransactionResponse } from '@tonconnect/ui'
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
export type SetupTonConnectReturn<
  T extends SetupTonConnectProps = SetupTonConnectPropsAsync
> = {
  tonConnect: TonConnectUI
  tonClient: T extends SetupTonConnectPropsAsync
    ? Ref<TonClient | null>
    : Ref<TonClient>
  isConnected: Ref<boolean>
  tonWallet: Ref<TonConnectUI['wallet']>
  tonAddress: ComputedRef<string | null>
  tonAddressUserFriendly: ComputedRef<string | null>
  tonNetwork: ComputedRef<Network | null>
  sendTransaction: (args: SenderArguments) => Promise<SendTransactionResponse>
  cleanupSubscriptions: () => void
  sender: ComputedRef<Sender>
}
