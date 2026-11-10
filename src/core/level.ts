import type { Father } from './father'
import type { Resources } from './resources'

/** Nivel activo mientras Mother construye hijos (Resources + Father del padre). */
export type Level = {
  resources: Resources
  father: Father
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
