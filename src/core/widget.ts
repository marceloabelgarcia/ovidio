import { Action, Output, Port } from './types'
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
    void port

    if (mother) {
      this.mother = mother
      mother.parent = this
      mother.appendChildren(children)
    }
  }

  dispatched(output: Output): void {
    console.log('evento widget', output)
    // this.parent?.dispatch(output)
  }

  execute(_action: Action): void {}
}
