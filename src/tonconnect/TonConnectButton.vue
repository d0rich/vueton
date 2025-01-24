<script setup lang="ts">
import { onMounted, onBeforeUnmount } from 'vue'
import { useTonConnect } from './useTonConnect'

const buttonRootId = 'ton-connect-button'

const { tonConnect } = useTonConnect()

onMounted(() => {
  tonConnect.uiOptions = {
    buttonRootId
  }
})
onBeforeUnmount(() => {
  tonConnect.uiOptions = {
    buttonRootId: null
  }
})
</script>

<template>
  <div :id="buttonRootId" />
</template>
