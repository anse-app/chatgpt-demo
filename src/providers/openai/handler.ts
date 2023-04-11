import { fetchChatCompletion, fetchImageGeneration } from './api'
import { parseStream } from './parser'
import type { Message } from '@/types/message'
import type { HandlerPayload, Provider } from '@/types/provider'

export const handleSinglePrompt: Provider['handleSinglePrompt'] = async(prompt, payload) => {
  return handleChatCompletion([{ role: 'user', content: prompt }], payload)
}

export const handleContinuousPrompt: Provider['handleContinuousPrompt'] = async(messages, payload) => {
  return handleChatCompletion(messages, payload)
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
    const errMessage = responseJson.error?.message || 'Unknown error'
    throw new Error(errMessage)
  }
  const resJson = await response.json()
  return resJson.data[0].url
}

const handleChatCompletion = async(messages: Message[], payload: HandlerPayload) => {
  const response = await fetchChatCompletion({
    apiKey: payload.globalSettings.apiKey as string,
    baseUrl: (payload.globalSettings.baseUrl as string).trim().replace(/\/$/, ''),
    body: {
      model: payload.globalSettings.model as string,
      messages,
      temperature: payload.globalSettings.temperature as number,
      max_tokens: payload.globalSettings.maxTokens as number,
      top_p: payload.globalSettings.topP as number,
      stream: true,
    },
  })
  if (!response.ok) {
    const responseJson = await response.json()
    const errMessage = responseJson.error?.message || 'Unknown error'
    throw new Error(errMessage, { cause: responseJson.error })
  }
  const isStream = response.headers.get('content-type')?.includes('text/event-stream')
  if (isStream) {
    return parseStream(response)
  } else {
    const resJson = await response.json()
    return resJson.choices[0].message.content
  }
}
