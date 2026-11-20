import { Port } from './types'
import { Widget } from './widget'
import { Node } from './node'

export type Child = {
  child: new (port?: Port) => Widget
  port?: Port
}

export type Children = Child[]

/**
 * Widget que además aloja: tiene host (Node) donde cuelga la realidad de los hijos.
 * Raíz: no necesita mother externa (mother = this).
 */
export class Mother extends Widget {
  private _children: Children = []
  private _host: Node | null = null

  constructor(children: Children = []) {
    super(null, [])
    this.mother = this
    if (children.length) {
      this.children = children
    }
  }

  get children(): Children {
    return this._children
  }

  set children(children: Children) {
    this._children = children
    for (const child of children) {
      const widget = new child.child(child.port)
      this._host?.append(widget.mother.host)
    }
  }

  get host(): Node {
    return this._host as Node
  }

  set host(host: Node) {
    this._host = host
  }

  public appendChild(child: Node): void {
    this._host?.append(child)
  }
}
