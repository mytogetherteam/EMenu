import { ErrorState } from '@/components/common/ErrorState'
import { ShopMenuList } from '@/features/menu-items/components/ShopMenuList'
import { ShopHeaderCard } from '@/features/shops/components/ShopHeaderCard'
import { ShopLightShell } from '@/features/shops/components/ShopLightShell'
import { ShopPageSkeleton } from '@/features/shops/components/ShopPageSkeleton'
import { useGetShopBySlug } from '@/features/shops/hooks/useGetShopBySlug'
import { getTodayOperatingHour } from '@/features/shops/utils/operatingHours'
import { useParams } from 'react-router'

const contentPadClass =
  'mx-auto w-full px-4 pb-8 pt-4 sm:px-6 sm:pb-10 md:px-8 lg:px-10'

/** Public shop menu page — cover + floating shop card + menu. */
export default function ShopPage() {
  const { slug } = useParams<{ slug: string }>()
  const { shop, isLoading, isError, error, refetch } = useGetShopBySlug(slug)

  if (isLoading) {
    return (
      <ShopLightShell flush>
        <ShopPageSkeleton />
      </ShopLightShell>
    )
  }

  if (isError) {
    return (
      <ShopLightShell>
        <ErrorState
          title="Shop not found"
          error={error}
          imageSrc="/login-bg.png"
          imageAlt="Shop not found illustration"
          className="text-zinc-900"
          onRetry={() => {
            void refetch()
          }}
        />
      </ShopLightShell>
    )
  }

  if (!shop) {
    return (
      <ShopLightShell>
        <ErrorState
          title="Shop not found"
          description="This slug does not match an active shop."
          imageSrc="/login-bg.png"
          imageAlt="Shop not found illustration"
          className="text-zinc-900"
        />
      </ShopLightShell>
    )
  }

  const todayHours = getTodayOperatingHour(shop.operatingHours)
  const shopClosed = shop.isOpen === false || todayHours?.isClosed === true

  return (
    <ShopLightShell flush>
      <ShopHeaderCard shop={shop} />
      <div className={contentPadClass}>
        <ShopMenuList shopId={shop.id} shopClosed={shopClosed} />
      </div>
    </ShopLightShell>
  )
}
