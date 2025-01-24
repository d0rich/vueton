import type { FunctionPlugin } from 'vue'
import type { SetupTonConnectProps } from './tonconnect/types'
import { setupTonConnect } from './tonconnect/setupTonConnect'
import TonConnectButton from './tonconnect/TonConnectButton.vue'

export function createVueton(options: SetupTonConnectProps): FunctionPlugin {
  return (app) => {
    setupTonConnect(options)
    app.component('TonConnectButton', TonConnectButton)
  }
}
