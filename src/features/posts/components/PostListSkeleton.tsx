type PostListSkeletonProps = {
  count?: number
}

export function PostListSkeleton({ count = 6 }: PostListSkeletonProps) {
  return (
    <div className="post-grid" aria-hidden="true">
      {/* Index keys are fine here only because this list is static and never reorders. */}
      {Array.from({ length: count }, (_, index) => (
        <div key={index} className="post-card post-card--skeleton">
          <div className="post-card__cover skeleton-block" />
          <div className="post-card__body">
            <div className="skeleton-line skeleton-line--title" />
            <div className="skeleton-line" />
            <div className="skeleton-line skeleton-line--short" />
          </div>
        </div>
      ))}
    </div>
  )
}
