export interface Provider {
  name: string
  settingsUI?: SettingsUI[]
  handlePrompt: (prompt: string) => Promise<string>
}

export interface SettingsUI {
  name: string
}
