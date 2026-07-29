type PostListSkeletonProps = {
  count?: number
}

export function PostListSkeleton({ count = 6 }: PostListSkeletonProps) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3" aria-hidden="true">
      {/* Index keys are fine here only because this list is static and never reorders. */}
      {Array.from({ length: count }, (_, index) => (
        <div
          key={index}
          className="animate-pulse overflow-hidden rounded-xl border border-line bg-surface-raised"
        >
          <div className="aspect-[400/260] w-full bg-white/10" />
          <div className="flex flex-col gap-3 p-4">
            <div className="h-4 w-4/5 rounded bg-white/10" />
            <div className="h-3 w-full rounded bg-white/10" />
            <div className="h-3 w-3/5 rounded bg-white/10" />
          </div>
        </div>
      ))}
    </div>
  )
}
