/**
 * Interior activo mientras Mother construye hijos.
 * Sin DOM: el host es `unknown` (HTMLElement en frontend, otro recipiente en backend).
 */
const stack: unknown[] = []

export function currentInterior(): unknown | undefined {
  return stack.at(-1)
}

/** Mother cede el interior del shell solo durante `fn`. */
export function withInterior(interior: unknown, fn: () => void): void {
  stack.push(interior)
  try {
    fn()
  } finally {
    stack.pop()
  }
}
