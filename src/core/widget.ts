import { Output, Port } from './types'
import { Children, Mother } from './mother'
import { Resource } from './resource'

/**
 * Resource de catálogo: mother (vivienda) + receta. Sin host propio.
 */
export class Widget extends Resource {
  public mother!: Mother
  /** Hijos instanciados (la receta ya ejecutada). */
  public children: Widget[] = []

  constructor(
    mother: Mother | null = null,
    children: Children = [],
    port: Port = {},
  ) {
    super()
    this.port = port

    if (mother) {
      this.mother = mother
      mother.widget = this

      Array.isArray(port.relations) &&
        port.relations.forEach((relation) => {
          relation?.triggers?.forEach((action) => {
            this.addListeners(action, relation)
          })
        })

      this.children = mother.appendChildren(children)
      this.children.forEach((child) => this.adopt(child))
      this.mapTriggers(this.children)
    }
  }

  /** El padre ordena: se baja a la realidad (Mother). */
  public execute(output: Output): void {
    this.mother?.execute(output)
  }
}
