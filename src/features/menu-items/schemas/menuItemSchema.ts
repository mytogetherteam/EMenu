import { z } from 'zod'

const nullableString = z.string().nullable().optional()

export const menuItemSchema = z
  .object({
    id: z.number(),
    nameEn: z.string(),
    nameMm: nullableString,
    nameTh: nullableString,
    descriptionEn: nullableString,
    descriptionMm: nullableString,
    imageUrl: nullableString,
    price: z.number().optional(),
    originalPrice: z.number().nullable().optional(),
    categoryName: nullableString,
    menuCategoryName: nullableString,
    isAvailable: z.boolean().optional(),
  })
  .passthrough()

export const menuItemListResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  data: z.object({
    content: z.array(menuItemSchema),
    totalElements: z.number(),
    totalPages: z.number(),
    page: z.number(),
    size: z.number(),
  }),
})
