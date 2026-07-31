import { lazy, Suspense } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { BrowserRouter, Route, Routes } from 'react-router'
import { LoadingState } from '@/components/common/LoadingState'
import { STALE_TIME_MS } from '@/constants/appConfig'

// Route-level code splitting — one lazy import per page (AGENTS.md §7).
const Home = lazy(() => import('@/pages/Home'))
const ShopPage = lazy(() => import('@/pages/ShopPage'))

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: STALE_TIME_MS,
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
})

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Suspense fallback={<LoadingState />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/:slug" element={<ShopPage />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
      {import.meta.env.DEV ? <ReactQueryDevtools initialIsOpen={false} /> : null}
    </QueryClientProvider>
  )
}
