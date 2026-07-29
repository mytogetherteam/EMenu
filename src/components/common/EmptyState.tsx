import type { ReactNode } from 'react'
import { cn } from '@/helpers/cn'

type EmptyStateProps = {
  title?: string
  description?: string
  action?: ReactNode
  className?: string
}

export function EmptyState({
  title = 'Nothing here yet',
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div className={cn('flex flex-col items-center gap-3 px-4 py-12 text-center', className)}>
      <p className="font-semibold">{title}</p>
      {description ? <p className="max-w-sm text-sm text-fg-muted">{description}</p> : null}
      {action}
    </div>
  )
}
