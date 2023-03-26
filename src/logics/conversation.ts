import { getProviderById } from '@/stores/provider'
import { addMessageOnConversation, clearMessagesOnConversation, updateConversationById } from '@/stores/conversation'
import type { PromptResponse, Provider } from '@/types/provider'
import type { ConversationInstance, ConversationMessage, ConversationType } from '@/types/conversation'

export const handlePrompt = async(conversation: ConversationInstance, prompt: string) => {
  const provider = getProviderById(conversation?.providerId)
  if (!provider) return

  if (conversation.conversationType !== 'continuous')
    clearMessagesOnConversation(conversation.id)
  if (!conversation.messages.length && !conversation.name) {
    updateConversationById(conversation.id, {
      name: prompt,
    })
  }

  addMessageOnConversation(conversation.id, {
    role: 'user',
    content: prompt,
  })

  const providerResponse: PromptResponse = await callProviderHandler({
    conversationType: conversation.conversationType,
    provider,
    prompt,
    historyMessages: conversation.messages,
  })

  addMessageOnConversation(conversation.id, {
    role: 'assistant',
    content: providerResponse || '',
  })
}

interface CallProviderPayload {
  conversationType: ConversationType
  provider: Provider
  prompt: string
  historyMessages: ConversationMessage[]
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
