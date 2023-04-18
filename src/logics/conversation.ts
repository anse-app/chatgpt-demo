import { getProviderById } from '@/stores/provider'
import { updateConversationById } from '@/stores/conversation'
import { clearMessagesByConversationId, getMessagesByConversationId, pushMessageByConversationId } from '@/stores/messages'
import { getGeneralSettings, getSettingsByProviderId } from '@/stores/settings'
import { setLoadingStateByConversationId, setStreamByConversationId } from '@/stores/streams'
import { currentErrorMessage } from '@/stores/ui'
import { generateRapidProviderPayload, promptHelper } from './helper'
import type { CallProviderPayload, HandlerPayload, PromptResponse } from '@/types/provider'
import type { Conversation } from '@/types/conversation'
import type { ErrorMessage } from '@/types/message'

export const handlePrompt = async(conversation: Conversation, prompt: string) => {
  const generalSettings = getGeneralSettings()
  const provider = getProviderById(conversation?.providerId)
  if (!provider) return
  let callMethod = generalSettings.requestWithBackend ? 'backend' : 'frontend' as 'frontend' | 'backend'
  if (provider.supportCallMethod === 'frontend' || provider.supportCallMethod === 'backend')
    callMethod = provider.supportCallMethod

  if (conversation.conversationType !== 'continuous')
    clearMessagesByConversationId(conversation.id)

  pushMessageByConversationId(conversation.id, {
    id: `${conversation.id}:user:${Date.now()}`,
    role: 'user',
    content: prompt,
    dateTime: new Date().getTime(),
  })

  setLoadingStateByConversationId(conversation.id, true)
  let providerResponse: PromptResponse
  const providerPayload: CallProviderPayload = {
    conversationMeta: {
      id: conversation.id,
      conversationType: conversation.conversationType,
    },
    globalSettings: getSettingsByProviderId(conversation.providerId),
    providerId: conversation.providerId,
    prompt,
    historyMessages: getMessagesByConversationId(conversation.id),
  }
  try {
    providerResponse = await getProviderResponse(callMethod, providerPayload)
  } catch (e) {
    const error = e as Error
    const cause = error?.cause as ErrorMessage
    console.error(e)
    currentErrorMessage.set({
      code: cause?.code || 'provider_error',
      message: cause?.message || error.message || 'Unknown error',
    })
  }

  if (providerResponse) {
    const messageId = `${conversation.id}:assistant:${Date.now()}`
    if (providerResponse instanceof ReadableStream) {
      setStreamByConversationId(conversation.id, {
        messageId,
        stream: providerResponse,
      })
    }
    pushMessageByConversationId(conversation.id, {
      id: messageId,
      role: 'assistant',
      content: typeof providerResponse === 'string' ? providerResponse : '',
      stream: providerResponse instanceof ReadableStream,
      dateTime: new Date().getTime(),
    })
  }
  setLoadingStateByConversationId(conversation.id, false)

  // Update conversation title
  if (providerResponse && conversation.conversationType === 'continuous' && !conversation.name) {
    const rapidPayload = generateRapidProviderPayload(promptHelper.summarizeText(prompt), conversation.providerId)
    const generatedTitle = await getProviderResponse(callMethod, rapidPayload).catch(() => {}) as string || prompt
    updateConversationById(conversation.id, {
      name: generatedTitle,
    })
  }
}

const getProviderResponse = async(caller: 'frontend' | 'backend', payload: CallProviderPayload) => {
  if (caller === 'frontend') {
    return callProviderHandler(payload)
  } else {
    const backendResponse = await fetch('/api/handle', {
      method: 'POST',
      body: JSON.stringify(payload),
    })
    if (!backendResponse.ok) {
      const error = await backendResponse.json()
      throw new Error('Request failed', {
        cause: error?.error,
      })
    }
    if (backendResponse.headers.get('content-type')?.includes('text/plain'))
      return backendResponse.text()
    else
      return backendResponse.body
  }
}

// Called by both client and server
export const callProviderHandler = async(payload: CallProviderPayload) => {
  console.log('callProviderHandler', payload)

  const { conversationMeta, providerId, prompt, historyMessages } = payload
  const provider = getProviderById(providerId)
  if (!provider) return

  let response: PromptResponse
  const handlerPayload: HandlerPayload = {
    conversationId: conversationMeta.id,
    globalSettings: payload.globalSettings,
    conversationSettings: {},
    systemRole: '',
    mockMessages: [],
  }
  if (conversationMeta.conversationType === 'single') {
    response = await provider.handleSinglePrompt?.(prompt, handlerPayload)
  } else if (conversationMeta.conversationType === 'continuous') {
    const messages = historyMessages.map(message => ({
      role: message.role,
      content: message.content,
    }))
    response = await provider.handleContinuousPrompt?.(messages, handlerPayload)
  } else if (conversationMeta.conversationType === 'image') {
    response = await provider.handleImagePrompt?.(prompt, handlerPayload)
  } else if (conversationMeta.conversationType === 'rapid') {
    response = await provider.handleRapidPrompt?.(prompt, handlerPayload.globalSettings)
  }

  return response
}
