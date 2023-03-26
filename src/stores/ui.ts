import { atom, computed } from 'nanostores'
import { providerList } from './provider'

export const showConversationSidebar = atom(false)
export const showSettingsSidebar = atom(false)
export const showConversationEditModal = atom(false)

export const inputPrompt = atom('')

export const adaptorSettingsUIList = computed(providerList, (list) => {
  return list.flatMap(provider => provider.platformSettings || [])
})
