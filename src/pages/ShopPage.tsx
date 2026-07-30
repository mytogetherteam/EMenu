import { ErrorState } from '@/components/common/ErrorState'
import { ShopMenuList } from '@/features/menu-items/components/ShopMenuList'
import { ShopPageSkeleton } from '@/features/shops/components/ShopPageSkeleton'
import { ShopProfileView } from '@/features/shops/components/ShopProfileView'
import { useGetShopBySlug } from '@/features/shops/hooks/useGetShopBySlug'
import { useParams } from 'react-router'

const pageShellClass =
  'mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 sm:py-8 md:px-8 lg:px-10 lg:py-10'

/** Public shop menu page — `/wai-yan` → fetch shop by slug + menu (view only). */
export default function ShopPage() {
  const { slug } = useParams<{ slug: string }>()
  const { shop, isLoading, isError, error, refetch } = useGetShopBySlug(slug)

  if (isLoading) {
    return (
      <main className={pageShellClass}>
        <ShopPageSkeleton />
      </main>
    )
  }

  if (isError) {
    return (
      <main className={pageShellClass}>
        <ErrorState
          title="Shop not found"
          error={error}
          imageSrc="/login-bg.png"
          imageAlt="Shop not found illustration"
          onRetry={() => {
            void refetch()
          }}
        />
      </main>
    )
  }

  if (!shop) {
    return (
      <main className={pageShellClass}>
        <ErrorState
          title="Shop not found"
          description="This slug does not match an active shop."
          imageSrc="/login-bg.png"
          imageAlt="Shop not found illustration"
        />
      </main>
    )
  }

  return (
    <main className={pageShellClass}>
      <ShopProfileView shop={shop} />
      <ShopMenuList shopId={shop.id} />
    </main>
  )
}
