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

import { ref } from 'vue'
import type { Ref, ComputedRef } from 'vue'
import type { Contract, OpenedContract } from '@ton/core'

import { useOpenedContract } from './useOpenedContract'
import { awaitConnected } from '../tonconnect/awaitConnected'
import type { Awaitable } from '../utils/awaitable'

/**
 * The parameters of pagination.
 */
export interface UseItemsPaginatedProps<T extends Contract> {
  /**
   * Maximum number of items per iteration.
   */
  pageLength?: number
  /**
   * A function that returns the total number of items as bigint.
   *
   * Probably, it will be something like:
   * ```ts
   * await collectionContract.getNextItemIndex()
   * ```
   */
  getTotalItems: () => Awaitable<bigint>
  /**
   * A function that returns a contract by its sequence number.
   *
   * Probably, it will be something like:
   * ```ts
   * ItemContract.fromAddress(await collectionContract.getItemByIndex(seqNum))
   * ```
   */
  getItemContract: (seqNum: bigint) => Awaitable<T>
  /**
   * A function that will be called before fetching the next page.
   */
  beforeNextPage?: () => Awaitable<void>
}

export interface UseItemsPaginatedResult<T extends Contract> {
  /**
   * Whether the current page is the last one.
   */
  isLastPage: Ref<boolean>
  /**
   * Whether the next page is loading.
   */
  isFetching: Ref<boolean>
  /**
   * All items fetched so far.
   */
  items: Ref<ComputedRef<OpenedContract<T>>[]>
  /**
   * Fetches the next page.
   */
  nextPage: () => Promise<void>
  /**
   * Resets the pagination state.
   */
  reset: () => void
}

/**
 * A high-level composable to paginate collections of TON contracts.
 * @param params The parameters of pagination.
 * @returns Syncronous pagination state and methods.
 */
export function useItemsPaginated<T extends Contract>({
  pageLength = 3,
  getTotalItems,
  getItemContract,
  beforeNextPage
}: UseItemsPaginatedProps<T>): UseItemsPaginatedResult<T> {
  const isLastPage = ref(false)

  const items = ref<ComputedRef<OpenedContract<T>>[]>([])
  const isFetching = ref(false)

  async function* itemsGenerator() {
    isFetching.value = true
    isLastPage.value = false
    await awaitConnected()
    const totalItems = await getTotalItems()
    let currentBatch: ComputedRef<OpenedContract<T>>[] = []

    await beforeNextPage?.()

    for (let i = totalItems - 1n; i >= 0; i--) {
      const itemContract = useOpenedContract(await getItemContract(i))
      currentBatch.push(itemContract as ComputedRef<OpenedContract<T>>)
      if (currentBatch.length === pageLength) {
        isFetching.value = false
        if (i === 0n) {
          isLastPage.value = true
        }
        yield currentBatch
        isFetching.value = true
        await beforeNextPage?.()
        currentBatch = []
      }
    }
    isFetching.value = false
    if (currentBatch.length) {
      isLastPage.value = true
      yield currentBatch
    }
  }

  let iterator = itemsGenerator()

  async function nextPage() {
    const { value, done } = await iterator.next()
    if (done) {
      return
    }
    items.value.push(...value)
  }
  return {
    isLastPage,
    isFetching,
    items,
    nextPage,
    reset() {
      iterator = itemsGenerator()
    }
  }
}
