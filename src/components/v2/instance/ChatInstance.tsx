import { registerProvider } from '@/stores/provider'

import providerOpenAI from '@/providers/openai'

registerProvider(providerOpenAI())

export default () => {
  return null
}
