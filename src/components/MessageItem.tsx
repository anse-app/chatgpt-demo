import type { Accessor } from 'solid-js'
import type { ChatMessage } from '../types'
import { micromark } from 'micromark'
import { gfm, gfmHtml } from 'micromark-extension-gfm'
import { math, mathHtml } from 'micromark-extension-math'

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
    const microMarkOptions = {
      extensions: [
        gfm(),
        math(),
      ],
      htmlExtensions: [
        gfmHtml(),
        mathHtml(),
      ],
    }
    if (typeof message === 'function') {
      return micromark(message(), microMarkOptions)
    } else if (typeof message === 'string') {
      return micromark(message, microMarkOptions)
    }
    return ''
  }
  return (
    <div class="flex py-4 gap-3" class:op-75={ role === 'user' }>
      <div class={ `shrink-0 w-7 h-7 rounded-full op-80 ${ roleClass[role] }` }></div>
      <div class="message text-slate leading-loose break-words overflow-hidden" innerHTML={htmlString()} />
    </div>
  )
}