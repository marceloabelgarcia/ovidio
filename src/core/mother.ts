import { Action, Output, Port, TriggerRelation, Trigger } from './types'
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

  constructor(host: Node | null = null, children: Children = [], port: Port = {}) {
    super(null, [], port)
    this.mother = this
    this.host = host
    this.children = children
    this.port = port

    Array.isArray(port.relations) &&
      port.relations?.forEach((relation) => {
        relation?.triggers?.forEach(
          (action) => {
            this.addListeners(action, relation)
          }
        )
      })

    // if (children.length) this.appendChildren(children)
  }

  /** Instancia la receta y cuelga cada child.mother.host en this.host. */
  appendChildren(children: Children): void {
    for (const { child: Child, port } of children) {

      const child = new Child(port)
      this.host?.append(child.mother.host as Node)
      child.parent = this.parent
    }
  }

  protected addListeners(_action: Action, _relation: TriggerRelation): void {}

 

}
