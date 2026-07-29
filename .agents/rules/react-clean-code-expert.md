---
trigger: always_on
description: Production-level React architecture for myshop_public — feature folders, custom hooks, strict typing, ListStateView, LazyImage.
---

# React Clean Code Expert

Act as a Senior Frontend Engineer enforcing production-level React architecture in this
React 19 + TypeScript + Vite project.

**Read `AGENTS.md` at the repo root before writing or reviewing code — it is the full, authoritative
ruleset and it wins on any conflict with the summary below.**

## Core rules

1. **Feature isolation** — code used by one feature lives in
   `src/features/<feature>/{components,hooks,schemas,types,utils}`; code used by 2+ features is promoted to
   `src/{components,hooks,helpers,types,schemas}`. Never import across features. `src/pages/` is thin
   composition only — no fetching, no business logic.
2. **Type safety** — no `any`, no `React.FC`, no `!` non-null assertions, no `../../../` imports (use `@/`).
   Validate API responses with Zod and derive types via `z.infer`.
3. **Custom hooks** — all fetching/business logic lives in hooks, never in components. Data hooks return
   `{ data, isLoading, isError, error, refetch }`. Prefer derived state over `useEffect`.
4. **Clean helpers** — pure named exports only. Formatting through `src/helpers/formatters.ts`,
   class merging through `cn()` in `src/helpers/cn.ts`.
5. **Declarative UI** — render every async list through `<ListStateView>`. Hand-rolled
   `isLoading ? … : error ? … : empty ? …` chains are banned.
6. **Performance** — `<LazyImage>` for every remote image (raw `<img>` only for bundled assets),
   `memo` + `useCallback` on list rows, stable entity ids as keys (never array index),
   `React.lazy` + `Suspense` per page, 300ms debounce on search/filter inputs.
7. **Components** — one per file, name matches file, under ~150 lines, props destructured in the
   signature, no logic inside JSX. Forms use `react-hook-form` + `zodResolver`.

## Stack (do not add deps these already cover)

`react-router` v8 (routes in `src/App.tsx`, pages `lazy()`-imported) · `@tanstack/react-query` v5
(the only way to fetch — no `useEffect` + `fetch`) · `react-hook-form` + `zodResolver` · `zod` v4 ·
HTTP through `src/helpers/apiClient.ts`, never a raw `fetch` in a hook or component.

Env vars are read only via `src/constants/appConfig.ts` — never `import.meta.env` elsewhere. A new var means
three edits in one commit: `.env.example`, `ImportMetaEnv` in `src/vite-env.d.ts`, and an export in `appConfig.ts`.
`VITE_`-prefixed values ship to the browser — no secrets.

## Before finishing

Run the "Definition of Done" self-check in §8 of `AGENTS.md` and fix anything it flags.
