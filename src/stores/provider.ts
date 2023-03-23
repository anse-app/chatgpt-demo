import { action, atom, computed } from 'nanostores'
import type { Provider } from '@/types/provider'

export const providerList = atom<Provider[]>([])
export const providerMetaList = computed(providerList, (list) => {
  return list.map(provider => ({
    id: provider.id,
    name: provider.name,
    supportConversationType: provider.supportConversationType,
  }))
})
export const registerProvider = action(providerList, 'registerProvider', (list, provider: Provider) => {
  console.log('[provider]', 'registerProvider', provider.name)
  list.set([...list.get(), provider])
})
export const getProviderById = action(providerList, 'getProviderById', (list, id: string) => {
  return list.get().find(provider => provider.id === id)
})
