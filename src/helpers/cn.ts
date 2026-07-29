type ClassValue = string | number | null | undefined | false | ClassValue[]

/**
 * Merge conditional class names into a single string.
 * Swap the body for `twMerge(clsx(inputs))` if Tailwind is added to the project.
 */
export function cn(...inputs: ClassValue[]): string {
  const out: string[] = []

  for (const input of inputs) {
    if (!input && input !== 0) continue
    if (Array.isArray(input)) {
      const nested = cn(...input)
      if (nested) out.push(nested)
    } else {
      out.push(String(input))
    }
  }

  return out.join(' ')
}
