import { adaptorSettingsUIList } from '@/stores/ui'
import { useStore } from '@nanostores/solid'

export default () => {
  const $adaptorSettingsUIList = useStore(adaptorSettingsUIList)

  return (
    <>
      <div class="h-12 border-b border-base flex px-4 items-center">
        Settings
      </div>
      { $adaptorSettingsUIList().map(item => (
        <div>{ item.name }</div>
      )) }
    </>
  )
}
