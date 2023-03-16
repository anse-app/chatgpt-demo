export interface ChatMessage {
  role: 'system' | 'user' | 'assistant'
  content: string
}

export interface ErrorMessage {
  code: string
  message: string
}
