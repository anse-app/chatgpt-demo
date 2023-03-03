import { defineConfig } from 'astro/config'
import vercel from '@astrojs/vercel/edge'
import unocss from 'unocss/astro'
import { presetUno } from 'unocss'
import presetAttributify from '@unocss/preset-attributify'
import presetTypography from '@unocss/preset-typography'
import solidJs from '@astrojs/solid-js'

// https://astro.build/config
export default defineConfig({
  integrations: [
    unocss({
      presets: [
        presetAttributify(),
        presetUno(),
        presetTypography(),
      ]
    }),
    solidJs()
  ],
  output: 'server',
  adapter: vercel()
});