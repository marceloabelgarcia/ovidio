import { Output, Port, Resource } from './types'

export class Container {
  public parent: Container | null = null
  public readonly children: Container[] = []
  protected resources: Record<string, unknown> = {}

  constructor(
    children: Container[] = [],
    /** Contrato de este contenedor (mutable: el nivel puede fijarlo en la mother). */
    public port: Port = {},
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
    // guardar recurso
    const { value, type } = output.resource
    this.resources[type] = value

    // ejecutar triggers
    const { action, state } = output.event
    const trigger = action[state]
    const brothers = this.children.filter(child => child !== this && child.port.trigger === trigger)
    brothers?.forEach(brother => brother.execute(output.resource))

    // avisar al padre
    const outputs = this.port.output

    outputs?.forEach((relation) => {
      const { name, type } = relation
      type?.forEach((typePart) => {
        
        if (typePart.name === trigger) {
          console.log('avisar al padre')
          const event = {
            action: action,
            state: state,
            time: new Date(),
          }
          this.parent?.dispatched(event)

          console.log(this)
        }
      })
      console.log(name, type)
    })
    
  }

  execute(_resource?: Resource): void { }
}
