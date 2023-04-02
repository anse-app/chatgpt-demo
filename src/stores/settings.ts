import { action, map } from 'nanostores'
import { db } from './storage/settings'
import type { SettingsPayload } from '@/types/provider'

export const providerSettingsMap = map<Record<string, SettingsPayload>>({})

export const rebuildSettingsStore = async() => {
  const data = await db.exportData() || {}
  providerSettingsMap.set(data)
}

export const getSettingsByProviderId = (id: string) => {
  return providerSettingsMap.get()[id] || {}
}

export const setSettingsByProviderId = action(
  providerSettingsMap,
  'setSettingsByProviderId',
  (map, id: string, payload: SettingsPayload) => {
    map.setKey(id, payload)
    db.setItem(id, payload)
  },
)
