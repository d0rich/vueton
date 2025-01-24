import { computed, ref } from 'vue'

import { useTonConnect } from '../tonconnect/useTonConnect'

export interface SendMessageFnProps {
  userAddress: string
}

export interface UseSendMessageParams {
  sendMessageFn: (props: SendMessageFnProps) => Promise<void>
  preSendValidation?: () => Promise<boolean> | boolean
  hooks?: {
    onStart?: () => void
    onSuccess?: () => void
    onFail?: () => void
  }
}

export function useSendMessage(props: UseSendMessageParams) {
  const { tonAddress } = useTonConnect()
  const status = ref<'not_started' | 'in_progress' | 'success' | 'fail'>(
    'not_started'
  )
  const success = computed(() => status.value === 'success')
  const fail = computed(() => status.value === 'fail')
  const isFetching = computed(() => status.value === 'in_progress')

  function reset() {
    status.value = 'not_started'
  }

  async function sendMessage() {
    if (isFetching.value) return
    if (!tonAddress.value) {
      console.error('Wallet is not initialized')
      return
    }
    if (props.preSendValidation && !(await props.preSendValidation())) {
      return
    }
    status.value = 'in_progress'
    if (props.hooks?.onStart) {
      await props.hooks.onStart()
    }
    try {
      await props.sendMessageFn({
        userAddress: tonAddress.value
      })
      if (props.hooks?.onSuccess) {
        await props.hooks.onSuccess()
      }
      status.value = 'success'
    } catch (error) {
      if (props.hooks?.onFail) {
        await props.hooks.onFail()
      }
      status.value = 'fail'
    }
  }

  return {
    sendMessage,
    status,
    success,
    fail,
    isFetching,
    reset
  }
}
