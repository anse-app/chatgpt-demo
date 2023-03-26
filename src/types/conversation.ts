export type ConversationType = 'single' | 'continuous' | 'image'

export interface ConversationMessage {
  role: 'system' | 'user' | 'assistant'
  content: string
}

export interface ConversationInstance {
  id: string
  providerId: string
  conversationType: ConversationType
  name: string
  icon: string
  messages: ConversationMessage[]
}
