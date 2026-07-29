import { Button } from '@/components/ui/Button'
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
    <div
      className={cn('flex flex-col items-center gap-3 px-4 py-12 text-center', className)}
      role="alert"
    >
      <p className="font-semibold">{title}</p>
      {message ? <p className="max-w-sm text-sm text-fg-muted">{message}</p> : null}
      {onRetry ? (
        <Button variant="secondary" size="sm" onClick={onRetry}>
          Try again
        </Button>
      ) : null}
    </div>
  )
}
