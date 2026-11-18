import { Container } from './container'
import { Port } from './types'

export class Widget extends Container {
  public readonly mother: Widget

  constructor(
    children: Widget[] = [],
    mother?: Widget,
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
