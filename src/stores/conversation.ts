import { action, atom, computed, map } from 'nanostores'
import { providerMetaList } from './provider'
import { clearMessagesByConversationId } from './messages'
import { conversationMapData } from './tests/conversation.mock'
import { db } from './storage/conversation'
import type { Conversation } from '@/types/conversation'

export const conversationMap = map<Record<string, Conversation>>({})
export const currentConversationId = atom('')
export const currentEditingConversationId = atom<string | null>('')
export const currentEditingConversation = computed(currentEditingConversationId, (id) => {
  return id ? conversationMap.get()[id] as Conversation : null
})
export const conversationMapSortList = computed(conversationMap, (map) => {
  return Object.values(map).sort((a, b) => b.lastUseTime - a.lastUseTime)
})

export const rebuildConversationStore = async() => {
  const data = await db.exportData() || {}
  conversationMap.set(data)
  // conversationMap.set(conversationMapData)
}

export const addConversation = action(conversationMap, 'addConversation', (map, instance?: Partial<Conversation>) => {
  const instanceId = instance?.id || `id_${Date.now()}`
  const conversation: Conversation = {
    id: instanceId,
    providerId: instance?.providerId || providerMetaList[0]?.id,
    conversationType: instance?.conversationType || providerMetaList[0]?.supportConversationType?.[0],
    name: instance?.name || '',
    icon: instance?.icon || 'i-carbon-chat',
    lastUseTime: Date.now(),
  }
  map.setKey(instanceId, conversation)
  db.setItem(instanceId, conversation)
  currentConversationId.set(instanceId)
})

export const updateConversationById = action(conversationMap, 'updateConversationById', (map, id: string, payload: Partial<Conversation>) => {
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
  clearMessagesByConversationId(id, true)
})
