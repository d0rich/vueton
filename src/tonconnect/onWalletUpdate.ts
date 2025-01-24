import { watch } from 'vue'
import { useTonConnect } from './useTonConnect'

export function onWalletUpdate(callback: (wallet: string | null) => void) {
  const { tonAddress } = useTonConnect()
  return watch(tonAddress, () => callback(tonAddress.value))
}
