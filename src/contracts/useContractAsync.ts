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

import type { Ref } from 'vue'
import type { Contract, OpenedContract } from '@ton/core'
import type { useOpenedContract } from './useOpenedContract'

/**
 * Waits for a contract to be opened. Might be useful with {@link useOpenedContract}.
 *
 * @param contract A ref to a contract.
 * @returns An opened contract object unwrapped from the ref.
 * @see {@link useOpenedContract}
 */
export async function useContractAsync<T extends Contract>(
  contract: Ref<OpenedContract<T> | null>
) {
  if (!contract.value) {
    await new Promise((resolve) => {
      setTimeout(resolve, 1000)
    })
    return useContractAsync(contract)
  }
  return contract.value
}
