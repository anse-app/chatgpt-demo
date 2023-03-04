import type { Accessor } from 'solid-js'
import type { ChatMessage } from '@/types'
import MarkdownIt from 'markdown-it'
// @ts-ignore
import mdKatex from 'markdown-it-katex'
import mdHighlight from 'markdown-it-highlightjs'

interface Props {
  role: ChatMessage['role']
  message: Accessor<string> | string
}

export default ({ role, message }: Props) => {
  const roleClass = {
    system: 'bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300',
    user: 'bg-gradient-to-r from-purple-400 to-yellow-400',
    assistant: 'bg-gradient-to-r from-yellow-200 via-green-200 to-green-300',
  }
  const htmlString = () => {
    const md = MarkdownIt().use(mdKatex).use(mdHighlight)

    if (typeof message === 'function') {
      return md.render(message())
    } else if (typeof message === 'string') {
      return md.render(message)
    }
    return ''
  }
  return (
    <div class="flex py-2 gap-3 -mx-4 px-4 rounded-lg transition-colors md:hover:bg-slate/3" class:op-75={ role === 'user' }>
      <div class={ `shrink-0 w-7 h-7 mt-4 rounded-full op-80 ${ roleClass[role] }` }></div>
      <div class="message prose text-slate break-words overflow-hidden" innerHTML={htmlString()} />
    </div>
  )
}