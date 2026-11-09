import type { Child } from './child'

/**
 * Contenedor UX de Mother — abstracto.
 * No es HTML: solo sabe colocar / vaciar hijos.
 */
export abstract class UxContainer {
  abstract clear(): void
  abstract place(child: Child): void
}
