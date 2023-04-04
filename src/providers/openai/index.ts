import {
  handleContinuousPrompt,
  handleImagePrompt,
  handleSinglePrompt,
} from './handler'
import type { Provider } from '@/types/provider'

const providerOpenAI = () => {
  const provider: Provider = {
    id: 'provider-openai',
    icon: 'i-simple-icons-openai', // @unocss-include
    name: 'OpenAI',
    globalSettings: [
      {
        key: 'apiKey',
        name: 'API Key',
        type: 'api-key',
      },
      {
        key: 'baseUrl',
        name: 'Base URL',
        description: 'Custom base url for OpenAI API.',
        type: 'input',
      },
    ],
    conversationSettings: [],
    supportConversationType: ['continuous', 'single', 'image'],
    handleSinglePrompt,
    handleContinuousPrompt,
    handleImagePrompt,
  }
  return provider
}

export default providerOpenAI
