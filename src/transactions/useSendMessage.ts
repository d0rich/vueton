import { computed, ref } from 'vue'
import type { Ref } from 'vue'

import { useTonConnect } from '../tonconnect/useTonConnect'

export interface SendMessageFnProps {
  /** Address of the current user wallet as a string */
  userAddress: string
}

export interface UseSendMessageParams {
  /**
   * A function to send a message.
   */
  sendMessageFn: (props: SendMessageFnProps) => Promise<void>
  /**
   * A function to validate if the message can be sent before actually doing it.
   */
  preSendValidation?: () => Promise<boolean> | boolean
  /**
   * Hooks to be run on different stages of the message sending.
   */
  hooks?: {
    /**
     * A hook to be run before the message is sent.
     */
    onStart?: () => void
    /**
     * A hook to be run after the message is successfully sent.
     * This hook will not be called if the message sending fails.
     */
    onSuccess?: () => void
    /**
     * A hook to be run after the message sending fails.
     */
    onFail?: () => void
  }
}

type Status = 'not_started' | 'in_progress' | 'success' | 'fail'

export interface UseSendMessageResult {
  /**
   * Sends a message.
   */
  sendMessage: () => Promise<void>
  /**
   * The current status of the message sending.
   */
  status: Ref<Status>
  /**
   * Whether the message was successfully sent.
   */
  success: Ref<boolean>
  /**
   * Whether the message sending failed.
   */
  fail: Ref<boolean>
  /**
   * Whether the message sending is in progress.
   */
  isFetching: Ref<boolean>
  /**
   * Resets the message sending state.
   */
  reset: () => void
}

/**
 * A high-level composable to send messages in TON Blockchain.
 *
 * @param props Parameters of the message sending.
 * @returns Syncronous result of the message sending.
 */
export function useSendMessage(
  props: UseSendMessageParams
): UseSendMessageResult {
  const { tonAddress } = useTonConnect()
  const status = ref<Status>('not_started')
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
