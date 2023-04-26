import { fetchChatCompletion, fetchImageGeneration } from './api'
import { parseStream } from './parser'
import type { Message } from '@/types/message'
import type { HandlerPayload, Provider } from '@/types/provider'

export const handleSinglePrompt: Provider['handleSinglePrompt'] = async(prompt, payload, signal?: AbortSignal) => {
  return handleChatCompletion([{ role: 'user', content: prompt }], payload, signal)
}

export const handleContinuousPrompt: Provider['handleContinuousPrompt'] = async(messages, payload, signal?: AbortSignal) => {
  return handleChatCompletion(messages, payload, signal)
}

export const handleImagePrompt: Provider['handleImagePrompt'] = async(prompt, payload) => {
  const response = await fetchImageGeneration({
    apiKey: payload.globalSettings.apiKey as string,
    baseUrl: (payload.globalSettings.baseUrl as string).trim().replace(/\/$/, ''),
    body: {
      prompt,
      n: 1,
      size: '512x512',
      response_format: 'url', // TODO: support 'b64_json'
    },
  })
  if (!response.ok) {
    const responseJson = await response.json()
    const errMessage = responseJson.error?.message || response.statusText || 'Unknown error'
    throw new Error(errMessage)
  }
  const resJson = await response.json()
  return resJson.data[0].url
}

export const handleRapidPrompt: Provider['handleRapidPrompt'] = async(prompt, globalSettings) => {
  const rapidPromptPayload = {
    conversationId: 'temp',
    globalSettings: {
      ...globalSettings,
      model: 'gpt-3.5-turbo',
      temperature: 0.4,
      maxTokens: 2048,
      top_p: 1,
      stream: false,
    },
    conversationSettings: {},
    systemRole: '',
    mockMessages: [],
  } as HandlerPayload
  const result = await handleChatCompletion([{ role: 'user', content: prompt }], rapidPromptPayload)
  if (typeof result === 'string')
    return result
  return ''
}

const handleChatCompletion = async(messages: Message[], payload: HandlerPayload, signal?: AbortSignal) => {
  const response = await fetchChatCompletion({
    apiKey: payload.globalSettings.apiKey as string,
    baseUrl: (payload.globalSettings.baseUrl as string).trim().replace(/\/$/, ''),
    body: {
      model: payload.globalSettings.model as string,
      messages,
      temperature: payload.globalSettings.temperature as number,
      max_tokens: payload.globalSettings.maxTokens as number,
      top_p: payload.globalSettings.topP as number,
      stream: payload.globalSettings.stream as boolean ?? true,
    },
    signal,
  })
  if (!response.ok) {
    const responseJson = await response.json()
    console.log('responseJson', responseJson)
    const errMessage = responseJson.error?.message || response.statusText || 'Unknown error'
    throw new Error(errMessage, { cause: responseJson.error })
  }
  const isStream = response.headers.get('content-type')?.includes('text/event-stream')
  if (isStream) {
    return parseStream(response)
  } else {
    const resJson = await response.json()
    return resJson.choices[0].message.content as string
  }
}
