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
  /** The types of conversations supported by the Provider. */
  supportConversationType: ConversationType[]
  /** Whether the Provider can accept frontend or backend calls, or both. */
  supportCallMethod?: 'both' | 'frontend' | 'backend'
  /** Handle a prompt in single conversation type */
  handleSinglePrompt?: (prompt: string, payload: HandlerPayload, signal?: AbortSignal) => Promise<PromptResponse>
  /** Handle a prompt in continuous conversation type */
  handleContinuousPrompt?: (messages: Message[], payload: HandlerPayload, signal?: AbortSignal) => Promise<PromptResponse>
  /** Handle a prompt in image conversation type */
  handleImagePrompt?: (prompt: string, payload: HandlerPayload, signal?: AbortSignal) => Promise<string>
  /** Handle a temporary, rapidly prompt, used for interface display like conversation title's generation */
  handleRapidPrompt?: (prompt: string, globalSettings: SettingsPayload) => Promise<string>
}

export type SettingsPayload = Record<string, string | number | boolean>

/* Payload for `callProviderHandler` */
export interface CallProviderPayload {
  conversationMeta: {
    id: string
    conversationType: string
  }
  globalSettings: SettingsPayload
  providerId: string
  prompt: string
  historyMessages: Message[]
}

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

export interface SelectOptionType {
  value: any
  label: string
  icon?: string
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

export interface SettingsUIToggle extends SettingsUIBase {
  type: 'toggle'
}

export type SettingsUI = SettingsApiKey | SettingsUIInput | SettingsUISelect | SettingsUISlider | SettingsUIToggle
