import type { TonConnectUI } from '@tonconnect/ui'
import type { TonClient } from '@ton/ton/dist/client/TonClient'
import type { Network } from './types'
import { useTonConnect } from './useTonConnect'

/**
 * Waits until {@link TonConnectUI} is connected.
 *
 * @returns A promise that resolves to {@link TonClient} and {@link Network}.
 *
 * @see {@link TonConnectUI.connectionRestored}
 */
export async function awaitConnected() {
  const { tonClient, tonNetwork, tonConnect } = useTonConnect()
  await tonConnect.connectionRestored
  return { tonClient, tonNetwork }
}
