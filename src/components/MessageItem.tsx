import { Accessor, For } from 'solid-js'
import type { ChatMessage } from '../types'

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
  const paragraphArr = () => {
    if (typeof message === 'function') {
      return message().split('\n')
    } else if (typeof message === 'string') {
      return message.split('\n')
    }
    return []
  }
  return (
    <div class="flex py-4 gap-3" class:op-75={ role === 'user' }>
      <div class={ `shrink-0 w-7 h-7 rounded-full op-80 ${ roleClass[role] }` }></div>
      <div>
        <For each={ paragraphArr() }>
          { (line) => <p class="py-0.5 text-slate leading-relaxed break-words">{ line }</p> }
        </For>
      </div>
    </div>
  )
}