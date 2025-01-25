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
