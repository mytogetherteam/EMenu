import { MenuItemSkeleton } from '@/features/menu-items/components/MenuItemSkeleton'

/** Full shop page skeleton — cover + floating card + menu. */
export function ShopPageSkeleton() {
  return (
    <div aria-busy="true" aria-live="polite">
      <div className="aspect-[16/10] w-full animate-pulse bg-zinc-200 sm:aspect-[21/9] md:aspect-[3/1]" />
      <div className="relative z-10 -mt-10 px-4 sm:-mt-12 sm:px-6 md:px-8 lg:px-10">
        <div className="mx-auto max-w-6xl">
          <div className="flex items-center gap-3 rounded-2xl border border-zinc-100 bg-white p-3 shadow-lg sm:gap-4 sm:rounded-3xl sm:p-4">
            <div className="size-14 animate-pulse rounded-full bg-zinc-200 sm:size-16" />
            <div className="flex-1 space-y-2">
              <div className="h-5 w-2/3 animate-pulse rounded bg-zinc-200" />
              <div className="h-3 w-1/3 animate-pulse rounded bg-zinc-200" />
              <div className="h-3 w-1/2 animate-pulse rounded bg-zinc-200" />
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto w-full max-w-6xl space-y-4 px-4 pt-6 sm:px-6 md:px-8 lg:px-10">
        <div className="h-6 w-36 animate-pulse rounded bg-zinc-200" />
        <MenuItemSkeleton />
      </div>
    </div>
  )
}
