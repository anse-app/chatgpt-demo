export interface Message {
  role: 'system' | 'user' | 'assistant'
  content: string
}

/** Used in app */
export interface MessageInstance extends Message {
  id: string
  stream?: ReadableStream
}

export interface ErrorMessage {
  code: string
  message: string
}
