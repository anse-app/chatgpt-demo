import { atom, map } from 'nanostores'

export interface ClientOptionProps {
  apiKey: string
  darkMode?: boolean
  httpProxy?: string
  apiBaseUrl?: string
  headScripts?: string
  sitePassword?: string
  userName?: string
  gptName?: string
}

export interface GPTOptionProps {
  // https://platform.openai.com/docs/api-reference/chat/create
  model: string
  temperature?: number
  topP?: number
  n?: number
  stream?: boolean
  stop?: string[] | null
  maxTokens?: number
  presencePenalty?: number
  frequencyPenalty?: number
  logitBias?: Record<string, number> | null
  user?: string | null
}

export type SettingsPropsKey = 'Client' | 'GPT'

export interface SettingProps {
  client: ClientOptionProps
  gpt: GPTOptionProps
}

export const settings = map<SettingProps>({
  client: {
    apiKey: '',
    darkMode: true,
    httpProxy: '',
    apiBaseUrl: 'https://api.openai.com',
    headScripts: '',
    sitePassword: '',
    userName: 'user',
    gptName: 'system',
  },
  gpt: {
    model: 'gpt-3.5-turbo',
    temperature: 1,
    topP: 1,
    n: 1,
    stream: true,
    stop: null,
    maxTokens: Infinity,
    presencePenalty: 0,
    frequencyPenalty: 0,
    logitBias: null,
    user: null,
  },
})

export const settingsKey = atom<SettingsPropsKey>('Client')
