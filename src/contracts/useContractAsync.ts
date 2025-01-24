import type { Ref } from 'vue'
import type { Contract, OpenedContract } from '@ton/core'

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
