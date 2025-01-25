# @d0rich/vueton

Vueton is a Vue3 plugin that provides an integration with [TON Blockchain](https://ton.org/). This library is inspired by the official react SDK [@tonconnect/ui-react](https://www.npmjs.com/package/@tonconnect/ui-react), but also have its own unique features.

It was initally created for the [DNet](https://dnet.blog) DApp, and now it's open-sourced. 

## Getting Started

### Installation

Install the peer dependancies:

```bash
npm install @tonconnect/ui @ton/ton
```

Install the package:

```bash
npm install @d0rich/vueton
```

### Initialization

It accepts three configurations for different libraries:

- `tonClient` - `TonClient` from [`@ton/ton`](https://www.npmjs.com/package/@ton/ton).
- `tonConnectUI` - `TonConnectUI` from [`@tonconnect/ui`](https://www.npmjs.com/package/@tonconnect/ui).
- `axiosRetry` (optional) - [`axios-retry`](https://www.npmjs.com/package/axios-retry) options.

```ts
import { createVueton } from '@d0rich/vueton'

const vueton = createVueton({
  tonClient: {/* ton-client options */},
  tonConnectUI: {/* ton-connect-ui options */},
  axiosRetry: {/* axios-retry options */}
})
```

`tonClient` also can be a sync/async function that returns `TonClient` instance. It is useful when you want to use a library like [`@orbs-network/ton-access`](https://www.npmjs.com/package/@orbs-network/ton-access).

```ts
import { createVueton } from '@d0rich/vueton'
import { getHttpEndpoint } from '@orbs-network/ton-access'

const vueton = createVueton({
  tonClient: async () => {
    const endpoint = await getHttpEndpoint({
      // options
    })
    return { endpoint }
  },
  tonConnectUI: {/* ton-connect-ui options */},
  axiosRetry: {/* axios-retry options */}
})
```

Activate the plugin:

```ts
import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)
app.use(vueton)
```

### Possible problems

- `@ton/core` uses Node buffer implementation, so in order to use it in the browser, you need to use a polyfill like [`vite-plugin-node-polyfills`](https://www.npmjs.com/package/vite-plugin-node-polyfills).
- [`@ton/ton`](https://www.npmjs.com/package/@ton/ton) client can not process accept complex responses from the endpoints. This problem is addressed here: https://github.com/ton-org/ton/pull/45
- [`@orbs-network/ton-access`](https://www.npmjs.com/package/@orbs-network/ton-access) might reject some requests if you DApp sends too many requests in a short period of time. That's why `axios-retry` is used to retry the requests. However, [`@ton/ton`](https://www.npmjs.com/package/@ton/ton) does not provide an access to the axios instance to configure retries. The problem is addressed here: https://github.com/ton-org/ton/pull/73

The two last mentioned problems can be fixed by applying this patch to [`@ton/ton`](https://www.npmjs.com/package/@ton/ton) - https://github.com/d0rich/vueton/blob/main/patches/%40ton%2Bton%2B15.1.0.patch . Vueton can work with and without this patch.

### Example

Show a connect button:

```vue
<template>
  <TonConnectButton />
</template>

<script setup lang="ts">
import {TonConnectButton} from 'vueton'
</script>
```

Send a transaction:

```vue
<template>
  <button :disabled="!tonWallet || isFetching" @click="sendMessage">
    Give 0.5 TON
  </button>
  <div v-if="success">
    Thanks for your support!
  </div>
</template>

<script setup lang="ts">
import {useTonConnect, useSendMessage} from '@d0rich/vueton'
import {Address, toNano, comment} from '@ton/core'

const {tonWallet, sendTransaction} = useTonConnect()
const {sendMessage, isFetching, success} = useSendMessage({
  sendMessageFn: async ({ userAddress }) => {
    await sendTransaction({
      to: Address.parse('my TON wallet address'),
      value: toNano('0.5'),
      body: comment('Tip from reader')
    })
  }
})
</script>
```