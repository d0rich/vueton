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
