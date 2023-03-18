import { action, atom, computed } from 'nanostores'
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
    id: 'test1',
    type: 'single',
    name: 'Test 1',
    avatar: '',
    messages: [],
  },
  {
    id: 'test2',
    type: 'single',
    name: 'Test 2',
    avatar: '',
    messages: [],
  },
  {
    id: 'test3',
    type: 'single',
    name: 'Test 3',
    avatar: '',
    messages: [],
  },
])
export const currentChatId = atom('')
export const currentChat = computed([chatList, currentChatId], (list, id) => {
  return list.find(chat => chat.id === id)
})

export const chatListWithoutMessages = computed([chatList, currentChatId], (list, id) => {
  return list.map(chat => ({
    ...chat,
    current: chat.id === id,
    messages: undefined,
  }))
})
export const addChat = action(chatList, 'addChat', (list, chat) => {
  list.set([...list.get(), chat])
})
export const deleteChatById = action(chatList, 'deleteChatById', (list, id) => {
  list.set(list.get().filter(chat => chat.id !== id))
})
