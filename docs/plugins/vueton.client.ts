import { createVueton, useTonConnect } from '@d0rich/vueton'
import { getHttpEndpoint } from '@orbs-network/ton-access'
import { watch } from 'vue'
import { TonClient } from '@ton/ton/dist/client/TonClient'
import axiosRetry from 'axios-retry'

export default defineNuxtPlugin((nuxtApp) => {
  const vueton = createVueton({
    tonClient: async () => {
      const endpoint = await getHttpEndpoint()
      return { endpoint }
    },
    tonConnectUI: {
      manifestUrl: window.location.origin + '/tonconnect-manifest.json',
      language: 'en',
      uiPreferences: {
        borderRadius: 'none'
      }
    },
    axiosRetry: {
      retries: 3,
      retryDelay: axiosRetry.exponentialDelay
    }
  })
  nuxtApp.vueApp.use(vueton)
  const { tonNetwork, tonClient } = useTonConnect()
  watch(tonNetwork, async (network, oldNetwork) => {
    if (network !== oldNetwork) {
      const endpoint = await getHttpEndpoint({ network: network || undefined })
      tonClient.value = new TonClient({ endpoint })
    }
  })
})
