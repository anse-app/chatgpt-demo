import type { ErrorMessage } from '@/types'
import IconRefresh from './icons/Refresh'

interface Props {
  data: ErrorMessage
  onRetry?: () => void
}

export default ({ data, onRetry }: Props) => {
  return (
    <div class="my-4 px-4 py-3 border border-red/50 bg-red/10">
      {data.code && <div class="text-red mb-1">{data.code}</div>}
      <div class="text-red op-70 text-sm">{data.message}</div>
      {onRetry && (
        <div class="fie px-3 mb-2">
          <div onClick={onRetry} class="gpt-retry-btn border-red/50 text-red">
            <IconRefresh />
            <span>Regenerate</span>
          </div>
        </div>
      )}
    </div>
  )
}
