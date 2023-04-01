import { action, map } from 'nanostores'
import { conversationMessagesMapData } from './tests/message.mock'
import { db } from './storage/message'
import type { Message } from '@/types/message'

export const conversationMessagesMap = map<Record<string, Message[]>>({})

export const rebuildMessagesStore = async() => {
  const data = await db.exportData() || {}
  conversationMessagesMap.set(data)
  // conversationMessagesMap.set(conversationMessagesMapData)
}

export const getMessagesByConversationId = (id: string) => {
  return conversationMessagesMap.get()[id] || []
}

export const pushMessageByConversationId = action(
  conversationMessagesMap,
  'pushMessageByConversationId',
  (map, id: string, payload: Message) => {
    const oldMessages = map.get()[id] || []
    const newMessages = [...oldMessages, payload]
    map.setKey(id, newMessages)
    db.updateItem(id, newMessages)
  },
)

export const clearMessagesByConversationId = action(
  conversationMessagesMap,
  'clearMessagesByConversationId',
  (map, id: string) => {
    map.setKey(id, [])
    // db.updateItem(id, payload)
  },
)
