<template>
  <div
    style="
      display: flex;
      flex-direction: column;
      align-items: center;
      margin: 3rem 0;
    "
  >
    <DBtn
      no-rotate
      text-transform="capitalize"
      :disabled="!tonWallet || isFetching"
      @click="sendMessage"
    >
      <template v-if="!tonWallet"> Not Authorized </template>
      <template v-else-if="!isFetching"> Give 0.5 TON </template>
      <DAnimationSpinner v-else style="height: 1rem; width: 1rem" />
    </DBtn>
    <div v-if="success">Thanks for your support!</div>
  </div>
</template>

<script setup lang="ts">
import { DBtn, DAnimationSpinner } from '@d0rich/esprit-design'
import { useTonConnect, useSendMessage } from '@d0rich/vueton'
import { Address, toNano, comment } from '@ton/core'

const { tonWallet, tonNetwork, sendTransaction } = useTonConnect()

const { sendMessage, isFetching, success } = useSendMessage({
  sendMessageFn: async ({ userAddress }) => {
    await sendTransaction({
      to: Address.parse(
        tonNetwork.value === 'mainnet'
          ? 'UQBb1d6p29w8gwwt6tgY8S3G5_kQTNID_aoOA_Osp7mx_aZg'
          : '0QBunvP4pxgNkbmQa9fFy-VyDnWjg6XBfOCkKXDsngMbRSHk'
      ),
      value: toNano('0.5'),
      body: comment('Tip from reader')
    })
  }
})
</script>
