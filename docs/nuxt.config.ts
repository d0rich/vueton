import { nodePolyfills } from 'vite-plugin-node-polyfills'

export default defineNuxtConfig({
  extends: ['d0xigen'],
  compatibilityDate: '2024-12-02',
  vite: {
    plugins: [
      nodePolyfills({
        include: ['buffer']
      })
    ],
    build: {
      commonjsOptions: {
        strictRequires: true
      }
    }
  }
})
