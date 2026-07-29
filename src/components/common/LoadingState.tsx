import { cn } from '@/helpers/cn'

type LoadingStateProps = {
  label?: string
  className?: string
}

export function LoadingState({ label = 'Loading…', className }: LoadingStateProps) {
  return (
    <div className={cn('state-view state-view--loading', className)} role="status" aria-live="polite">
      <span className="state-view__spinner" aria-hidden="true" />
      <p className="state-view__label">{label}</p>
    </div>
  )
}
