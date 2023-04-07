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
      {
        key: 'model',
        name: 'OpenAI model',
        description: 'Custom gpt model for OpenAI API.',
        type: 'select',
        options: [
          { value: 'gpt-3.5-turbo', label: 'gpt-3.5-turbo' },
          { value: 'gpt-4', label: 'gpt-4' },
        ],
      },
      {
        key: 'max-tokens',
        name: 'Max Tokens',
        description: 'The maximum number of tokens to generate in the completion.',
        type: 'slider',
        min: 0,
        max: 4096,
        value: 2048,
        step: 1,
      },
      {
        key: 'temperature',
        name: 'Temperature',
        type: 'slider',
        description: 'What sampling temperature to use, between 0 and 2. Higher values like 0.8 will make the output more random, while lower values like 0.2 will make it more focused and deterministic.',
        min: 0,
        max: 2,
        value: 0.7,
        step: 0.1,
      },
      {
        key: 'top_p',
        name: 'Top P',
        description: 'An alternative to sampling with temperature, called nucleus sampling, where the model considers the results of the tokens with top_p probability mass. So 0.1 means only the tokens comprising the top 10% probability mass are considered.',
        type: 'slider',
        min: 0,
        max: 1,
        value: 1,
        step: 0.1,
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
