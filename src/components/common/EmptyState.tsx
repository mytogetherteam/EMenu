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
    <div className={cn('state-view state-view--empty', className)}>
      <p className="state-view__title">{title}</p>
      {description ? <p className="state-view__description">{description}</p> : null}
      {action}
    </div>
  )
}
