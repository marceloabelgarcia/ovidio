/** Relato mínimo: verbo + predicado (type) + valor. */
export type PrimitiveEvent = {
  verb: string
  type?: string
  value?: unknown
}

export type Emit = (event: PrimitiveEvent) => void
export type Trigger = (event: PrimitiveEvent) => void
export type Triggers = Record<string, Trigger>
