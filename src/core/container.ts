import { Output, Port, Resource } from './types'

export class Container {
  public parent: Container | null = null
  public readonly children: Container[] = []
  protected resources: Record<string, unknown> = {}

  constructor(
    children: Container[] = [],
    protected readonly port: Port = {},
  ) {
    for (const child of children) {
      this.appendChild(child)
    }
  }

  public appendChild(child: Container): void {
    child.parent = this
    this.children.push(child)
  }


  dispatched(output: Output): void {

    console.log(this)
    // guardar recurso
    const { value, type } = output.resource
    this.resources[type] = value

    // ejecutar triggers
    const { action, state } = output.event
    const trigger = action[state]
    const brothers = this.children.filter(child => child !== this && child.port.trigger === trigger)
    brothers?.forEach(brother => brother.execute(output.resource))

    // avisar al padre
    console.log(this)
  }

  execute(_resource?: Resource): void { }
}
