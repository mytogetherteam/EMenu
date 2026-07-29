import { memo, useState } from 'react'
import type { ImgHTMLAttributes } from 'react'
import { cn } from '@/helpers/cn'

type LazyImageProps = Omit<ImgHTMLAttributes<HTMLImageElement>, 'loading' | 'src' | 'alt'> & {
  src: string
  alt: string
  /** Width / height in px — required to reserve space and avoid layout shift (CLS). */
  width: number
  height: number
  fallbackSrc?: string
  wrapperClassName?: string
}

/**
 * The only sanctioned way to render remote/user-uploaded images.
 * Raw <img> is allowed for bundled local assets only.
 */
function LazyImageBase({
  src,
  alt,
  width,
  height,
  fallbackSrc,
  className,
  wrapperClassName,
  ...rest
}: LazyImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)

  const resolvedSrc = hasError && fallbackSrc ? fallbackSrc : src

  return (
    <span
      className={cn('lazy-image', !isLoaded && 'lazy-image--placeholder', wrapperClassName)}
      style={{ aspectRatio: `${width} / ${height}` }}
    >
      <img
        {...rest}
        src={resolvedSrc}
        alt={alt}
        width={width}
        height={height}
        loading="lazy"
        decoding="async"
        className={cn('lazy-image__img', isLoaded && 'lazy-image__img--loaded', className)}
        onLoad={() => setIsLoaded(true)}
        onError={() => {
          setHasError(true)
          setIsLoaded(true)
        }}
      />
    </span>
  )
}

export const LazyImage = memo(LazyImageBase)
