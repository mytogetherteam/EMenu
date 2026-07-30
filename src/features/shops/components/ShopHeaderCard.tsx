import { LazyImage } from '@/components/common/LazyImage'
import type { Shop } from '@/features/shops/types/shop'
import {
  formatTodayHoursLabel,
  getTodayOperatingHour,
} from '@/features/shops/utils/operatingHours'

type ShopHeaderCardProps = {
  shop: Shop
}

/** Cover banner + floating shop info card (reference layout). */
export function ShopHeaderCard({ shop }: ShopHeaderCardProps) {
  const title = shop.nameEn || shop.nameMm || shop.nameTh || `Shop #${shop.id}`
  const cover = shop.coverUrl || shop.logoUrl || undefined
  const logo = shop.logoUrl || shop.coverUrl || undefined
  const category =
    shop.shopCategory &&
    typeof shop.shopCategory === 'object' &&
    'nameEn' in shop.shopCategory
      ? String((shop.shopCategory as { nameEn?: string }).nameEn ?? 'Restaurant')
      : 'Restaurant'
  const todayHours = getTodayOperatingHour(shop.operatingHours)
  const isOpen = shop.isOpen !== false && todayHours?.isClosed !== true
  const hoursLabel = todayHours ? formatTodayHoursLabel(todayHours) : null

  return (
    <header className="relative bg-white">
      {/* Cover */}
      <div className="h-72 w-full overflow-hidden bg-white">
        {cover ? (
          <LazyImage
            src={cover}
            alt=""
            width={1600}
            height={900}
            className="h-full w-full object-cover rounded-b-3xl"
            wrapperClassName="h-full w-full"
          />
        ) : null}
      </div>

      {/* Floating Card */}
      <div className="absolute bottom-6 left-1/2 w-[95%] -translate-x-1/2 px-2">
        <article className="flex items-center gap-4 rounded-3xl bg-white/90 p-5 shadow-2xl backdrop-blur-xl">
          {/* Logo */}
          <div className="h-16 w-16 overflow-hidden rounded-2xl bg-white">
            {logo ? (
              <LazyImage
                src={logo}
                alt={title}
                width={128}
                height={128}
                className="h-full w-full object-cover"
                wrapperClassName="h-full w-full"
              />
            ) : null}
          </div>

          {/* Info */}
          <div className="flex-1">
            <h1 className="text-2xl font-bold">{title}</h1>

            <p className="mt-1 text-gray-500">{category}</p>

            <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-gray-500">
              {hoursLabel ? (
                <>
                  <span>🕒 {hoursLabel}</span>
                  <span>•</span>
                </>
              ) : null}

              <span
                className={
                  isOpen
                    ? 'font-medium text-primary-600'
                    : 'font-medium text-red-500'
                }
              >
                {isOpen ? (
                  <>
                    <span className="mr-1.5 inline-block size-2 rounded-full bg-primary-500" />
                    Open
                  </>
                ) : (
                  'Closed'
                )}
              </span>
            </div>
          </div>
        </article>
      </div>
    </header>
  )
}
