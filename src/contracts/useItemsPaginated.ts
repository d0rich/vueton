import { ref, type ComputedRef } from 'vue'
import type { Contract, OpenedContract } from '@ton/core'

import { useOpenedContract } from './useOpenedContract'
import { awaitConnected } from '../tonconnect/awaitConnected'
import type { Awaitable } from '../utils/awaitable'

export interface UseItemsPaginatedProps<T extends Contract> {
  pageLength?: number
  getTotalItems: () => Awaitable<bigint>
  getItemContract: (seqNum: bigint) => Awaitable<T>
  beforeNextPage?: () => Awaitable<void>
}

export function useItemsPaginated<T extends Contract>({
  pageLength = 3,
  getTotalItems,
  getItemContract,
  beforeNextPage
}: UseItemsPaginatedProps<T>) {
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
