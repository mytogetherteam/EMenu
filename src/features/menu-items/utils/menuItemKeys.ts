export const menuItemKeys = {
  all: ['menu-items'] as const,
  byShop: (shopId: number) => [...menuItemKeys.all, 'shop', shopId] as const,
}
