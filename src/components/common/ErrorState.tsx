import { cn } from '@/helpers/cn'

type ErrorStateProps = {
  title?: string
  description?: string
  error?: unknown
  onRetry?: () => void
  className?: string
}

function resolveMessage(error: unknown): string | undefined {
  if (error instanceof Error) return error.message
  if (typeof error === 'string') return error
  return undefined
}

export function ErrorState({
  title = 'Something went wrong',
  description,
  error,
  onRetry,
  className,
}: ErrorStateProps) {
  const message = description ?? resolveMessage(error)

  return (
    <div className={cn('state-view state-view--error', className)} role="alert">
      <p className="state-view__title">{title}</p>
      {message ? <p className="state-view__description">{message}</p> : null}
      {onRetry ? (
        <button type="button" className="state-view__action" onClick={onRetry}>
          Try again
        </button>
      ) : null}
    </div>
  )
}
