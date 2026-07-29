import { APP_NAME } from '@/constants/appConfig'
import { PostList } from '@/features/posts/components/PostList'

/** Route entry point — thin composition only, no fetching or business logic (AGENTS.md §1). */
export default function Home() {
  return (
    <main className="page">
      <header className="page__header">
        <h1>{APP_NAME}</h1>
        <p>Example feed loaded from JSONPlaceholder with TanStack Query.</p>
      </header>

      <PostList />
    </main>
  )
}
