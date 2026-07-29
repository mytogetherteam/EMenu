import { useQuery } from '@tanstack/react-query'
import { apiRequest } from '@/helpers/apiClient'
import { postListSchema } from '@/features/posts/schemas/postSchema'
import type { GetPostsParams, Post } from '@/features/posts/types/post'
import { postKeys } from '@/features/posts/utils/postKeys'

function fetchPosts({ limit }: GetPostsParams, signal: AbortSignal): Promise<Post[]> {
  return apiRequest('/posts', postListSchema, { params: { _limit: limit }, signal })
}

/** Fetching only — filtering lives in useFilteredPosts (AGENTS.md §3). */
export function useGetPosts(params: GetPostsParams) {
  const query = useQuery({
    queryKey: postKeys.list(params),
    queryFn: ({ signal }) => fetchPosts(params, signal),
  })

  return {
    posts: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  }
}
