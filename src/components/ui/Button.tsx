import type { ButtonHTMLAttributes } from 'react'
import { cn } from '@/helpers/cn'

const VARIANT_CLASSES = {
  /** The brand gradient — primary call to action. */
  primary: 'bg-brand-gradient text-white hover:brightness-110 active:brightness-95',
  secondary: 'border border-line bg-surface-raised text-fg hover:border-fg-muted',
  ghost: 'text-fg-muted hover:bg-white/5 hover:text-fg',
} as const

const SIZE_CLASSES = {
  sm: 'h-9 px-3 text-sm',
  md: 'h-11 px-5 text-sm',
  lg: 'h-13 px-6 text-base',
} as const

export type ButtonVariant = keyof typeof VARIANT_CLASSES
export type ButtonSize = keyof typeof SIZE_CLASSES

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant
  size?: ButtonSize
  fullWidth?: boolean
}

export function Button({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className,
  type = 'button',
  ...rest
}: ButtonProps) {
  return (
    <button
      {...rest}
      type={type}
      className={cn(
        'inline-flex cursor-pointer items-center justify-center rounded-lg font-semibold transition',
        'focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-surface focus-visible:outline-none',
        'disabled:cursor-not-allowed disabled:opacity-50',
        VARIANT_CLASSES[variant],
        SIZE_CLASSES[size],
        fullWidth && 'w-full',
        className,
      )}
    />
  )
}
