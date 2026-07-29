import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Merge conditional Tailwind classes — later classes win over earlier ones
 * in the same utility group (AGENTS.md §4).
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}
