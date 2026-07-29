/** Deterministic cover image per post — pure, so it stays a util (AGENTS.md §4). */
export function getPostCoverUrl(postId: number, width = 400, height = 260): string {
  return `https://picsum.photos/seed/post-${postId}/${width}/${height}`
}
