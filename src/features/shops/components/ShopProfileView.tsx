import { LazyImage } from '@/components/common/LazyImage'
import type { Shop } from '@/features/shops/types/shop'
import {
  formatTodayHoursLabel,
  getDayLabel,
  getTodayDayOfWeek,
  getTodayOperatingHour,
} from '@/features/shops/utils/operatingHours'

type ShopProfileViewProps = {
  shop: Shop
}

export function ShopProfileView({ shop }: ShopProfileViewProps) {
  const title = shop.nameEn || shop.nameMm || shop.nameTh || `Shop #${shop.id}`
  const cover = shop.coverUrl || shop.logoUrl || undefined
  const description = shop.descriptionEn || shop.descriptionMm || null
  const address = shop.addressEn || shop.addressMm || null

  const today = getTodayDayOfWeek()
  const todayHours = getTodayOperatingHour(shop.operatingHours)

  return (
    <article className="overflow-hidden rounded-xl border border-line bg-surface-raised sm:rounded-2xl">
      {cover ? (
        <LazyImage
          src={cover}
          alt={title}
          width={1600}
          height={400}
          className="w-full object-cover"
          wrapperClassName="aspect-[16/9] w-full sm:aspect-[21/9]"
        />
      ) : (
        <div className="flex aspect-video w-full items-center justify-center bg-surface text-fg-muted">
          No cover image
        </div>
      )}

      <div className="space-y-3 p-4 sm:p-5 md:p-6">
        <header className="space-y-1">
          <h1 className="text-xl font-bold text-fg sm:text-2xl md:text-3xl">{title}</h1>
          {shop.nameMm && shop.nameEn && shop.nameMm !== shop.nameEn ? (
            <p className="text-sm text-fg-muted sm:text-base">{shop.nameMm}</p>
          ) : null}
        </header>

        {description ? (
          <p className="whitespace-pre-wrap text-sm leading-relaxed text-fg-muted">
            {description}
          </p>
        ) : null}

        <dl className="grid grid-cols-1 gap-3 text-sm sm:grid-cols-2 md:grid-cols-4">
          {address ? (
            <div className="min-w-0">
              <dt className="text-fg-muted">Address</dt>
              <dd className="break-words text-fg">{address}</dd>
            </div>
          ) : null}
          {shop.phone ? (
            <div className="min-w-0">
              <dt className="text-fg-muted">Phone</dt>
              <dd className="text-fg">{shop.phone}</dd>
            </div>
          ) : null}
          {shop.ratingAvg != null ? (
            <div className="min-w-0">
              <dt className="text-fg-muted">Rating</dt>
              <dd className="text-fg">
                {shop.ratingAvg.toFixed(1)}
                {shop.ratingCount != null ? ` (${shop.ratingCount})` : ''}
              </dd>
            </div>
          ) : null}
          <div className="min-w-0">
            <dt className="text-fg-muted">Hours · {getDayLabel(today)}</dt>
            <dd className="text-fg">
              {todayHours ? formatTodayHoursLabel(todayHours) : 'Not set'}
            </dd>
          </div>
        </dl>
      </div>
    </article>
  )
}
