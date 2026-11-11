import type { Father } from './father'
import type { Resources } from './resources'
import type { Widget } from './widget'

/** Nivel activo mientras Mother construye hijos. */
export type Level = {
  resources: Resources
  father: Father
  /** Widget dueño de este nivel (para subir relatos de máquina). */
  widget: Widget
}

const stack: Level[] = []

export function currentLevel(): Level | undefined {
  return stack.at(-1)
}

export function withLevel(level: Level, fn: () => void): void {
  stack.push(level)
  try {
    fn()
  } finally {
    stack.pop()
  }
}
