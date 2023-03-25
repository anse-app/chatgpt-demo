import { getProviderById } from '@/stores/provider'
import { addMessageOnConversation, clearMessagesOnConversation } from '@/stores/conversation'

// interface ChatMessageHandler {
//   addPrompt: (prompt: string) => void
//   addResponse: (response: string) => void
// }

export const handlePrompt = async(conversationId: string, prompt: string) => {
  // const provider = getProviderById(conversation?.providerId)
  const provider = getProviderById('provider-openai')
  // console.log('provider', provider)
  if (!provider) return

  clearMessagesOnConversation(conversationId)

  addMessageOnConversation(conversationId, {
    role: 'user',
    content: prompt,
  })

  const providerResponse = await provider.handleSinglePrompt?.(prompt).catch((e: Error) => {
    console.error(e)
  })
  console.log(providerResponse)

  addMessageOnConversation(conversationId, {
    role: 'assistant',
    content: providerResponse || 'no response',
  })
}

export default () => {
  return null
}
