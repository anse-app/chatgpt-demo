import { atom, computed } from 'nanostores'
import { providerList } from './provider'

export const showConversationSidebar = atom(false)
export const showSettingsSidebar = atom(false)
export const showChatEditModal = atom(false)

export const currentEditingChatId = atom('')
export const inputPrompt = atom('')

export const adaptorSettingsUIList = computed(providerList, list => {
  return list.flatMap(provider => provider.settingsUI || [])
})
