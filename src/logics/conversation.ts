import { getProviderById } from '@/stores/provider'
import { clearMessagesByConversationId, getMessagesByConversationId, pushMessagesByConversationId } from '@/stores/messages'
import type { PromptResponse, Provider } from '@/types/provider'
import type { Conversation, ConversationType } from '@/types/conversation'
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

  pushMessagesByConversationId(conversation.id, [{
    role: 'user',
    content: prompt,
  }])

  const providerResponse: PromptResponse = await callProviderHandler({
    conversationType: conversation.conversationType,
    provider,
    prompt,
    historyMessages: getMessagesByConversationId(conversation.id),
  })

  pushMessagesByConversationId(conversation.id, [{
    role: 'assistant',
    content: providerResponse || '',
  }])
}

interface CallProviderPayload {
  conversationType: ConversationType
  provider: Provider
  prompt: string
  historyMessages: Message[]
}

const callProviderHandler = async(payload: CallProviderPayload) => {
  const { conversationType, provider, prompt, historyMessages } = payload
  let response: PromptResponse
  try {
    if (conversationType === 'single')
      response = await provider.handleSinglePrompt?.(prompt)
    else if (conversationType === 'continuous')
      response = await provider.handleContinuousPrompt?.(historyMessages)

    console.log(response)
    return response
  } catch (e) {
    console.error(e)
    return null
  }
}
