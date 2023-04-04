import { getProviderById } from '@/stores/provider'
import { clearMessagesByConversationId, getMessagesByConversationId, pushMessageByConversationId } from '@/stores/messages'
import { getSettingsByProviderId } from '@/stores/settings'
import type { HandlerPayload, PromptResponse, Provider } from '@/types/provider'
import type { Conversation } from '@/types/conversation'
import type { Message } from '@/types/message'

export const handlePrompt = async(conversation: Conversation, prompt: string) => {
  const provider = getProviderById(conversation?.providerId)
  if (!provider) return

  if (conversation.conversationType !== 'continuous')
    clearMessagesByConversationId(conversation.id)
  // if (!conversation.messages.length && !conversation.name) {
  //   updateConversationById(conversation.id, {
  //     name: prompt,
  //   })
  // }

  pushMessageByConversationId(conversation.id, {
    id: `${conversation.id}:user:${Date.now()}`,
    role: 'user',
    content: prompt,
  })

  const providerResponse: PromptResponse = await callProviderHandler({
    conversation,
    provider,
    prompt,
    historyMessages: getMessagesByConversationId(conversation.id),
  })

  pushMessageByConversationId(conversation.id, {
    id: `${conversation.id}:assistant:${Date.now()}`,
    role: 'assistant',
    content: typeof providerResponse === 'string' ? providerResponse : '',
    stream: providerResponse instanceof ReadableStream ? providerResponse : undefined,
  })
}

interface CallProviderPayload {
  conversation: Conversation
  provider: Provider
  prompt: string
  historyMessages: Message[]
}

const callProviderHandler = async(payload: CallProviderPayload) => {
  const { conversation, provider, prompt, historyMessages } = payload
  let response: PromptResponse
  const handlerPayload: HandlerPayload = {
    conversationId: conversation.id,
    globalSettings: getSettingsByProviderId(provider.id),
    conversationSettings: {},
    systemRole: '',
    mockMessages: [],
  }
  try {
    if (conversation.conversationType === 'single') {
      response = await provider.handleSinglePrompt?.(prompt, handlerPayload)
    } else if (conversation.conversationType === 'continuous') {
      const messages = historyMessages.map(message => ({
        role: message.role,
        content: message.content,
      }))
      response = await provider.handleContinuousPrompt?.(messages, handlerPayload)
    } else if (conversation.conversationType === 'image') {
      response = await provider.handleImagePrompt?.(prompt, handlerPayload)
    }

    return response
  } catch (e) {
    console.error(e)
    return null
  }
}
