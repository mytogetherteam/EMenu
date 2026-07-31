import { useQuery } from '@tanstack/react-query'
import { apiRequest } from '@/helpers/apiClient'
import { shopBySlugResponseSchema } from '@/features/shops/schemas/shopSchema'
import type { Shop } from '@/features/shops/types/shop'
import { shopKeys } from '@/features/shops/utils/shopKeys'

async function fetchShopBySlug(slug: string, signal: AbortSignal): Promise<Shop> {
  const response = await apiRequest(
    `/user/shop-profile/slug/${encodeURIComponent(slug)}`,
    shopBySlugResponseSchema,
    { signal },
  )
  return response.data
}

/** Fetch one public shop by URL slug (e.g. wai-yan). */
export function useGetShopBySlug(slug: string | undefined) {
  const normalized = slug?.trim() ?? ''

  const query = useQuery({
    queryKey: shopKeys.detailBySlug(normalized),
    queryFn: ({ signal }) => fetchShopBySlug(normalized, signal),
    enabled: normalized.length > 0,
  })

  return {
    shop: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  }
}
