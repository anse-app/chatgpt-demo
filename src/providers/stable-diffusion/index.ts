import {
  handleImagePrompt,
} from './handler'
import type { Provider } from '@/types/provider'

const providerOpenAI = () => {
  const provider: Provider = {
    id: 'provider-stable-diffusion',
    icon: 'i-carbon-paint-brush', // @unocss-include
    name: 'Stable Diffusion',
    globalSettings: [
      {
        key: 'token',
        name: 'Replicate API token',
        type: 'api-key',
      },
      {
        key: 'version',
        name: 'Version hash of the model',
        type: 'input',
      },
    ],
    conversationSettings: [],
    supportConversationType: ['image'],
    handleImagePrompt,
  }
  return provider
}

export default providerOpenAI
