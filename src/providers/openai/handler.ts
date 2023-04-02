import { fetchChatCompletion } from './api'
import { parseStream } from './parser'
import type { Message } from '@/types/message'
import type { HandlerPayload, Provider } from '@/types/provider'

export const handleSinglePrompt: Provider['handleSinglePrompt'] = async(prompt, payload) => {
  return handleChatCompletion([{ role: 'user', content: prompt }], payload)
}

export const handleContinuousPrompt: Provider['handleContinuousPrompt'] = async(messages, payload) => {
  return handleChatCompletion(messages, payload)
}

const handleChatCompletion = async(messages: Message[], payload: HandlerPayload) => {
  const response = await fetchChatCompletion({
    apiKey: payload.globalSettings.apiKey as string,
    baseUrl: (payload.globalSettings.baseUrl as string || 'https://api.openai.com').trim().replace(/\/$/, ''),
    body: {
      model: 'gpt-3.5-turbo',
      messages,
      temperature: 0.6,
      stream: true,
    },
  })
  if (!response.ok) {
    const responseJson = await response.json()
    const errMessage = responseJson.error?.message || 'Unknown error'
    throw new Error(errMessage)
  }
  const isStream = response.headers.get('content-type')?.includes('text/event-stream')
  if (isStream) {
    return parseStream(response)
  } else {
    const resJson = await response.json()
    return resJson.choices[0].message.content
  }
}
