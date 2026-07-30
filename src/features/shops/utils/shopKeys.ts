export const shopKeys = {
  all: ['shops'] as const,
  detailBySlug: (slug: string) => [...shopKeys.all, 'slug', slug] as const,
}
