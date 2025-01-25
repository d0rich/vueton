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
