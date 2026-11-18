import { Container } from './container-father'
import { Port } from './types'

export class Widget extends Container {
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
      this.mother.port = port
      for (const child of children) {
        this.mother.appendChild(child)
      }
    }
  }
}
