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
        name: 'Model Version',
        description: 'Version hash for Stable Diffusion.',
        type: 'input',
        default: 'db21e45d3f7023abc2a46ee38a23973f6dce16bb082a930b0c49861f96d1e5bf',
      },
    ],
    conversationSettings: [],
    supportConversationType: ['image'],
    supportCallMethod: 'backend',
    handleImagePrompt,
  }
  return provider
}

export default providerOpenAI
