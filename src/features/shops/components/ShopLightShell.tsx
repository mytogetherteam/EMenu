import type { ReactNode } from 'react'

type ShopLightShellProps = {
  children: ReactNode
  /** When true, children manage their own horizontal padding (full-bleed header). */
  flush?: boolean
}

export function ShopLightShell({ children, flush = false }: ShopLightShellProps) {
  return (
    <div className="min-h-screen bg-white text-zinc-900">
      {flush ? (
        children
      ) : (
        <div className="mx-auto w-full max-w-6xl px-4 py-5 sm:px-6 sm:py-7 md:px-8 lg:px-10">
          {children}
        </div>
      )}
    </div>
  )
}
