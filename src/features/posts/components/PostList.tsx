import { useCallback, useState } from 'react'
import { EmptyState } from '@/components/common/EmptyState'
import { ListStateView } from '@/components/common/ListStateView'
import { useDebounce } from '@/hooks/useDebounce'
import { PostCard } from '@/features/posts/components/PostCard'
import { PostListSkeleton } from '@/features/posts/components/PostListSkeleton'
import { useFilteredPosts } from '@/features/posts/hooks/useFilteredPosts'
import { useGetPosts } from '@/features/posts/hooks/useGetPosts'

type PostListProps = {
  limit?: number
}

export function PostList({ limit = 12 }: PostListProps) {
  const [search, setSearch] = useState('')
  const debouncedSearch = useDebounce(search)

  const { posts, isLoading, isError, error, refetch } = useGetPosts({ limit })
  const visiblePosts = useFilteredPosts(posts, debouncedSearch)

  // Stable identity so the memoized PostCard does not re-render while typing.
  const handleSelect = useCallback((postId: number) => {
    window.alert(`Selected post #${postId}`)
  }, [])

  return (
    <section>
      <input
        type="search"
        className="mb-6 w-full max-w-sm rounded-lg border border-line bg-transparent px-3.5 py-2.5 text-sm placeholder:text-fg-muted focus:border-primary-500 focus:outline-none"
        placeholder="Search posts…"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        aria-label="Search posts"
      />

      <ListStateView
        isLoading={isLoading}
        isError={isError}
        error={error}
        data={visiblePosts}
        onRetry={refetch}
        loading={<PostListSkeleton />}
        empty={
          <EmptyState
            title="No posts found"
            description={
              debouncedSearch ? `Nothing matches “${debouncedSearch}”.` : 'Try again later.'
            }
          />
        }
      >
        {(items) => (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((post) => (
              <PostCard key={post.id} post={post} onSelect={handleSelect} />
            ))}
          </div>
        )}
      </ListStateView>
    </section>
  )
}
