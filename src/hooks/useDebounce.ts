import { useEffect, useState } from 'react'
import { SEARCH_DEBOUNCE_MS } from '@/constants/appConfig'

/** Global hook — used by any feature that has a search/filter input (AGENTS.md §6). */
export function useDebounce<TValue>(value: TValue, delay: number = SEARCH_DEBOUNCE_MS): TValue {
  const [debounced, setDebounced] = useState(value)

  useEffect(() => {
    const timer = window.setTimeout(() => setDebounced(value), delay)
    return () => window.clearTimeout(timer)
  }, [value, delay])

  return debounced
}
