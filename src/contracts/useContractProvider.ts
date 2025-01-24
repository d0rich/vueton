import { computed, type ComputedRef } from 'vue'
import type { ContractProvider, Contract } from '@ton/core'
import { useTonConnect } from '../tonconnect/useTonConnect'

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
