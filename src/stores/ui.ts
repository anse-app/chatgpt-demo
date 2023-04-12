import { atom, computed } from 'nanostores'
import { providerList } from './provider'
import type { ErrorMessage } from '@/types/message'

export const showConversationSidebar = atom(false)
export const showSettingsSidebar = atom(false)
export const showConversationEditModal = atom(false)

export const inputPrompt = atom('')
export const isSendBoxFocus = atom(false)
export const currentErrorMessage = atom<ErrorMessage | null>(null)

export const platformSettingsUIList = computed(providerList, (list) => {
  return list.map(provider => ({
    id: provider.id,
    icon: provider.icon,
    name: provider.name,
    settingsUI: provider.globalSettings,
  }))
})

export const scrollController = () => {
  const elementList = () => Array.from(document.getElementsByClassName('scroll-list'))
  const firstElement = () => elementList()[0]
  return {
    scrollToTop: () => elementList().forEach(element => element.scrollTo({ top: 0, behavior: 'smooth' })),
    scrollToBottom: () => elementList().forEach(element => element.scrollTo({ top: element.scrollHeight, behavior: 'smooth' })),
    instantToBottom: () => elementList().forEach(element => element.scrollTo({ top: element.scrollHeight })),
    isBottom: () => firstElement().scrollTop + firstElement().clientHeight >= firstElement().scrollHeight - 100,
  }
}
