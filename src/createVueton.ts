import type { FunctionPlugin } from 'vue'
import type { SetupTonConnectProps } from './tonconnect/types'
import { setupTonConnect } from './tonconnect/setupTonConnect'
import TonConnectButton from './tonconnect/TonConnectButton.vue'

/**
 * A constructor for a Vueton plugin
 *
 * @param options setup options
 * @returns A Vueton plugin
 */
export function createVueton(options: SetupTonConnectProps): FunctionPlugin {
  return (app) => {
    setupTonConnect(options)
    app.component('TonConnectButton', TonConnectButton)
  }
}
