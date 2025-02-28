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
