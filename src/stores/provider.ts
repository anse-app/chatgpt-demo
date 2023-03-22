import { action, atom } from 'nanostores'
import type { Provider } from '@/types/provider'

export const providerList = atom<Provider[]>([])
export const registerProvider = action(providerList, 'registerProvider', (list, provider: Provider) => {
  console.log('[provider]', 'registerProvider', provider.name)
  list.set([...list.get(), provider])
})
