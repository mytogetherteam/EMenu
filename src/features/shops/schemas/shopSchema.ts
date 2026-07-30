import { z } from 'zod'

const nullableString = z.string().nullable().optional()

export const operatingHourSchema = z.object({
  id: z.number(),
  shopId: z.number(),
  dayOfWeek: z.number(),
  openTimeHour: z.number(),
  openTimeMin: z.number(),
  closeTimeHour: z.number(),
  closeTimeMin: z.number(),
  isClosed: z.boolean(),
})

export const shopSchema = z
  .object({
    id: z.number(),
    nameEn: z.string(),
    nameMm: nullableString,
    nameTh: nullableString,
    slug: nullableString,
    coverUrl: nullableString,
    logoUrl: nullableString,
    descriptionEn: nullableString,
    descriptionMm: nullableString,
    addressEn: nullableString,
    addressMm: nullableString,
    phone: nullableString,
    email: nullableString,
    isOpen: z.boolean().optional(),
    isActive: z.boolean().optional(),
    ratingAvg: z.number().optional(),
    ratingCount: z.number().optional(),
    isFavorite: z.boolean().optional(),
    operatingHours: z.array(operatingHourSchema).optional(),
    shopCategory: z
      .object({
        id: z.number().optional(),
        nameEn: z.string().optional(),
        nameMm: z.string().nullable().optional(),
      })
      .passthrough()
      .nullable()
      .optional(),
  })
  .passthrough()

export const shopBySlugResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  data: shopSchema,
})
