import { cn } from '@/helpers/cn'

type LoadingStateProps = {
  label?: string
  className?: string
}

export function LoadingState({ label = 'Loading…', className }: LoadingStateProps) {
  return (
    <div
      className={cn('flex flex-col items-center gap-3 px-4 py-12 text-center', className)}
      role="status"
      aria-live="polite"
    >
      <span
        className="size-6 animate-spin rounded-full border-2 border-line border-t-primary-500"
        aria-hidden="true"
      />
      <p className="text-sm text-fg-muted">{label}</p>
    </div>
  )
}
