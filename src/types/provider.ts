import type { ConversationType } from './conversation'
import type { Message } from '@/types/message'

export interface Provider {
  id: string
  /** Icon of provider. Only support `@unocss/preset-icons` class name for now */
  icon?: string
  /** Name of provider */
  name: string
  /** Global settings of the provider */
  globalSettings?: SettingsUI[]
  /** Settings for each conversation */
  conversationSettings?: SettingsUI[]
  supportConversationType: ConversationType[]
  /** Handle a prompt in single conversation type */
  handleSinglePrompt?: (prompt: string, payload: HandlerPayload) => Promise<PromptResponse>
  /** Handle a prompt in continuous conversation type */
  handleContinuousPrompt?: (messages: Message[], payload: HandlerPayload) => Promise<PromptResponse>
  /** Handle a prompt in image conversation type */
  handleImagePrompt?: (prompt: string, payload: HandlerPayload) => Promise<PromptResponse>
}

export type SettingsPayload = Record<string, string | number | boolean>

export interface HandlerPayload {
  conversationId: string
  globalSettings: SettingsPayload
  conversationSettings: SettingsPayload
  systemRole: string
  mockMessages: Message[]
}

export type PromptResponse = string | ReadableStream | null | undefined

interface SettingsUIBase {
  key: string
  name: string
  description?: string
  default?: string | number | boolean
}

interface SelectOptionType {
  value: any
  label: string
}

export interface SettingsApiKey extends SettingsUIBase {
  type: 'api-key'
}

export interface SettingsUIInput extends SettingsUIBase {
  type: 'input'
}

export interface SettingsUISelect extends SettingsUIBase {
  type: 'select'
  options: SelectOptionType[]
}

export interface SettingsUISlider extends SettingsUIBase {
  type: 'slider'
  min: number
  max: number
  step: number
}

export type SettingsUI = SettingsApiKey | SettingsUIInput | SettingsUISelect | SettingsUISlider
