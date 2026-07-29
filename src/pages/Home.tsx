import { Button } from '@/components/ui/Button'
import { APP_NAME } from '@/constants/appConfig'
import { PostList } from '@/features/posts/components/PostList'

/** Route entry point — thin composition only, no fetching or business logic (AGENTS.md §1). */
export default function Home() {
  return (
    <main className="mx-auto max-w-6xl px-4 pt-10 pb-16">
      <header className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-brand-gradient text-3xl font-bold">{APP_NAME}</h1>
          <p className="mt-1 text-fg-muted">
            Example feed loaded from JSONPlaceholder with TanStack Query.
          </p>
        </div>
        <Button size="lg" className="sm:w-40">
          Sign in
        </Button>
      </header>

      <PostList />
    </main>
  )
}
