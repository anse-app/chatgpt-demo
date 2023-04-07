import { atom } from 'nanostores'
import { createStore } from 'idb-keyval'
import { rebuildConversationStore } from '../conversation'
import { rebuildMessagesStore } from '../messages'
import { rebuildSettingsStore } from '../settings'
import type { UseStore } from 'idb-keyval'

export const conversations = atom<UseStore | null>(null)
export const messages = atom<UseStore | null>(null)
export const settings = atom<UseStore | null>(null)

export const createStores = () => {
  conversations.set(createStore('conversations', 'keyval'))
  messages.set(createStore('messages', 'keyval'))
  settings.set(createStore('settings', 'keyval'))
}

export const rebuildStores = async() => {
  await rebuildConversationStore()
  await rebuildMessagesStore()
  await rebuildSettingsStore()
}
