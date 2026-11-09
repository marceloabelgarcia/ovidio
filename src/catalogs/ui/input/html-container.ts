import type { Child } from './child'
import { UxContainer } from './container'

/**
 * Implementación HTML del contenedor UX.
 * Aquí (y solo aquí) se crean nodos DOM de layout de hijos.
 */
export class HtmlContainer extends UxContainer {
  #root: HTMLElement
  #placed: Array<{ cell: HTMLElement; child: Child }> = []

  constructor(host: HTMLElement) {
    super()
    this.#root = document.createElement('div')
    this.#root.dataset.ux = 'container'
    host.replaceChildren(this.#root)
  }

  place(child: Child): void {
    const cell = document.createElement('div')
    cell.dataset.ux = 'slot'
    this.#root.append(cell)
    child.view?.render(cell)
    this.#placed.push({ cell, child })
  }

  clear(): void {
    for (const { child } of this.#placed) child.view?.dispose()
    this.#placed = []
    this.#root.replaceChildren()
  }
}
