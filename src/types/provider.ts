import type { ConversationType } from './conversation'
import type { Message } from '@/types/message'

export interface Provider {
  id: string
  /** Icon of provider. Only support `@unocss/preset-icons` class name for now */
  icon?: string
  /** Name of provider */
  name: string
  /** Global settings of the provider */
  platformSettings?: SettingsUI[]
  /** Settings for each conversation */
  conversationSettings?: SettingsUI[]
  supportConversationType: ConversationType[]
  /** Handle a prompt in single conversation type */
  handleSinglePrompt?: (prompt: string) => Promise<PromptResponse>
  /** Handle a prompt in continuous conversation type */
  handleContinuousPrompt?: (messages: Message[]) => Promise<PromptResponse>
  /** Handle a prompt in image conversation type */
  handleImagePrompt?: (prompt: string) => Promise<PromptResponse>
}

// TODO: Support stream response
export type PromptResponse = string | null | undefined

interface SettingsUIBase {
  name: string
  description?: string
}

export interface SettingsApiKey extends SettingsUIBase {
  type: 'api-key'
}

export interface SettingsUIInput extends SettingsUIBase {
  type: 'input'
}

export interface SettingsUISelect extends SettingsUIBase {
  type: 'select'
  options: string[]
}

export type SettingsUI = SettingsApiKey | SettingsUIInput | SettingsUISelect
