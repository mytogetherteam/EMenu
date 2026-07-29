# myshop_public — Agent Rules (React Clean Code Expert)

> This file is the **single source of truth** for every AI coding tool used in this repo
> (Claude Code, Cursor, Antigravity, Windsurf, Copilot, Codex, Gemini CLI).
> Tool-specific files (`CLAUDE.md`, `.cursor/rules/*.mdc`, `.windsurf/rules/*.md`,
> `.agent/rules/*.md`, `.github/copilot-instructions.md`) only point back here — **do not fork the rules.**

You are a **Senior Frontend Engineer** enforcing production-level React architecture.
When writing, refactoring, or reviewing React code in this project you **MUST** strictly follow the
rules and patterns below.

**Stack:** React 19 + TypeScript + Vite (SPA — no Laravel/Inertia in this repo).

| Concern | Library | Rule |
| --- | --- | --- |
| Styling | `tailwindcss` v4 | Utilities only. No `.css` files besides `src/index.css`, no inline `style` except dynamic values. |
| Routing | `react-router` v8 | Routes declared in `src/App.tsx`, each page `lazy()`-imported from `src/pages/`. |
| Server state | `@tanstack/react-query` v5 | The **only** way to fetch. No `useEffect` + `fetch` in components. |
| Forms | `react-hook-form` + `@hookform/resolvers` | Always with `zodResolver`. No per-field `useState`. |
| Validation | `zod` v4 | Every API response parsed at the boundary; types via `z.infer`. |
| HTTP | native `fetch` via `src/helpers/apiClient.ts` | Never call `fetch` directly from a hook or component. |

Do not add a new dependency for something these already cover.

**Environment variables.** Read only through `src/constants/appConfig.ts` — never touch `import.meta.env`
elsewhere. Adding a var means three edits in the same commit: `.env.example` (documented, no real secret),
`ImportMetaEnv` in `src/vite-env.d.ts` (so it is typed, not `any`), and a named export in `appConfig.ts`.
`.env` is git-ignored; everything `VITE_`-prefixed ships to the browser, so no secrets.

**Non-negotiable rules:** Strict architecture · Feature isolation · Type safety · Clean helpers ·
Declarative UI · Performance optimization.

---

## 1. Project Directory Structure & Feature-based Isolation

Code is organised as a hybrid of **Global Shared Resources** and **Feature-based Modules**.
This keeps files localized and stops global folders from turning into dumping grounds.

```text
src/
├── pages/               # Route entry points (one file per route)
│   └── MyShop.tsx
├── components/          # Global reusable UI components
│   ├── ui/              # Atom-level (Button, Input, Badge, Skeleton)
│   └── common/          # Layout, Navigation, state feedback
│                        # (LoadingState, ErrorState, EmptyState, ListStateView, LazyImage)
├── hooks/               # Global custom hooks (useTheme, useWindowSize, useDebounce)
├── constants/           # Global config & constants (appConfig.ts, queryKeys.ts)
├── helpers/             # Global helper functions (formatters.ts, cn.ts)
├── types/               # Global TypeScript interfaces & enums
├── schemas/             # Global Zod schemas (shared across features)
└── features/            # Feature-specific modules (Feature Folder Pattern)
    ├── auth/
    │   ├── components/  # LoginForm.tsx, RegisterForm.tsx — used only inside auth
    │   ├── hooks/       # useAuth.ts, useLoginMutation.ts
    │   ├── schemas/     # loginSchema.ts
    │   ├── types/       # auth-specific types/enums
    │   └── utils/       # auth-specific helpers
    └── shops/
        ├── components/  # ShopList.tsx, ShopCard.tsx
        ├── hooks/       # useGetShops.ts
        └── utils/
```

### Placement decision rule

1. Used by **exactly one feature** → it lives inside `src/features/<feature>/…`. Never in a global folder.
2. Used by **two or more features** → promote it to the matching global folder (`components/`, `hooks/`,
   `helpers/`, `types/`, `schemas/`) in the same commit that creates the second consumer.
3. A page under `src/pages/` is a **thin composition layer only** — it wires feature components and
   layout together. No fetching logic, no business rules, no `useState` soup.

### Cross-feature import ban

- ❌ `import { LoginForm } from "@/features/auth/components/LoginForm"` inside `features/shops/…`
- ✅ Features talk to each other only through `src/` globals (`components/`, `hooks/`, `types/`) or through props.
- If feature A truly needs feature B's logic, **promote it to global first**, then import.

### Naming conventions

| Kind | Convention | Example |
| --- | --- | --- |
| Component file | `PascalCase.tsx` | `ShopCard.tsx` |
| Hook file | `camelCase.ts`, starts with `use` | `useGetShops.ts` |
| Helper / util file | `camelCase.ts` | `formatCurrency.ts` |
| Type / interface | `PascalCase` | `Shop`, `ShopStatus` |
| Constant | `SCREAMING_SNAKE_CASE` | `DEFAULT_PAGE_SIZE` |
| Zod schema | `camelCase` + `Schema` | `loginSchema` |

Imports use the `@/` alias for anything outside the current folder. No `../../../` chains.

---

## 2. Type Safety (strict)

- `any` is **forbidden**. Use `unknown` + a narrowing guard, or a proper generic.
- Every component has an explicit props type: `type ShopCardProps = { … }`. No inline anonymous props objects.
- Never type React components with `React.FC` — declare the props type on the function parameter instead.
- API responses are validated at the boundary with **Zod**; infer the TS type from the schema
  (`type Shop = z.infer<typeof shopSchema>`) instead of hand-writing a duplicate interface.
- Union string literals or `enum`-like `as const` objects instead of bare `string` for statuses/roles.
- No non-null assertions (`!`) to silence the compiler — handle the null case.

```ts
// src/features/shops/types/shop.ts
export const SHOP_STATUS = { OPEN: "open", CLOSED: "closed" } as const;
export type ShopStatus = (typeof SHOP_STATUS)[keyof typeof SHOP_STATUS];
```

---

## 3. Custom Hooks — all logic lives here

Components render. Hooks decide. If a component contains fetching, mapping, filtering, or more than
trivial state transitions, that logic **must** move into a hook.

- One hook = one responsibility. `useGetShops` fetches; `useShopFilters` filters. Don't merge them.
- Query hooks are named `useGet<Thing>` / `useGet<Thing>Detail`; mutations `use<Verb><Thing>Mutation`.
- A hook returns a **stable, explicit object**, not a positional tuple, once it has 3+ members.
- Every data hook returns the same shape so `ListStateView` can consume it directly:
  `{ data, isLoading, isError, error, refetch }`.
- Side effects: prefer derived state over `useEffect`. `useEffect` is only for real synchronization
  with the outside world (subscriptions, timers, DOM APIs) — never to copy props into state.

```ts
// src/features/shops/hooks/useGetShops.ts
export function useGetShops(params: GetShopsParams) {
  const query = useQuery({
    queryKey: shopKeys.list(params),
    queryFn: () => fetchShops(params),
  });

  return {
    shops: query.data ?? [],
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  };
}
```

---

## 4. Clean Helpers

- A helper is **pure**: same input → same output, no React imports, no side effects, no direct API calls.
- Helpers are individually named exports, not a default-exported grab bag object.
- Formatting (currency, date, phone, distance) always goes through `src/helpers/formatters.ts` —
  never inline `toLocaleString` calls scattered across components.
- Class name merging always goes through `cn()` in `src/helpers/cn.ts`. No manual template-string class concat.
- Feature-only helpers stay in `features/<feature>/utils/` until a second feature needs them.

---

## 5. Declarative UI — `ListStateView`

Loading / error / empty / success is **never** hand-rolled with ternaries or `&&` chains in a component.
Every async list or collection renders through `<ListStateView>`.

```tsx
<ListStateView
  isLoading={isLoading}
  isError={isError}
  error={error}
  data={shops}
  onRetry={refetch}
  loading={<ShopListSkeleton />}
  empty={<EmptyState title="No shops yet" description="Try a different filter." />}
>
  {(items) => (
    <div className="grid gap-4 sm:grid-cols-2">
      {items.map((shop) => (
        <ShopCard key={shop.id} shop={shop} />
      ))}
    </div>
  )}
</ListStateView>
```

Rules:
- ❌ `{isLoading ? <Spinner/> : error ? <Err/> : items.length === 0 ? <Empty/> : …}` — banned.
- The `children` render prop receives **non-empty, non-null** data. Do not re-check for emptiness inside it.
- `LoadingState`, `ErrorState`, `EmptyState` are the only permitted state visuals; feature-specific
  skeletons are passed in via the `loading` prop.
- Single-entity (non-list) screens use the same components directly, in the same order.

---

## 6. Styling — Tailwind v4 + design tokens

All styling is Tailwind utilities. The theme lives in the `@theme` block of `src/index.css` and is the
only place raw hex values may appear.

| Token | Use for |
| --- | --- |
| `bg-brand-gradient` | Primary CTA background — the pink→orange brand gradient. **Never hand-write the stops.** |
| `text-brand-gradient` | Gradient headline text. |
| `primary-50 … primary-950` | Solid brand colour: focus rings, links, active borders, icons. `primary-500` is the default. |
| `surface` / `surface-raised` | Page background / cards, inputs, raised panels. |
| `line` | Every border. |
| `fg` / `fg-muted` | Primary text / secondary text. |

Rules:
- ❌ Arbitrary values for brand colours — `bg-[#ec4899]`, `from-pink-500 to-orange-500`. Use the tokens.
- ❌ New `.css` files, CSS modules, `@apply` in components, or `styled-components`.
- Conditional classes go through `cn()` (clsx + tailwind-merge), so a `className` prop passed from a
  parent always wins over the component's defaults.
- Variant maps (`const VARIANT_CLASSES = {…} as const`) instead of ternary chains inside `className` —
  see `src/components/ui/Button.tsx`.
- Buttons are `<Button>` from `components/ui/`, never a raw `<button>` with utility classes copy-pasted.
- Mobile-first: unprefixed classes are the small-screen case, then `sm:` / `md:` / `lg:`.

## 7. Performance — `LazyImage` and rendering discipline

- Every remote/user-uploaded image renders through `<LazyImage>` (native `loading="lazy"`,
  explicit `width`/`height` or aspect ratio to prevent CLS, blur/skeleton placeholder, error fallback).
  Raw `<img>` is only allowed for bundled local assets (logos, icons).
- List rows are wrapped in `memo` when the parent re-renders on unrelated state (typing, filters).
- Callbacks passed into memoized children are wrapped in `useCallback`; expensive derivations in `useMemo`.
  Do **not** sprinkle `useMemo` on trivial values — that is noise, not optimization.
- Keys are stable entity ids. Array index keys are banned for any list that can reorder or filter.
- Route-level code splitting with `React.lazy` + `Suspense` for every page in `src/pages/`.
- Debounce search/filter inputs (`useDebounce`, 300ms) before they hit a query hook.

---

## 8. Component Rules

- One component per file; the file name matches the component name.
- Keep a component under ~150 lines. Past that, extract sub-components into the same feature folder.
- Props are destructured in the signature. No `props.x` access.
- No business logic inside JSX — compute above the `return`, or in a hook.
- Conditional classes via `cn()`; no inline `style` objects except for genuinely dynamic values.
- Forms: `react-hook-form` + `zodResolver` with the schema from `schemas/`. No manual `onChange` state per field.

---

## 9. Definition of Done — self-check before finishing any change

1. Did every new file land in the correct folder per §1 (feature-local unless shared)?
2. Any cross-feature import? Any `../../../` path?
3. Any `any`, `React.FC`, or `!` assertion introduced?
4. Is fetching/business logic inside a component instead of a hook?
5. Is any loading/error/empty branching hand-rolled instead of `ListStateView`?
6. Any hard-coded colour or arbitrary Tailwind value instead of a theme token (§6)?
7. Is any remote image using raw `<img>` instead of `LazyImage`?
8. Is formatting inline instead of going through `helpers/formatters.ts`?

Any "yes" (or "no" for #1) → fix it before reporting the task complete.
