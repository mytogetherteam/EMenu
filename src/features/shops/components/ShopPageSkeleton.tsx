import { MenuItemSkeleton } from '@/features/menu-items/components/MenuItemSkeleton'

/** Full shop page skeleton while slug lookup is in flight. */
export function ShopPageSkeleton() {
  return (
    <div className="space-y-6 sm:space-y-8" aria-busy="true" aria-live="polite">
      <div className="overflow-hidden rounded-xl border border-line bg-surface-raised sm:rounded-2xl">
        <div className="relative flex aspect-[16/9] w-full items-center justify-center bg-white/5 sm:aspect-[21/9]">
          <img
            src="/loading.gif"
            alt=""
            width={100}
            height={100}
            className="size-20 object-contain sm:size-24"
            aria-hidden="true"
          />
        </div>
        <div className="space-y-3 p-4 sm:p-5 md:p-6">
          <div className="h-7 w-2/3 animate-pulse rounded-lg bg-white/10 sm:h-8" />
          <div className="h-4 w-1/2 animate-pulse rounded bg-white/10" />
          <div className="grid grid-cols-1 gap-3 pt-2 sm:grid-cols-2 md:grid-cols-4">
            {Array.from({ length: 4 }, (_, index) => (
              <div key={index} className="space-y-1.5">
                <div className="h-3 w-16 animate-pulse rounded bg-white/10" />
                <div className="h-4 w-28 animate-pulse rounded bg-white/10" />
              </div>
            ))}
          </div>
        </div>
      </div>

      <section className="space-y-4">
        <div className="h-6 w-24 animate-pulse rounded bg-white/10" />
        <MenuItemSkeleton />
      </section>
    </div>
  )
}
