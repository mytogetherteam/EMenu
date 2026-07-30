type MenuItemSkeletonProps = {
  count?: number
}

/** Square menu-card placeholders — gif centered in each tile (AGENTS.md §5). */
export function MenuItemSkeleton({ count = 8 }: MenuItemSkeletonProps) {
  return (
    <div
      className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-5 lg:gap-5"
      aria-hidden="true"
    >
      {Array.from({ length: count }, (_, index) => (
        <div key={index} className="flex min-w-0 flex-col gap-2">
          <div className="relative flex aspect-square w-full items-center justify-center overflow-hidden rounded-xl bg-white/10 sm:rounded-2xl">
            <img
              src="/loading.gif"
              alt=""
              width={72}
              height={72}
              className="size-14 object-contain opacity-90 sm:size-16"
            />
          </div>
          <div className="space-y-1.5 px-0.5">
            <div className="h-3 w-3/5 animate-pulse rounded-full bg-white/10" />
            <div className="h-2.5 w-2/5 animate-pulse rounded-full bg-white/10" />
          </div>
        </div>
      ))}
    </div>
  )
}
