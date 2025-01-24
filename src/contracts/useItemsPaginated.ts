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
