import type { GetPostsParams } from '@/features/posts/types/post'

export const postKeys = {
  all: ['posts'] as const,
  list: (params: GetPostsParams) => [...postKeys.all, 'list', params] as const,
  detail: (id: number) => [...postKeys.all, 'detail', id] as const,
}
