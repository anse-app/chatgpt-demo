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
        presetTypography({
          cssExtend: {
            'p': {
              margin: '0.5rem 0',
            },
            'code': {
              color: '#8b5cf6',
            },
            'pre': {
              'background-color': '#1e293b',
            }
          },
        }),
      ]
    }),
    solidJs()
  ],
  output: 'server',
  adapter: vercel()
});