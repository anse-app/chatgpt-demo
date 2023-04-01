import { action, map } from 'nanostores'
// import { conversationMessagesMapData } from './tests/message.mock'
// import { db } from './storage/message'
// import type { Message } from '@/types/message'

export const providerSettingsMap = map<Record<string, Record<string, string>>>({})

// export const rebuildMessagesStore = async() => {
//   const data = await db.exportData() || {}
//   conversationMessagesMap.set(data)
//   // conversationMessagesMap.set(conversationMessagesMapData)
// }

export const getSettingsByProviderId = (id: string) => {
  return providerSettingsMap.get()[id] || {}
}

export const setSettingsByProviderId = action(
  providerSettingsMap,
  'setSettingsByProviderId',
  (map, id: string, payload: Record<string, string>) => {
    map.setKey(id, payload)
    // db.updateItem(id, newMessages)
  },
)
