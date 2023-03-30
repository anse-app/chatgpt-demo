import { action, atom, computed, map } from 'nanostores'
import { providerMetaList } from './provider'
import { conversationMapData } from './tests/conversation.mock'
import { db } from './storage/conversation'
import type { ConversationInstance, ConversationMessage } from '@/types/conversation'

export const conversationMap = map<Record<string, ConversationInstance>>({})
export const currentConversationId = atom('')
export const currentEditingConversationId = atom<string | null>('')
export const currentEditingConversation = computed(currentEditingConversationId, (id) => {
  return id ? conversationMap.get()[id] as ConversationInstance : null
})

export const rebuildConversationStore = async() => {
  const data = await db.exportData()
  conversationMap.set(data)
  // conversationMap.set(conversationMapData)
}

export const addConversation = action(conversationMap, 'addConversation', (map, instance?: Partial<ConversationInstance>) => {
  const instanceId = instance?.id || `id_${Date.now()}`
  const conversation = {
    id: instanceId,
    messages: [],
    providerId: instance?.providerId || providerMetaList.get()[0]?.id,
    conversationType: instance?.conversationType || providerMetaList.get()[0]?.supportConversationType?.[0],
    name: instance?.name || '',
    icon: instance?.icon || 'i-carbon-chat',
  }
  console.log('addConversation', instanceId, conversation)
  map.setKey(instanceId, conversation)
  db.setItem(instanceId, conversation)
  currentConversationId.set(instanceId)
})
export const updateConversationById = action(conversationMap, 'updateConversationById', (map, id: string, payload: Partial<ConversationInstance>) => {
  const conversation = {
    ...map.get()[id],
    ...payload,
  }
  map.setKey(id, conversation)
  db.updateItem(id, conversation)
})
export const deleteConversationById = action(conversationMap, 'deleteConversationById', (map, id: string) => {
  map.set(Object.fromEntries(Object.entries(map.get()).filter(([key]) => key !== id)))
  db.deleteItem(id)
})

export const clearMessagesOnConversation = action(conversationMap, 'clearMessagesOnConversation', (map, id: string) => {
  const conversation = map.get()[id]
  if (!conversation)
    return
  updateConversationById(id, { messages: [] })
})

export const addMessageOnConversation = action(conversationMap, 'addMessageOnConversation', (map, id: string, message: ConversationMessage) => {
  const conversation = map.get()[id]
  if (!conversation)
    return
  const newMessages = [...conversation.messages, message]
  updateConversationById(id, { messages: newMessages })
})
