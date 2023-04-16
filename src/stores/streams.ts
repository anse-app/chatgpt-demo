import { action, map } from 'nanostores'
import type { StreamInstance } from '@/types/message'

export const streamsMap = map<Record<string, StreamInstance>>({})
export const loadingStateMap = map<Record<string, boolean>>({})

export const getStreamByConversationId = (id: string) => {
  return streamsMap.get()[id] || null
}

export const setStreamByConversationId = action(
  streamsMap,
  'setStreamByConversationId',
  (map, id: string, payload: StreamInstance) => {
    map.setKey(id, payload)
  },
)

export const deleteStreamById = action(streamsMap, 'deleteStreamById', (map, id: string) => {
  map.set(Object.fromEntries(Object.entries(map.get()).filter(([key]) => key !== id)))
})

export const setLoadingStateByConversationId = action(
  loadingStateMap,
  'setLoadingStateByConversationId',
  (map, id: string, loading: boolean) => {
    map.setKey(id, loading)
  },
)
