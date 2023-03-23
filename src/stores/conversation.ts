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
export const currentConversation = computed([conversationMap, currentConversationId], (map, id) => {
  const deepCopy = JSON.parse(JSON.stringify(map[id] || {}))
  return deepCopy as ConversationInstance
})
export const currentEditingConversation = computed([conversationMap, currentEditingConversationId], (map, id) => {
  return map[id]
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
