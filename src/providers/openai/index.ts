import {
  handleContinuousPrompt,
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
        name: 'API Key',
        type: 'api-key',
      },
      {
        name: 'Base URL',
        description: 'Custom base url for OpenAI API.',
        type: 'input',
      },
    ],
    conversationSettings: [],
    supportConversationType: ['continuous', 'single'],
    handleSinglePrompt,
    handleContinuousPrompt,
  }
  return provider
}

export default providerOpenAI
