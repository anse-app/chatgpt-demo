import { Accessor, createSignal } from 'solid-js'
import type { ChatMessage } from '@/types'
import MarkdownIt from 'markdown-it'
// @ts-ignore
import mdKatex from 'markdown-it-katex'
import mdHighlight from 'markdown-it-highlightjs'
import IconRefresh from './icons/Refresh'
import { useClipboard,useEventListener } from 'solidjs-use'

interface Props {
  role: ChatMessage['role']
  message: Accessor<string> | string
  showRetry?: Accessor<boolean>
  onRetry?: () => void
}

export default ({ role, message, showRetry, onRetry }: Props) => {
  const roleClass = {
    system: 'bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300',
    user: 'bg-gradient-to-r from-purple-400 to-yellow-400',
    assistant: 'bg-gradient-to-r from-yellow-200 via-green-200 to-green-300',
  }
  const [source, setSource] = createSignal('')
  const { copy, copied } = useClipboard({ source, copiedDuring: 1000 })


  useEventListener('click', (e) => {
    const el = e.target as HTMLElement
    let code = null
    
    if (el.matches('div > div.copy-btn')) {
      code = decodeURIComponent(el.dataset.code!)
    } else {
      code = decodeURIComponent(el.parentElement?.dataset.code!)
    } 
    copy(code)
  })

  

  const htmlString = () => {
    const md = MarkdownIt().use(mdKatex).use(mdHighlight)
    const fence = md.renderer.rules.fence!
    md.renderer.rules.fence = (...args) => {
      const [tokens, idx] = args
      const token = tokens[idx]
      // remove title from info
      token.info = token.info.replace(/\[.*\]/, '')

      const rawCode = fence(...args)
      setSource(token.content)

      return `<div relative>
      <div data-code=${encodeURIComponent(token.content)} class="copy-btn absolute top-12px right-12px z-3 flex justify-center items-center border b-transparent w-8 h-8 p-2 bg-dark-300 op-90 transition-all group cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 32 32"><path fill="currentColor" d="M28 10v18H10V10h18m0-2H10a2 2 0 0 0-2 2v18a2 2 0 0 0 2 2h18a2 2 0 0 0 2-2V10a2 2 0 0 0-2-2Z" /><path fill="currentColor" d="M4 18H2V4a2 2 0 0 1 2-2h14v2H4Z" /></svg>
            <div class="opacity-0 h-7 bg-black px-2.5 py-1 box-border text-xs c-white inline-flex justify-center items-center  rounded absolute z-1 transition duration-600 whitespace-nowrap -top-8" group-hover:opacity-100>
              ${copied() ? 'Copied' : 'Copy'}
            </div>
      </div>
      ${rawCode}
      </div>`
    }

    if (typeof message === 'function') {
      return md.render(message())
    } else if (typeof message === 'string') {
      return md.render(message)
    }
    return ''
  }

  return (
    <div class="py-2 -mx-4 px-4 transition-colors md:hover:bg-slate/3">
      <div class="flex gap-3 rounded-lg" class:op-75={role === 'user'}>
        <div class={`shrink-0 w-7 h-7 mt-4 rounded-full op-80 ${roleClass[role]}`}></div>
        <div class="message prose text-slate break-words overflow-hidden" innerHTML={htmlString()} />
      </div>
      {showRetry?.() && onRetry && (
        <div class="flex items-center justify-end px-3 mb-2">
          <div onClick={onRetry} class="flex items-center gap-1 px-2 py-0.5 op-70 border border-slate text-slate rounded-md text-sm cursor-pointer hover:bg-slate/10">
            <IconRefresh />
            <span>Regenerate</span>
          </div>
        </div>
      )}
    </div>
  )
}
