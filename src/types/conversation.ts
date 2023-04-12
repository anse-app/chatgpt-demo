export type ConversationType = 'single' | 'continuous' | 'image'

export interface Conversation {
  id: string
  providerId: string
  conversationType: ConversationType
  name: string
  icon: string
  lastUseTime: number
}
