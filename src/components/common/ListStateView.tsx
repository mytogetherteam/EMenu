import type { ReactNode } from 'react'
import { EmptyState } from '@/components/common/EmptyState'
import { ErrorState } from '@/components/common/ErrorState'
import { LoadingState } from '@/components/common/LoadingState'

type ListStateViewProps<TItem> = {
  isLoading: boolean
  isError?: boolean
  error?: unknown
  data: TItem[] | undefined
  onRetry?: () => void
  /** Feature-specific skeleton; falls back to the shared LoadingState. */
  loading?: ReactNode
  empty?: ReactNode
  /** Receives a guaranteed non-empty array — never re-check emptiness inside. */
  children: (items: TItem[]) => ReactNode
}

/**
 * The only sanctioned way to render an async collection.
 * Hand-rolled `isLoading ? … : isError ? … : items.length === 0 ? …` chains are banned.
 */
export function ListStateView<TItem>({
  isLoading,
  isError = false,
  error,
  data,
  onRetry,
  loading,
  empty,
  children,
}: ListStateViewProps<TItem>) {
  if (isLoading) return <>{loading ?? <LoadingState />}</>

  if (isError) return <ErrorState error={error} onRetry={onRetry} />

  if (!data || data.length === 0) return <>{empty ?? <EmptyState />}</>

  return <>{children(data)}</>
}
