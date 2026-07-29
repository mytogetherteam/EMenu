import { memo } from 'react'
import { LazyImage } from '@/components/common/LazyImage'
import { truncate } from '@/helpers/formatters'
import type { Post } from '@/features/posts/types/post'
import { getPostCoverUrl } from '@/features/posts/utils/getPostCoverUrl'

type PostCardProps = {
  post: Post
  onSelect: (postId: number) => void
}

function PostCardBase({ post, onSelect }: PostCardProps) {
  return (
    <article className="post-card">
      <LazyImage
        src={getPostCoverUrl(post.id)}
        alt=""
        width={400}
        height={260}
        wrapperClassName="post-card__cover"
      />
      <div className="post-card__body">
        <h3 className="post-card__title">{truncate(post.title, 60)}</h3>
        <p className="post-card__excerpt">{truncate(post.body, 110)}</p>
        <button type="button" className="post-card__action" onClick={() => onSelect(post.id)}>
          Read more
        </button>
      </div>
    </article>
  )
}

/** Memoized: the parent re-renders on every keystroke in the search box (AGENTS.md §6). */
export const PostCard = memo(PostCardBase)
