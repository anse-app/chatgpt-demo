import { defineConfig } from 'astro/config';
import unocss from 'unocss/astro';
import { presetUno } from 'unocss';
import presetAttributify from '@unocss/preset-attributify';
import presetTypography from '@unocss/preset-typography';
import solidJs from '@astrojs/solid-js';
import netlify from "@astrojs/netlify/functions";

// https://astro.build/config
export default defineConfig({
  integrations: [unocss({
    presets: [presetAttributify(), presetUno(), presetTypography({
      cssExtend: {
        "ul,ol": {
          "padding-left": "2em"
        }
      }
    })]
  }), solidJs()],
  output: 'server',
  adapter: netlify(),
  vite: {}
});
