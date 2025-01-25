import type { D0xigenConfig } from 'd0xigen'

declare module 'nuxt/schema' {
  interface NuxtConfig {
    d0xigen?: D0xigenConfig
  }
}

export {}
