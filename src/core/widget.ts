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
    this.port = port 

    
    if (mother) {
      this.mother = mother
      mother.port = port
      mother.parent = this
      mother.appendChildren(children)
    }


  }



}
