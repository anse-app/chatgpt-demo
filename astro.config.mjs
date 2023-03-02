import { defineConfig } from 'astro/config'
import vercel from '@astrojs/vercel/edge'
import unocss from 'unocss/astro'
import { presetUno } from 'unocss'
import presetAttributify from '@unocss/preset-attributify'
import solidJs from '@astrojs/solid-js'

// https://astro.build/config
export default defineConfig({
  integrations: [
    unocss({
      presets: [presetAttributify(), presetUno()]
    }),
    solidJs()
  ],
  output: 'server',
  adapter: vercel()
});