import { action, atom, computed, map } from 'nanostores'
import { currentEditingConversationId } from './ui'
import type { ConversationMessage, ConversationType } from '@/types/conversation'

export interface ConversationInstance {
  id: string
  providerId: string
  conversationType: ConversationType
  name: string
  icon: string
  messages: ConversationMessage[]
}

export const conversationMap = map<Record<string, ConversationInstance>>({})
export const currentConversationId = atom('')
// export const currentConversation = computed([conversationMap, currentConversationId], (map, id) => {
//   return map[id]
//   const deepCopy = JSON.parse(JSON.stringify(map[id] || {}))
//   return deepCopy as ConversationInstance
// })
export const currentEditingConversation = computed([conversationMap, currentEditingConversationId], (map, id) => {
  return id ? map[id] as ConversationInstance : null
})

export const addConversation = action(conversationMap, 'addConversation', (map, instance: ConversationInstance) => {
  map.setKey(instance.id, instance)
  currentConversationId.set(instance.id)
})
export const updateConversationById = action(conversationMap, 'updateConversationById', (map, id: string, payload: Partial<ConversationInstance>) => {
  map.setKey(id, {
    ...map.get()[id],
    ...payload,
  })
})
export const deleteConversationById = action(conversationMap, 'deleteConversationById', (map, id: string) => {
  map.set(Object.fromEntries(Object.entries(map.get()).filter(([key]) => key !== id)))
})

export const clearMessagesOnConversation = action(conversationMap, 'clearMessagesOnConversation', (map, id: string) => {
  const conversation = map.get()[id]
  if (!conversation)
    return
  updateConversationById(id, { messages: [] })
})

export const addMessageOnConversation = action(conversationMap, 'addMessageOnConversation', (map, id: string, message: ConversationMessage) => {
  const conversation = map.get()[id]
  console.log('conversation', JSON.stringify(conversation.messages), message)
  if (!conversation)
    return
  const newMessages = [...conversation.messages, message]
  // conversation.messages.push(message)
  updateConversationById(id, { messages: newMessages })
  // map.setKey(id, conversation)
})
