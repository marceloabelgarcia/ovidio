import { Container } from './container'
import { Port } from './types'

/**
 * Un nivel (también es Container):
 *
 *   Widget
 *     └── mother  ← contenedor común de los hijos (puede ser App, u otro, o this)
 *           └── children
 *
 * Si no pasas mother, este Widget ES la mother.
 * El port del nivel vive siempre en la mother (donde están los hijos / dispatched).
 */
export class Widget extends Container {
  /** Contenedor común de los hijos de este nivel. */
  public readonly mother: Container

  constructor(
    children: Container[] = [],
    mother?: Container,
    port: Port = {},
  ) {
    const own = mother == null
    super(own ? children : [], port)

    this.mother = mother ?? this

    if (!own) {
      // Contrato del nivel en la mother (antes quedaba huérfano en Widget)
      this.mother.port = port
      for (const child of children) {
        this.mother.appendChild(child)
      }
    }
  }
}
