import { Slider } from '../ui/base/Slider'
import SettingsNotDefined from './SettingsNotDefined'
import type { SettingsUI, SettingsUISlider } from '@/types/provider'
import type { Accessor, Setter } from 'solid-js'

interface Props {
  settings: SettingsUI
  editing: Accessor<boolean>
  value: Accessor<number>
  setValue: Setter<number>
}

export default ({ settings, editing, value, setValue }: Props) => {
  if (!settings.name || !settings.type) return null
  const sliderSettings = settings as SettingsUISlider

  if (!value())
    setValue(sliderSettings.value)
  return (
    <div>
      <div class="mt-1 text-sm">
        {editing() && (
          <Slider
            label={settings.name}
            desc={settings.description}
            setValue={setValue}
            max={sliderSettings.max}
            value={value}
            min={sliderSettings.min}
            step={sliderSettings.step}
          />
        )}
        {!editing() && value() && (
          <Slider
            label={settings.name}
            setValue={setValue}
            max={sliderSettings.max}
            value={value}
            min={sliderSettings.min}
            step={sliderSettings.step}
            disabled
          />
        )}
        {!editing() && !value() && (
        <>
          <div class="text-xs op-50">{sliderSettings.name}</div>
          <SettingsNotDefined />
        </>

        )}
      </div>
    </div>
  )
}
