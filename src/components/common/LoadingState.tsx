import { cn } from '@/helpers/cn'

type LoadingStateProps = {
  label?: string
  className?: string
}

/** Full-viewport centered loader — uses `/loading.gif`. */
export function LoadingState({ label = 'Loading…', className }: LoadingStateProps) {
  return (
    <div
      className={cn(
        'flex min-h-[70vh] flex-col items-center justify-center gap-4 px-4 text-center',
        className,
      )}
      role="status"
      aria-live="polite"
    >
      <img
        src="/loading.gif"
        alt=""
        width={120}
        height={120}
        className="size-28 object-contain"
        aria-hidden="true"
      />
      <p className="text-sm text-fg">{label}</p>
    </div>
  )
}
