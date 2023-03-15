import { sidebar } from '@/strores/ui'
import Model from './Model'

export default () => {
  return (
    <>
      <Model bindValue={sidebar} direction="left">
        <div class="w-[70vw]" />
      </Model>
    </>
  )
}
