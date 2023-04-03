import { createStores, rebuildStores } from '@/stores/storage/db'

const buildStores = async() => {
  await createStores()
  await rebuildStores()
}

export default () => {
  buildStores()
  return null
}
