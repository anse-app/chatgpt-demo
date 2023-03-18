import { atom } from 'nanostores'

export const showConversationSidebar = atom(false)
export const showSettingsSidebar = atom(false)
export const showChatEditModal = atom(false)

export const currentEditingChatId = atom('')
export const inputPrompt = atom('')
