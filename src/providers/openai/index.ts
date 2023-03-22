import type { Provider } from '@/types/provider'

interface Options {
  apiKey?: string
}

const providerOpenAI = (options: Options = {}) => {
  const provider: Provider = {
    name: 'OpenAI',
    settingsUI: [{
      name: 'API Key',
    }],
    handlePrompt: async(prompt: string) => {
      console.log('[OpenAI]', 'handlePrompt', prompt)
      return 'response'
    },
  }
  return provider
}

export default providerOpenAI
