import { Container } from './container'
import { Port } from './types'

/**
 * Mother = hueco donde viven los hijos.
 *
 * - Sin mother → este Widget es su propia mother.
 * - Mother Container → se rellena ese hueco.
 * - Mother Widget (App/View) → se rellena su mother (shell del catálogo).
 */
export class Widget extends Container {
  public readonly mother: Container

  constructor(
    children: Container[] = [],
    mother?: Container | Widget,
    port: Port = {},
  ) {
    const own = mother == null
    super(own ? children : [], port)

    if (own) {
      this.mother = this
      return
    }

    this.mother = mother instanceof Widget ? mother.mother : mother
    this.mother.port = port
    for (const child of children) {
      this.mother.appendChild(child)
    }
  }
}
