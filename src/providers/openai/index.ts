import type { Provider } from '@/types/provider'

const providerOpenAI = () => {
  const provider: Provider = {
    name: 'OpenAI',
    platformSettings: [{
      name: 'API Key',
      description: 'Your OpenAI API Key',
      type: 'input',
    }],
    conversationSettings: [],
    supportConversationType: ['single', 'continuous'],
    handleSinglePrompt: async(prompt) => {
      console.log('handleSinglePrompt', prompt)
      return 'response'
    },
  }
  return provider
}

export default providerOpenAI
