import type { z } from 'zod'
import type {
  operatingHourSchema,
  shopSchema,
} from '@/features/shops/schemas/shopSchema'

export type Shop = z.infer<typeof shopSchema>
export type OperatingHour = z.infer<typeof operatingHourSchema>
