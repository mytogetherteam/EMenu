import type { output, ZodType } from 'zod'
import { API_BASE_URL } from '@/constants/appConfig'

export class ApiError extends Error {
  readonly status: number

  constructor(message: string, status: number) {
    super(message)
    this.name = 'ApiError'
    this.status = status
  }
}

type RequestOptions = {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
  body?: unknown
  params?: Record<string, string | number | boolean | undefined>
  signal?: AbortSignal
}

function buildUrl(path: string, params?: RequestOptions['params']): string {
  const url = new URL(`${API_BASE_URL}${path}`, window.location.origin)

  for (const [key, value] of Object.entries(params ?? {})) {
    if (value !== undefined) url.searchParams.set(key, String(value))
  }

  return url.toString()
}

/**
 * Single fetch boundary. Every response is validated with a Zod schema, so
 * feature code always receives a typed, trusted shape (AGENTS.md §2).
 */
export async function apiRequest<TSchema extends ZodType>(
  path: string,
  schema: TSchema,
  { method = 'GET', body, params, signal }: RequestOptions = {},
): Promise<output<TSchema>> {
  const response = await fetch(buildUrl(path, params), {
    method,
    signal,
    headers: body ? { 'Content-Type': 'application/json' } : undefined,
    body: body ? JSON.stringify(body) : undefined,
    credentials: 'include',
  })

  if (!response.ok) {
    throw new ApiError(`Request failed: ${response.statusText}`, response.status)
  }

  return schema.parse(await response.json())
}
