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
