import { Action, Output, Port } from './types'
import { Widget } from './widget'
import { Node } from './node'

export type Child = {
  child: new (port?: Port) => Widget
  port?: Port
}

export type Children = Child[]

/**
 * Widget que aloja: host (Node) + children.
 */
export class Mother extends Widget {
  host: Node | null
  children: Children

  constructor(host: Node | null = null, children: Children = []) {
    super(null, [])
    this.mother = this
    this.host = host
    this.children = children
    if (children.length) this.appendChildren(children)
  }

  /** Instancia la receta y cuelga cada child.mother.host en this.host. */
  appendChildren(children: Children): void {
    for (const child of children) {
      const widget = new child.child(child.port)
      widget.parent = this
      if (widget.mother !== widget) widget.mother.parent = widget

      const childHost = widget.mother.host
      if (this.host && childHost) {
        this.host.append(childHost)
        childHost.parent = this.host
      }
    }
  }

}
