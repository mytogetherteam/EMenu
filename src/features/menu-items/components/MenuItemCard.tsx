import { memo } from 'react'
import { LazyImage } from '@/components/common/LazyImage'
import { formatCurrency } from '@/helpers/formatters'
import type { MenuItem } from '@/features/menu-items/types/menuItem'

type MenuItemCardProps = {
  item: MenuItem
}

function MenuItemCardBase({ item }: MenuItemCardProps) {
  const title = item.nameEn || item.nameMm || item.nameTh || `Item #${item.id}`
  const description = item.descriptionEn || item.descriptionMm || null
  const category = item.menuCategoryName || item.categoryName || null
  const price = item.price ?? item.originalPrice ?? null
  const showOriginal =
    item.originalPrice != null &&
    item.price != null &&
    item.originalPrice > item.price

  return (
    <article className="flex min-w-0 flex-col gap-1.5 sm:gap-2">
      {item.imageUrl ? (
        <LazyImage
          src={item.imageUrl}
          alt={title}
          width={400}
          height={400}
          className="size-full rounded-xl object-cover sm:rounded-2xl"
          wrapperClassName="aspect-square w-full overflow-hidden rounded-xl sm:rounded-2xl"
        />
      ) : (
        <div className="flex aspect-square w-full items-center justify-center rounded-xl bg-surface text-xs text-fg-muted ring-1 ring-line sm:rounded-2xl sm:text-sm">
          No photo
        </div>
      )}

      <div className="min-w-0 space-y-0.5 px-0.5 sm:space-y-1">
        {category ? (
          <p className="truncate text-[11px] font-medium text-fg-muted sm:text-xs">
            {category}
          </p>
        ) : null}
        <h3 className="line-clamp-2 text-xs font-semibold text-fg sm:text-sm">
          {title}
        </h3>
        {item.nameMm && item.nameEn && item.nameMm !== item.nameEn ? (
          <p className="hidden truncate text-xs text-fg-muted sm:block">
            {item.nameMm}
          </p>
        ) : null}
        {description ? (
          <p className="hidden line-clamp-2 text-sm text-fg-muted md:block">
            {description}
          </p>
        ) : null}
        {price != null ? (
          <p className="pt-0.5 text-xs font-semibold text-fg sm:text-sm">
            {formatCurrency(price)}
            {showOriginal && item.originalPrice != null ? (
              <span className="ml-1 text-[11px] font-normal text-fg-muted line-through sm:ml-1.5 sm:text-xs">
                {formatCurrency(item.originalPrice)}
              </span>
            ) : null}
          </p>
        ) : null}
      </div>
    </article>
  )
}

export const MenuItemCard = memo(MenuItemCardBase)
