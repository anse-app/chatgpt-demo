import { atom, computed } from 'nanostores'
import { providerList } from './provider'

export const showConversationSidebar = atom(false)
export const showSettingsSidebar = atom(false)
export const showConversationEditModal = atom(false)

export const inputPrompt = atom('')

export const platformSettingsList = computed(providerList, (list) => {
  return list.map(provider => ({
    id: provider.id,
    icon: provider.icon,
    name: provider.name,
    settings: provider.platformSettings,
  }))
})
