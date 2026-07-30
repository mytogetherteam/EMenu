import { useEffect, useRef } from 'react'
import { EmptyState } from '@/components/common/EmptyState'
import { ListStateView } from '@/components/common/ListStateView'
import { MenuItemCard } from '@/features/menu-items/components/MenuItemCard'
import { MenuItemSkeleton } from '@/features/menu-items/components/MenuItemSkeleton'
import { useGetShopMenuItems } from '@/features/menu-items/hooks/useGetShopMenuItems'
import type { MenuItem } from '@/features/menu-items/types/menuItem'

type ShopMenuListProps = {
  shopId: number
}

/** View-only menu list for a public shop page (no order / cart actions). */
export function ShopMenuList({ shopId }: ShopMenuListProps) {
  const loadMoreRef = useRef<HTMLDivElement | null>(null)
  const {
    data,
    totalElements,
    isLoading,
    isError,
    error,
    refetch,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useGetShopMenuItems(shopId)

  useEffect(() => {
    const node = loadMoreRef.current
    if (!node || !hasNextPage) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && !isFetchingNextPage) {
          void fetchNextPage()
        }
      },
      { rootMargin: '240px 0px' },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [fetchNextPage, hasNextPage, isFetchingNextPage])

  return (
    <section className="mt-6 space-y-4 sm:mt-8">
      <div className="flex items-end justify-between gap-3">
        <h2 className="text-lg font-bold text-fg sm:text-xl">Menu</h2>
        {totalElements > 0 ? (
          <p className="text-xs text-fg-muted sm:text-sm">
            {data.length} / {totalElements}
          </p>
        ) : null}
      </div>

      <ListStateView<MenuItem>
        isLoading={isLoading}
        isError={isError}
        error={error}
        data={data}
        onRetry={() => {
          void refetch()
        }}
        loading={<MenuItemSkeleton />}
        empty={
          <EmptyState
            title="No menu items"
            description="This shop has not published any menu items yet."
          />
        }
      >
        {(items) => (
          <>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-5 lg:gap-5">
              {items.map((item) => (
                <MenuItemCard key={item.id} item={item} />
              ))}
            </div>

            {hasNextPage ? <div ref={loadMoreRef} className="h-4" aria-hidden="true" /> : null}
            {isFetchingNextPage ? <MenuItemSkeleton count={5} /> : null}
          </>
        )}
      </ListStateView>
    </section>
  )
}
