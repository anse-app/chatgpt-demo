export interface OpenAIFetchChatCompletionPayload {
  apiKey: string
  baseUrl: string
  body: Record<string, any>
}

export const fetchChatCompletion = async(payload: OpenAIFetchChatCompletionPayload) => {
  const initOptions = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${payload.apiKey}`,
    },
    method: 'POST',
    body: JSON.stringify(payload.body),
  }
  return fetch(`${payload.baseUrl}/v1/chat/completions`, initOptions)
}
