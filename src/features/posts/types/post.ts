import type { z } from 'zod'
import type { postSchema } from '@/features/posts/schemas/postSchema'

/** Derived from the schema — never hand-written (AGENTS.md §2). */
export type Post = z.infer<typeof postSchema>

export type GetPostsParams = {
  limit: number
}
