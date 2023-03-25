import {
  handleContinuousPrompt,
  handleSinglePrompt,
} from './handler'
import type { Provider } from '@/types/provider'

const providerOpenAI = () => {
  const provider: Provider = {
    id: 'provider-openai',
    name: 'OpenAI',
    platformSettings: [{
      name: 'API Key',
      description: 'Your OpenAI API Key',
      type: 'input',
    }],
    conversationSettings: [],
    supportConversationType: ['single', 'continuous'],
    handleSinglePrompt,
    handleContinuousPrompt,
  }
  return provider
}

export default providerOpenAI
