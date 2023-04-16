import providerOpenAI from '@/providers/openai'
import providerStableDiffusion from '@/providers/stable-diffusion'

export const providerList = [
  providerOpenAI(),
  providerStableDiffusion(),
]

export const providerMetaList = providerList.map(provider => ({
  id: provider.id,
  name: provider.name,
  icon: provider.icon,
  supportConversationType: provider.supportConversationType,
}))

export const platformSettingsUIList = providerList.map(provider => ({
  id: provider.id,
  icon: provider.icon,
  name: provider.name,
  settingsUI: provider.globalSettings,
}))

export const getProviderById = (id: string) => {
  return providerList.find(provider => provider.id === id)
}
