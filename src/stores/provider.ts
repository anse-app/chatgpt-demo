import { action, atom, computed } from 'nanostores'
import providerOpenAI from '@/providers/openai'

import type { Provider } from '@/types/provider'

export const providerList = atom<Provider[]>([
  providerOpenAI(),
])

export const providerMetaList = computed(providerList, (list) => {
  return list.map(provider => ({
    id: provider.id,
    name: provider.name,
    supportConversationType: provider.supportConversationType,
  }))
})

export const getProviderById = action(providerList, 'getProviderById', (list, id: string) => {
  return list.get().find(provider => provider.id === id)
})
