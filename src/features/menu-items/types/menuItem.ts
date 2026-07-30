import type { z } from 'zod'
import type { menuItemSchema } from '@/features/menu-items/schemas/menuItemSchema'

export type MenuItem = z.infer<typeof menuItemSchema>
