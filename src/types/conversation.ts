export type ConversationType = 'single' | 'continuous' | 'image'

export interface ConversationMessage {
  role: 'system' | 'user' | 'assistant'
  content: string
}
