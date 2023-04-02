import { del, entries, get, set, update } from 'idb-keyval'
import { messages } from './db'
import type { MessageInstance } from '@/types/message'

const setItem = async(key: string, item: MessageInstance[]) => {
  const store = messages.get()
  if (store)
    await set(key, item, store)
}

const getItem = async(key: string) => {
  const store = messages.get()
  if (store)
    return get<MessageInstance[]>(key, store)
  return null
}

const updateItem = async(key: string, item: MessageInstance[]) => {
  const store = messages.get()
  if (store)
    await update(key, () => item, store)
}

const deleteItem = async(key: string) => {
  const store = messages.get()
  if (store)
    await del(key, store)
}

const exportData = async() => {
  const store = messages.get()
  if (store) {
    const entriesData = await entries(store)
    return Object.fromEntries(entriesData) as Record<string, MessageInstance[]>
  }
  return null
}

export const db = {
  setItem,
  getItem,
  updateItem,
  deleteItem,
  exportData,
}
