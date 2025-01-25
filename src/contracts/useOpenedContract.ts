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

import { computed, type Ref, type ComputedRef, isRef } from 'vue'
import type { TonClient } from '@ton/ton'
import type { OpenedContract, Contract } from '@ton/core'
import { useTonConnect } from '../tonconnect/useTonConnect'

/**
 * Syncronously opens a contract.
 *
 * @param contract A contract or a ref to a contract to open.
 * @returns A {@link ComputedRef} to the opened contract.
 *  Maybe `null` if the contract is not available yet or if {@link TonClient} is not initialized yet.
 * @see {@link OpenedContract}
 */
export function useOpenedContract<T extends Contract>(
  contract: T | Ref<T | null>
): ComputedRef<OpenedContract<T> | null> {
  const { tonClient } = useTonConnect()
  return computed(() => {
    if (isRef(contract)) {
      if (!contract.value) return null
      contract = contract.value
    }
    if (!tonClient.value) return null
    return tonClient.value.open(contract)
  })
}
