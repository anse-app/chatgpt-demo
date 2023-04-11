import { atom, computed } from 'nanostores'
import { providerList } from './provider'
import type { ErrorMessage } from '@/types/message'

export const showConversationSidebar = atom(false)
export const showSettingsSidebar = atom(false)
export const showConversationEditModal = atom(false)

export const inputPrompt = atom('')
export const currentErrorMessage = atom<ErrorMessage | null>(null)

export const platformSettingsUIList = computed(providerList, (list) => {
  return list.map(provider => ({
    id: provider.id,
    icon: provider.icon,
    name: provider.name,
    settingsUI: provider.globalSettings,
  }))
})
