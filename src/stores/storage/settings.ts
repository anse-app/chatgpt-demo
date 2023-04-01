import { del, entries, get, set, update } from 'idb-keyval'
import { settings } from './db'
import type { SettingsPayload } from '@/types/provider'

const setItem = async(key: string, item: SettingsPayload) => {
  const store = settings.get()
  if (store)
    await set(key, item, store)
}

const getItem = async(key: string) => {
  const store = settings.get()
  if (store)
    return get<SettingsPayload>(key, store)
  return null
}

const updateItem = async(key: string, item: SettingsPayload) => {
  const store = settings.get()
  if (store)
    await update(key, () => item, store)
}

const deleteItem = async(key: string) => {
  const store = settings.get()
  if (store)
    await del(key, store)
}

const exportData = async() => {
  const store = settings.get()
  if (store) {
    const entriesData = await entries(store)
    return Object.fromEntries(entriesData) as Record<string, SettingsPayload>
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
