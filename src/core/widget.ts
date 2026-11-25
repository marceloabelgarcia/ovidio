import { Port } from './types'
import { Children, Mother } from './mother'
import { Resource } from './resource'

/**
 * Resource de catálogo: mother + receta. Sin host propio.
 */
export class Widget extends Resource {
  public mother!: Mother

  constructor(
    mother: Mother | null = null,
    children: Children = [],
    port: Port = {},
  ) {
    super()
    this.port = port

    // mother === null → nos construye Mother: aún no hay host.
    // Mother bindea DOM después de this.host = host.
    if (mother) {
      this.mother = mother
      mother.port = port
      mother.parent = this

      // Widget producto: relations lógicas (submit → save)
      Array.isArray(port.relations) &&
        port.relations?.forEach((relation) => {
          relation?.triggers?.forEach((action) => {
            this.addListeners(action, relation)
          })
        })

      mother.appendChildren(children)
    }
  }
}
