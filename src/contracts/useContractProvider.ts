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

import { computed, type ComputedRef } from 'vue'
import type { ContractProvider, Contract } from '@ton/core'
import { useTonConnect } from '../tonconnect/useTonConnect'

/**
 * @see {@link ContractProvider}
 */
export function useContractProvider(
  contract: Contract
): ComputedRef<ContractProvider | null> {
  const { tonClient } = useTonConnect()
  return computed(() => {
    return (
      tonClient.value?.provider(contract.address, contract.init ?? null) ?? null
    )
  })
}
