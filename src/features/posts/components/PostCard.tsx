import { memo } from 'react'
import { LazyImage } from '@/components/common/LazyImage'
import { Button } from '@/components/ui/Button'
import { truncate } from '@/helpers/formatters'
import type { Post } from '@/features/posts/types/post'
import { getPostCoverUrl } from '@/features/posts/utils/getPostCoverUrl'

type PostCardProps = {
  post: Post
  onSelect: (postId: number) => void
}

function PostCardBase({ post, onSelect }: PostCardProps) {
  return (
    <article className="flex flex-col overflow-hidden rounded-xl border border-line bg-surface-raised transition hover:-translate-y-1 hover:border-primary-500/60">
      <LazyImage src={getPostCoverUrl(post.id)} alt="" width={400} height={260} />
      <div className="flex flex-1 flex-col items-start gap-2 p-4">
        <h3 className="text-base leading-snug font-semibold">{truncate(post.title, 60)}</h3>
        <p className="flex-1 text-sm text-fg-muted">{truncate(post.body, 110)}</p>
        <Button size="sm" onClick={() => onSelect(post.id)}>
          Read more
        </Button>
      </div>
    </article>
  )
}

/** Memoized: the parent re-renders on every keystroke in the search box (AGENTS.md §7). */
export const PostCard = memo(PostCardBase)
