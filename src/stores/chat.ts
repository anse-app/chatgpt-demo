import { atom } from 'nanostores'
import type { ChatMessage, ChatType } from '@/types'

export interface ChatInstance {
  id: string
  type: ChatType
  name: string
  avatar: string
  messages: ChatMessage[]
}

export const chatList = atom<ChatInstance[]>([
  {
    id: 'test',
    type: 'single',
    name: 'Test',
    avatar: '',
    messages: [],
  },
])
export const currentChatId = atom('test')
