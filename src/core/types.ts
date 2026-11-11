/**
 * Relato mínimo.
 * subject: quién en el relato del dato (the_user, the_fetch, …)
 */
export type PrimitiveEvent = {
  subject: string
  verb: string
  type?: string
  value?: unknown
}

export type Emit = (event: PrimitiveEvent) => void
export type Trigger = (event: PrimitiveEvent) => void
export type Triggers = Record<string, Trigger>

/** Sujetos del relato de dato (Father). */
export const subjects = {
  user: 'the_user',
  fetch: 'the_fetch',
} as const
