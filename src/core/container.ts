import { Father } from './father'
import { Port } from './types'

export class Container extends Father {
  declare public parent: Container | null
  declare public readonly children: Container[]

  constructor(
    children: Container[] = [],
    port: Port = {},
  ) {
    super(port)

    for (const child of children) {
      this.appendChild(child)
    }
 
  }

  public appendChild(child: Container): void {
    child.parent = this
    this.children.push(child)
  }
}
