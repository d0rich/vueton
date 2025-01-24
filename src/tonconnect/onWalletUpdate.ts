import { watch } from 'vue'
import { useTonConnect } from './useTonConnect'

/**
 * A hook to watch for changes in the connected wallet.
 * @param callback An action to perform when user changes the connected wallet.
 * @returns A function to stop watching for changes.
 */
export function onWalletUpdate(callback: (wallet: string | null) => void) {
  const { tonAddress } = useTonConnect()
  return watch(tonAddress, () => callback(tonAddress.value))
}
