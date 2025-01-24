import { computed, type Ref, type ComputedRef, isRef } from 'vue'
import type { OpenedContract, Contract } from '@ton/core'
import { useTonConnect } from '../tonconnect/useTonConnect'

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
