import { defineConfig } from 'astro/config'
import unocss from 'unocss/astro'
import solidJs from '@astrojs/solid-js'

import node from '@astrojs/node'
import { VitePWA } from 'vite-plugin-pwa'
import vercel from '@astrojs/vercel/edge'
import netlify from '@astrojs/netlify/edge-functions'
import vercelDisableBlocks from './plugins/vercelDisableBlocks'

const envAdapter = () => {
  if (process.env.OUTPUT === 'vercel') {
    return vercel()
  } else if (process.env.OUTPUT === 'netlify') {
    return netlify()
  } else {
    return node({
      mode: 'standalone',
    })
  }
}

// https://astro.build/config
export default defineConfig({
  integrations: [
    unocss(),
    solidJs(),
  ],
  output: 'server',
  adapter: envAdapter(),
  vite: {
    plugins: [
      process.env.OUTPUT === 'vercel' && vercelDisableBlocks(),
      process.env.OUTPUT === 'netlify' && vercelDisableBlocks(),
      process.env.OUTPUT !== 'netlify' && VitePWA({
        includeAssets: ['favicon.svg'],
        registerType: 'autoUpdate',
        manifest: {
          name: 'ChatGPT-API Demo',
          short_name: 'ChatGPT-API Demo',
          description: 'A demo repo based on OpenAI GPT-3.5 Turbo API',
          theme_color: '#212129',
          background_color: '#ffffff',
          icons: [
            {
              src: 'favicon-192x192.png',
              sizes: '192x192',
              type: 'image/png',
            },
            {
              src: 'favicon-512x512.png',
              sizes: '512x512',
              type: 'image/png',
            },
            {
              src: 'favicon-512x512.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'any maskable',
            },
          ],
        },
        workbox: {
          globDirectory: 'dist',
          navigateFallback: '/',
        },
        client: {
          installPrompt: true,
          periodicSyncForUpdates: 20,
        },
        devOptions: {
          enabled: true,
        },
      }),
    ],
  },
})
