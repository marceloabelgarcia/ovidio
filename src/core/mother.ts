import { Port } from './types'
import { Widget } from './widget'
import { Node } from './node'


export type Child = {
    child: new (port?: Port) => Widget
    port?: Port
}

export type Children = Child[]



export class Mother extends Widget {
    public _children: Children = []
    public _host: Node | null = null
    
    constructor(mother: Mother, children: Children = []) {
        super(mother, children)
        this._children = children
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