import { useInfiniteQuery } from '@tanstack/react-query'
import { apiRequest } from '@/helpers/apiClient'
import { menuItemListResponseSchema } from '@/features/menu-items/schemas/menuItemSchema'
import type { MenuItem } from '@/features/menu-items/types/menuItem'
import { menuItemKeys } from '@/features/menu-items/utils/menuItemKeys'

type MenuItemPage = {
  content: MenuItem[]
  totalElements: number
  totalPages: number
  page: number
  size: number
}

const SHOP_MENU_PAGE_SIZE = 20

async function fetchShopMenuItems(
  shopId: number,
  page: number,
  signal: AbortSignal,
): Promise<MenuItemPage> {
  const response = await apiRequest('/user/menu-items', menuItemListResponseSchema, {
    params: { shopId, page, size: SHOP_MENU_PAGE_SIZE },
    signal,
  })
  return response.data
}

/** Published menu items for one shop — infinite scroll, view only. */
export function useGetShopMenuItems(shopId: number | undefined) {
  const query = useInfiniteQuery<MenuItemPage>({
    queryKey: menuItemKeys.byShop(shopId ?? 0),
    queryFn: ({ pageParam, signal }) =>
      fetchShopMenuItems(shopId!, Number(pageParam ?? 1), signal),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.page < lastPage.totalPages ? lastPage.page + 1 : undefined,
    enabled: shopId != null && shopId > 0,
  })

  const data = query.data?.pages.flatMap((page) => page.content) ?? []

  return {
    data,
    totalElements: query.data?.pages[0]?.totalElements ?? 0,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
    hasNextPage: query.hasNextPage,
    fetchNextPage: query.fetchNextPage,
    isFetchingNextPage: query.isFetchingNextPage,
  }
}
