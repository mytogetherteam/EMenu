import { useQuery } from '@tanstack/react-query'
import { apiRequest } from '@/helpers/apiClient'
import { menuItemListResponseSchema } from '@/features/menu-items/schemas/menuItemSchema'
import type { MenuItem } from '@/features/menu-items/types/menuItem'
import { menuItemKeys } from '@/features/menu-items/utils/menuItemKeys'

/** API caps size at 100 — enough for a single-shop public menu view. */
const SHOP_MENU_PAGE_SIZE = 100

async function fetchShopMenuItems(
  shopId: number,
  signal: AbortSignal,
): Promise<MenuItem[]> {
  const response = await apiRequest('/user/menu-items', menuItemListResponseSchema, {
    params: { shopId, page: 1, size: SHOP_MENU_PAGE_SIZE },
    signal,
  })
  return response.data.content
}

/** Published menu items for one shop — view only (no cart/order). */
export function useGetShopMenuItems(shopId: number | undefined) {
  const query = useQuery<MenuItem[]>({
    queryKey: menuItemKeys.byShop(shopId ?? 0),
    queryFn: ({ signal }) => fetchShopMenuItems(shopId!, signal),
    enabled: shopId != null && shopId > 0,
  })

  return {
    data: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  }
}
