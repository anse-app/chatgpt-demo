export interface Message {
  role: 'system' | 'user' | 'assistant'
  content: string
}

/** Used in app */
export interface MessageInstance extends Message {
  id: string
  stream?: boolean
  dateTime?: number
}

export interface ErrorMessage {
  code: string
  message: string
}

export interface StreamInstance {
  messageId: string
  stream: ReadableStream
}
