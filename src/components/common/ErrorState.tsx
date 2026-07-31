import { Button } from '@/components/ui/Button'
import { cn } from '@/helpers/cn'

type ErrorStateProps = {
  title?: string
  description?: string
  error?: unknown
  onRetry?: () => void
  /** Optional illustration (e.g. `/login-bg.png`). */
  imageSrc?: string
  imageAlt?: string
  className?: string
}

function resolveMessage(error: unknown): string | undefined {
  if (error instanceof Error) return error.message
  if (typeof error === 'string') return error
  return undefined
}

/** Full-viewport centered error — title, message, optional Try again. */
export function ErrorState({
  title = 'Something went wrong',
  description,
  error,
  onRetry,
  imageSrc,
  imageAlt = '',
  className,
}: ErrorStateProps) {
  const message = description ?? resolveMessage(error)

  return (
    <div
      className={cn(
        'flex min-h-[70vh] flex-col items-center justify-center gap-3 px-4 text-center',
        className,
      )}
      role="alert"
    >
      {imageSrc ? (
        <img
          src={imageSrc}
          alt={imageAlt}
          width={480}
          height={360}
          className="mb-2 w-full max-w-xs rounded-2xl object-cover shadow-lg sm:max-w-sm md:max-w-md"
        />
      ) : null}
      <p className="text-lg font-semibold">{title}</p>
      {message ? <p className="max-w-sm text-sm opacity-70">{message}</p> : null}
      {onRetry ? (
        <Button variant="secondary" size="sm" className="mt-2" onClick={onRetry}>
          Try again
        </Button>
      ) : null}
    </div>
  )
}
