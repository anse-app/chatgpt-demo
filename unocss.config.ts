import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

export default defineConfig({
  presets: [
    presetUno({
      dark: 'class',
    }),
    presetAttributify(),
    presetIcons(),
    presetTypography({
      cssExtend: {
        'h1': {
          'font-size': '1.25em',
          'margin': '1rem 0',
        },
        'h2': {
          'font-size': '1.16em',
          'margin': '1rem 0',
        },
        'h3': {
          'font-size': '1.1em',
          'margin': '1rem 0',
        },
        'h4, h5, h6': {
          'font-size': '1em',
          'margin': '1rem 0',
        },
        ':not(pre) > code': {
          'font-weight': 400,
          'padding': '0 0.2em',
          'color': 'var(--prism-keyword)',
        },
      },
    }),
  ],
  transformers: [transformerVariantGroup(), transformerDirectives()],
  shortcuts: [{
    'bg-base': 'bg-light-100 dark:bg-[#1c1c1c]',
    'bg-base-100': 'bg-light-200 dark:bg-[#222222]',
    'bg-blur': 'bg-light-200/85 dark:bg-[#222222]/85 backdrop-blur-xl backdrop-saturate-150',
    'bg-sidebar': 'bg-light-400 dark:bg-[#191919]',
    'bg-modal': 'bg-base dark:bg-base-100',
    'bg-darker': 'bg-black/4 dark:bg-white/4',
    'fg-base': 'text-dark dark:text-[#dadada]',
    'border-base': 'border-black/8 dark:border-white/8',
    'border-b-base': 'border-b-black/8 dark:border-b-white/8',
    'border-lighter': 'border-light-600 dark:border-dark-300',
    'border-darker': 'border-black/50 dark:border-white/50',
    'placeholder-base': 'placeholder:op-50 dark:placeholder:op-30',
    'hv-base': 'transition-colors cursor-pointer hover:bg-darker',
    'hv-foreground': 'transition-opacity cursor-pointer op-70 hover:op-100',
    'input-base': 'bg-transparent placeholder:op-50 dark:placeholder:op-30 focus:(ring-0 outline-none)',
    'max-w-base': 'max-w-3xl mx-auto',
    'text-error': 'text-red-700 dark:text-red-400/80',
    'border-error': 'border border-red-700 dark:border-red-400/80',
    'text-info': 'text-gray-400 dark:text-gray-200',
    'menu-icon': 'cursor-pointer text-xl fg-base hover-text-emerald-600',
    'fc': 'flex justify-center',
    'fi': 'flex items-center',
    'fcc': 'fc items-center',
    'fb': 'flex justify-between',
    'fie': 'fi justify-end',
    'col-fcc': 'flex-col fcc',
    'inline-fcc': 'inline-flex items-center justify-center',
    'base-focus': 'focus:(bg-op-20 ring-0 outline-none)',
    'b-slate-link': 'border-b border-(slate none) hover:border-dashed',
    'gpt-title': 'text-2xl font-extrabold mr-1',
    'gpt-subtitle': 'text-(2xl transparent) font-extrabold bg-(clip-text gradient-to-r) from-sky-400 to-emerald-600',
    'gpt-copy-btn': 'absolute top-12px right-12px z-3 fcc border b-transparent w-8 h-8 p-2 bg-light-300 dark:bg-dark-300 op-90 cursor-pointer',
    'gpt-copy-tips': 'op-0 h-7 bg-black px-2.5 py-1 box-border text-xs c-white fcc rounded absolute z-1 transition duration-600 whitespace-nowrap -top-8',
    'gpt-retry-btn': 'fi gap-1 px-2 py-0.5 op-70 border border-slate rounded-md text-sm cursor-pointer hover:bg-slate/10',
    'gpt-back-top-btn': 'fcc p-2.5 text-base rounded-md hover:bg-slate/10 fixed bottom-60px right-20px z-10 cursor-pointer transition-colors',
    'gpt-back-bottom-btn': 'gpt-back-top-btn bottom-20px transform-rotate-180deg',
    'gpt-password-input': 'px-4 py-3 h-12 rounded-sm bg-(slate op-15) base-focus',
    'gpt-password-submit': 'fcc h-12 w-12 bg-slate cursor-pointer bg-op-20 hover:bg-op-50',
    'gen-slate-btn': 'h-12 px-4 py-2 bg-(slate op-15) hover:bg-op-20 rounded-sm',
    'gen-cb-wrapper': 'h-12 my-4 fcc gap-4 bg-(slate op-15) rounded-sm',
    'gen-cb-stop': 'px-2 py-0.5 border border-slate rounded-md text-sm op-70 cursor-pointer hover:bg-slate/10',
    'gen-text-wrapper': 'my-4 fc gap-2 transition-opacity',
    'gen-textarea': 'w-full px-3 py-3 min-h-12 max-h-36 rounded-sm bg-(slate op-15) resize-none base-focus placeholder:op-50 dark:(placeholder:op-30) scroll-pa-8px',
    'sys-edit-btn': 'inline-fcc gap-1 text-sm bg-slate/20 px-2 py-1 rounded-md transition-colors cursor-pointer hover:bg-slate/50',
    'gpt-toggle-wrapper': 'inline-flex rounded border border-gray-100 bg-gray-100 p-1 cursor-pointer',
    'gpt-toggle-item': 'inline-block rounded font-semibold px-2 py-1 text-xs text-gray-500 focus:relative',
    'gpt-toggle-active': 'bg-emerald-500 text-white',

    'icon-base': 'md:(w-6 h-6) w-5 h-5',
    'icon--off': 'group-hover:hidden inline-block',
    'icon--on': 'hidden group-hover:inline-block',
  }],
  preflights: [{
    layer: 'base',
    getCSS: () => `
      :root {
      --c-scroll: #d9d9d9;
      --c-scroll-hover: #bbbbbb;
      --c-shadow: #00000008;
      }

      html.dark {
        --c-scroll: #333333;
        --c-scroll-hover: #555555;
        --c-shadow: #ffffff08;
      }

      ::-webkit-scrollbar {
        width: 4px;
        height: 4px;
      }

      ::-webkit-scrollbar-thumb {
        background-color: var(--c-scroll);
      }

      ::-webkit-scrollbar-thumb:hover {
        background-color: var(--c-scroll-hover);
      }

      ::selection {
        background: rgba(0, 0, 0, 0.12);
      }

      .dark ::selection {
        background: rgba(255, 255, 255, 0.12);
      }

      button,select,input,option {
        outline: none;
        -webkit-appearance: none
      }
    `,
  }],
})
