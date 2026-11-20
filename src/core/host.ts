import { Port } from './types'
import { Widget } from './widget'
import { Node } from './node'


export type Child = {
    child: new (port?: Port) => Widget
    port?: Port
}

export type Children = Child[]



export class Host {
    public children: Children = []
    public host: Node | null = null

    constructor(children: Children = []) {
        this.children = children
    }

    get Children(): Children {
        return this.children
    }

    set Children(children: Children) {
        this.children = children
        for (const child of children) {
            const widget = new child.child(child.port)
            this.host?.append(widget.host.Host)
        }
    }

    get Host(): Node {
        return this.host as Node
    }

    set Host(host: Node) {
        this.host = host
    }

    public appendChild(child: Node): void {
        this.host?.append(child)
    }


}