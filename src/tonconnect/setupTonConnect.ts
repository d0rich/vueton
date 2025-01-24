import axiosRetry from 'axios-retry'
import { ref, computed, type Ref } from 'vue'
import { TonConnectUI, toUserFriendlyAddress } from '@tonconnect/ui'
import type { SenderArguments, Sender } from '@ton/core'
import { Address } from '@ton/core/dist/address/Address'
import { CHAIN } from '@tonconnect/protocol'
import {
  TonClient,
  type TonClientParameters
} from '@ton/ton/dist/client/TonClient'
import type {
  SetupTonConnectProps,
  Network,
  SetupTonConnectReturn
} from './types'
import { setGlobalTonConnect } from '../store'

export function setupTonConnect<T extends SetupTonConnectProps>(
  props: T
): SetupTonConnectReturn {
  // useTonConnectUI replacement
  const tonConnect = new TonConnectUI(props.tonConnectUI)

  // useTonWallet replacement
  const tonWallet = ref(tonConnect.wallet)
  const cancelWalletSubscription = tonConnect.onStatusChange(
    (status) => (tonWallet.value = status)
  )

  const tonNetwork = computed<Network | null>(() => {
    const chain = tonWallet.value?.account.chain
    if (chain === CHAIN.MAINNET) return 'mainnet'
    if (chain === CHAIN.TESTNET) return 'testnet'
    return null
  })

  // useTonAddress replacement
  const tonAddress = computed(() => tonWallet.value?.account.address ?? null)
  const tonAddressUserFriendly = computed(() => {
    if (tonAddress.value) {
      return toUserFriendlyAddress(
        tonAddress.value,
        tonNetwork.value === 'testnet'
      )
    }
    return null
  })

  // useIsConnectionRestored replacement
  const isConnected = ref(false)
  tonConnect.connectionRestored.finally(() => (isConnected.value = true))

  let tonClientInitProps: TonClientParameters | null = null
  let tonClientPropsPromise: Promise<TonClientParameters> | null = null
  if (typeof props.tonClient === 'function') {
    const functionResult = props.tonClient()
    if (functionResult instanceof Promise) {
      tonClientPropsPromise = functionResult
    } else {
      tonClientInitProps = functionResult
    }
  } else {
    tonClientInitProps = props.tonClient
  }

  const tonClient = ref(
    tonClientInitProps === null ? null : new TonClient(tonClientInitProps)
  ) as Ref<TonClient | null>

  function setupAxiosRetry() {
    if (!tonClient?.value?.api?.axios) {
      console.warn('TonClient axios instance is not available')
      return
    }
    if (props.axiosRetry) {
      axiosRetry(tonClient.value.api.axios, props.axiosRetry)
    }
  }

  if (tonClientPropsPromise instanceof Promise) {
    tonClientPropsPromise.then((config) => {
      tonClient.value = new TonClient(config)
      setupAxiosRetry()
    })
  } else if (tonClient.value) {
    if (props.axiosRetry) {
      setupAxiosRetry()
    }
  }

  const result: SetupTonConnectReturn = {
    tonConnect,
    tonClient,
    isConnected,
    tonWallet,
    tonAddress,
    tonAddressUserFriendly,
    tonNetwork,
    sendTransaction,
    cleanupSubscriptions: cleanup,
    sender: computed<Sender>(() => {
      return {
        send: async (args) => {
          await sendTransaction(args)
        },
        address: tonAddress.value ? Address.parse(tonAddress.value) : undefined
      }
    })
  }

  setGlobalTonConnect(result as SetupTonConnectReturn)

  return result

  // Actions

  /**
   * Wrapper to send transaction using TonConnectUI with core interface
   */
  function sendTransaction(args: SenderArguments) {
    return tonConnect.sendTransaction({
      messages: [
        {
          address: args.to.toString(),
          amount: args.value.toString(),
          payload: args.body?.toBoc().toString('base64')
        }
      ],
      validUntil: Date.now() + 5 * 60 * 1000 // 5 minutes for user to approve
    })
  }

  /**
   * Cancel all subscriptions for TonConnectUI
   */
  function cleanup() {
    cancelWalletSubscription()
  }
}
