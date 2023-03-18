import { sidebar } from '@/strores/ui'
import Modal from './Modal'

export default () => {
  return (
    <>
      <Modal bindValue={sidebar} direction="left">
        <div class="w-[70vw]" />
      </Modal>
      {/* <Modal bindValue={sidebar} direction="left">
        <div class="w-[70vw]" />
      </Modal> */}
    </>
  )
}
