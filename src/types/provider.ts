export type ConversationType = 'single' | 'continuous' | 'image'

export interface Provider {
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
  handleContinuousPrompt?: (prompt: string) => Promise<PromptResponse>
  /** Handle a prompt in image conversation type */
  handleImagePrompt?: (prompt: string) => Promise<PromptResponse>
}

// TODO: Support stream response
type PromptResponse = string

interface SettingsUIBase {
  name: string
  description?: string
}

interface SettingsUIInput extends SettingsUIBase {
  type: 'input'
}

interface SettingsUISelect extends SettingsUIBase {
  type: 'select'
  options: string[]
}

export type SettingsUI = SettingsUIInput | SettingsUISelect
