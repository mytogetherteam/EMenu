import { memo } from 'react'
import { LazyImage } from '@/components/common/LazyImage'
import { formatCurrency } from '@/helpers/formatters'
import { cn } from '@/helpers/cn'
import type { MenuItem } from '@/features/menu-items/types/menuItem'

type MenuItemCardProps = {
  item: MenuItem
  /** When the shop is closed for today — all items show Closed badge. */
  shopClosed?: boolean
}

function MenuItemCardBase({ item, shopClosed = false }: MenuItemCardProps) {
  const title = item.nameEn || item.nameMm || item.nameTh || `Item #${item.id}`
  const price = item.price ?? item.originalPrice ?? null
  const itemUnavailable = item.isAvailable === false
  const showOverlay = shopClosed || itemUnavailable
  const badgeLabel = shopClosed ? 'Closed' : itemUnavailable ? 'Unavailable' : null

  return (
    <article className="flex min-w-0 flex-col gap-2">
      <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-zinc-100">
        {item.imageUrl ? (
          <LazyImage
            src={item.imageUrl}
            alt={title}
            width={400}
            height={400}
            className={cn('size-full object-cover', showOverlay && 'opacity-50')}
            wrapperClassName="size-full"
          />
        ) : (
          <div className="flex size-full items-center justify-center text-xs text-zinc-400">
            No photo
          </div>
        )}

        {badgeLabel ? (
          <>
            <div className="absolute inset-0 bg-white/45" aria-hidden="true" />
            <span className="absolute bottom-2 left-2 rounded-md bg-primary-600 px-2.5 py-1 text-[11px] font-semibold text-white sm:text-xs">
              {badgeLabel}
            </span>
          </>
        ) : null}
      </div>

      <div className="min-w-0 space-y-0.5 px-0.5">
        <h3 className="line-clamp-2 text-xs font-semibold text-zinc-900 sm:text-sm">
          {title}
        </h3>
        {price != null ? (
          <p className="text-xs font-medium text-primary-600 sm:text-sm">
            {formatCurrency(price)}
          </p>
        ) : null}
      </div>
    </article>
  )
}

export const MenuItemCard = memo(MenuItemCardBase)
