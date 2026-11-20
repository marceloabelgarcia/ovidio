import { Father } from './father'
import { Port } from './types'
import { Children, Mother } from './mother'

export class Widget extends Father {
  public mother!: Mother

  constructor(
    mother: Mother | null = null,
    children: Children = [],
    port: Port = {},
  ) {
    super()
    void port

    // Mother ya instanciada + receta → Mother instancia y aloja
    if (mother) {
      this.mother = mother
      mother.appendChildren(children)
    }
  }
}
