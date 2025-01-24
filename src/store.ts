import type { SetupTonConnectReturn } from './tonconnect/types'

const globalValues = {
  tonConnect: null as SetupTonConnectReturn | null
}

export function setGlobalTonConnect(tonConnect: SetupTonConnectReturn) {
  globalValues.tonConnect = tonConnect
}

export function getGlobalTonConnect(): SetupTonConnectReturn {
  if (!globalValues.tonConnect) {
    throw new Error('Vueton plugin is not initialized, did you install it?')
  }
  return globalValues.tonConnect
}
