import { useMemo } from 'react'
import type { Post } from '@/features/posts/types/post'

/** Filtering only — one hook, one responsibility (AGENTS.md §3). */
export function useFilteredPosts(posts: Post[] | undefined, search: string): Post[] | undefined {
  return useMemo(() => {
    if (!posts) return undefined

    const term = search.trim().toLowerCase()
    if (!term) return posts

    return posts.filter(
      (post) =>
        post.title.toLowerCase().includes(term) || post.body.toLowerCase().includes(term),
    )
  }, [posts, search])
}
