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

    // Mother raíz se autoasigna después del super; aquí solo si viene mother externa
    if (mother) {
      this.mother = mother
      this.mother.children = children
    }
  }
}
