import { action, atom, computed } from 'nanostores'
import { currentEditingConversationId } from './ui'
import type { ConversationMessage, ConversationType } from '@/types/conversation'

export interface ConversationInstance {
  id: string
  type: ConversationType
  name: string
  icon: string
  messages: ConversationMessage[]
}

export const conversationList = atom<ConversationInstance[]>([
  {
    id: 'test1',
    type: 'single',
    name: 'Test 1',
    icon: '',
    messages: [],
  },
  {
    id: 'test2',
    type: 'single',
    name: 'Test 2',
    icon: '',
    messages: [],
  },
  {
    id: 'test3',
    type: 'single',
    name: 'Test 3',
    icon: '',
    messages: [],
  },
])
export const conversationMap = computed(conversationList, (list) => {
  return list.reduce((map, instance) => {
    map[instance.id] = instance
    return map
  }, {} as Record<string, ConversationInstance>)
})
export const currentConversationId = atom('')
export const currentConversation = computed([conversationMap, currentConversationId], (map, id) => {
  return map[id]
})
export const currentEditingConversation = computed([conversationMap, currentEditingConversationId], (map, id) => {
  return map[id]
})

export const conversationListWithoutMessages = computed([conversationList, currentConversationId], (list, id) => {
  return list.map(instance => ({
    ...instance,
    current: instance.id === id,
    messages: undefined,
  }))
})
export const addConversation = action(conversationList, 'addConversation', (list, instance) => {
  list.set([...list.get(), instance])
})
export const updateConversationById = action(conversationList, 'updateConversationById', (list, id: string, payload: Partial<ConversationInstance>) => {
  list.set(list.get().map(instance => (instance.id === id ? { ...instance, ...payload } : instance)))
})
export const deleteConversationById = action(conversationList, 'deleteConversationById', (list, id: string) => {
  list.set(list.get().filter(instance => instance.id !== id))
})
