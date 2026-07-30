import type { OperatingHour } from '@/features/shops/types/shop'

const DAY_LABELS = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
] as const

/** Matches API / JS `Date.getDay()` — 0 Sunday … 6 Saturday. */
export function getTodayDayOfWeek(now: Date = new Date()): number {
  return now.getDay()
}

export function getDayLabel(dayOfWeek: number): string {
  return DAY_LABELS[dayOfWeek] ?? `Day ${dayOfWeek}`
}

export function formatClockTime(hour: number, minute: number): string {
  const h = String(hour).padStart(2, '0')
  const m = String(minute).padStart(2, '0')
  return `${h}:${m}`
}

/** Today's row only — undefined when the shop has no hours for this weekday. */
export function getTodayOperatingHour(
  hours: OperatingHour[] | undefined,
  now: Date = new Date(),
): OperatingHour | undefined {
  if (!hours?.length) return undefined
  const today = getTodayDayOfWeek(now)
  return hours.find((row) => row.dayOfWeek === today)
}

export function formatTodayHoursLabel(hour: OperatingHour): string {
  if (hour.isClosed) return 'Closed today'
  return `${formatClockTime(hour.openTimeHour, hour.openTimeMin)} – ${formatClockTime(hour.closeTimeHour, hour.closeTimeMin)}`
}
